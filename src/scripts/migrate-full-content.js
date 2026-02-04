const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

// --- SETUP ---
const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: rootEnvPath });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;
// Update this path to match your project structure
const PUBLIC_HTML_DIR = path.resolve(__dirname, '../../_legacy_content/main_site/public_html');

// --- PARSING LOGIC ---

function cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

function parseTable($, $table) {
    const rows = [];
    $table.find('tr').each((r, tr) => {
        const cells = [];
        $(tr).find('td, th').each((c, cell) => {
            const $cell = $(cell);
            cells.push({
                text: cleanText($cell.text()),
                tag: cell.tagName.toLowerCase(), // 'th' or 'td'
                rowSpan: parseInt($cell.attr('rowspan')) || 1,
                colSpan: parseInt($cell.attr('colspan')) || 1,
                align: $cell.attr('align') || 'left'
            });
        });
        if (cells.length > 0) rows.push(cells);
    });
    return { type: 'table', rows };
}

function parseNodes($, container) {
    const blocks = [];

    container.children().each((i, el) => {
        const $el = $(el);
        const tag = el.tagName.toLowerCase();

        // 1. HEADERS
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
            blocks.push({
                type: 'heading',
                level: parseInt(tag.replace('h', '')),
                text: cleanText($el.text())
            });
        }
        // 2. PARAGRAPHS
        else if (tag === 'p') {
            if ($el.find('img').length > 0) {
                // Handle images inside P
                $el.find('img').each((j, img) => {
                    blocks.push({
                        type: 'image',
                        src: $(img).attr('src'),
                        alt: $(img).attr('alt') || '',
                    });
                });
                const text = cleanText($el.text());
                if (text) blocks.push({ type: 'paragraph', text });
            } else {
                const text = cleanText($el.text());
                if (text.length > 0) blocks.push({ type: 'paragraph', text });
            }
        }
        // 3. IMAGES
        else if (tag === 'img') {
            blocks.push({
                type: 'image',
                src: $el.attr('src'),
                alt: $el.attr('alt') || '',
            });
        }
        // 4. LISTS
        else if (tag === 'ul' || tag === 'ol') {
            const items = [];
            $el.find('li').each((j, li) => {
                items.push(cleanText($(li).text()));
            });
            blocks.push({
                type: 'list',
                listType: tag === 'ol' ? 'ordered' : 'unordered',
                items
            });
        }
        // 5. TABLES
        else if (tag === 'table') {
            blocks.push(parseTable($, $el));
        }
        // 6. DIVS & WRAPPERS
        else if (tag === 'div' || tag === 'article' || tag === 'section' || tag === 'center') {
            if ($el.hasClass('table-responsive')) {
                const $table = $el.find('table');
                if ($table.length) blocks.push(parseTable($, $table));
            }
            else if ($el.hasClass('panel-group')) {
                const items = [];
                $el.find('.panel').each((j, panel) => {
                    const $panel = $(panel);
                    const title = cleanText($panel.find('.panel-heading, .panel-title').text());
                    const bodyBlocks = parseNodes($, $panel.find('.panel-body'));
                    items.push({ title, body: bodyBlocks });
                });
                blocks.push({ type: 'accordion', items });
            }
            else if ($el.children('.snippet-title').length > 0) {
                blocks.push({
                    type: 'section',
                    variant: 'summary',
                    title: cleanText($el.find('.snippet-title').text()),
                    content: cleanText($el.find('.snippet-markup').text())
                });
            }
            else {
                // Recurse genric wrappers
                blocks.push(...parseNodes($, $el));
            }
        }
    });

    return blocks;
}

// --- HELPER to fetch all rows handling pagination ---
async function fetchAllProducts() {
    let allPosts = [];
    let from = 0;
    const batchSize = 1000;
    let more = true;

    while (more) {
        const { data, error } = await supabase
            .from('post')
            .select('id, slug, title')
            .eq('company_id', COMPANY_ID)
            .eq('type', 'product')
            .range(from, from + batchSize - 1);

        if (error) {
            console.error('Error fetching posts:', error);
            break;
        }

        if (data.length > 0) {
            allPosts = allPosts.concat(data);
            from += batchSize;
        }

        if (data.length < batchSize) {
            more = false;
        }
    }
    return allPosts;
}

// --- MAIN EXECUTION ---
async function migrateAll() {
    console.log('--- Starting Fully Robust Content Migration ---');

    const posts = await fetchAllProducts();
    console.log(`Verified Total Products to Process: ${posts.length}`);

    let successCount = 0;
    let failCount = 0;

    for (const post of posts) {
        // Map special slugs
        let filename = `${post.slug}.html`;
        if (post.slug === 'about') filename = 'about-us.html';
        if (post.slug === 'contact') filename = 'contact-us.html';

        let filePath = path.join(PUBLIC_HTML_DIR, filename);

        if (!fs.existsSync(filePath)) {
            // Try fallback if mapped file doesn't exist
            if (post.slug === 'about') filePath = path.join(PUBLIC_HTML_DIR, 'about.html');
            if (post.slug === 'contact') filePath = path.join(PUBLIC_HTML_DIR, 'contact.html');

            if (!fs.existsSync(filePath)) {
                // Try exact slug mismatch?
                // console.warn(`[MISSING] ${filename}`);
                failCount++;
                continue;
            }
        }

        try {
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);

            // Selectors Priority
            let container = $('.blog-content');
            if (!container.length) container = $('.article-blog');
            if (!container.length) container = $('.contact-info-detail');
            if (!container.length) container = $('.about-area');
            if (!container.length) container = $('.services-detail .inner-box .lower-content');

            // Layout based fallbacks
            if (!container.length) container = $('.col-md-9');
            if (!container.length) container = $('.col-sm-9');

            // Last resort for About/Full-width
            if (!container.length) container = $('.col-md-12');

            if (container.length === 0) {
                console.warn(`[NO_CONTAINER] ${post.slug}`);
                failCount++;
                continue;
            }

            // CLEANUP
            container.find('.main-menu, .header-top-area, .header-middle-area, .footer-area, .breadcroumb-bg, .sidebar, .widget').remove();
            container.find('script, style, iframe').remove();

            const blocks = parseNodes($, container);

            if (blocks.length > 0) {
                const { error: updateError } = await supabase
                    .from('post')
                    .update({ structured_content: blocks })
                    .eq('id', post.id);

                if (updateError) {
                    console.error(`[DB_FAIL] ${post.slug}:`, updateError.message);
                    failCount++;
                } else {
                    successCount++;
                    // stdout progress dot
                    if (successCount % 50 === 0) process.stdout.write('.');
                }
            } else {
                console.warn(`[EMPTY_PARSE] ${post.slug}`);
                failCount++;
            }

        } catch (err) {
            console.error(`[EXCEPTION] ${post.slug}:`, err.message);
            failCount++;
        }
    }

    console.log('\n--- Migration Complete ---');
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
}

migrateAll();
