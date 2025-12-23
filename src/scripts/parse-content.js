const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });
const clientEnvPath = path.join(__dirname, '../../.env.local');
const clientEnv = dotenv.config({ path: clientEnvPath }).parsed || {};

const SUPABASE_URL = clientEnv.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const COMPANY_ID = clientEnv.NEXT_PUBLIC_COMPANY_ID || process.env.NEXT_PUBLIC_COMPANY_ID;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
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

        // 5. TABLES (Direct or wrapped)
        else if (tag === 'table') {
            blocks.push(parseTable($, $el));
        }

        // 6. DIVS (Wrappers, Panels, Summaries)
        else if (tag === 'div') {
            // Table Responsive
            if ($el.hasClass('table-responsive')) {
                const $table = $el.find('table');
                if ($table.length) blocks.push(parseTable($, $table));
            }
            // Summary Section
            else if ($el.children('.snippet-title').length > 0) {
                blocks.push({
                    type: 'section',
                    variant: 'summary',
                    title: cleanText($el.find('.snippet-title').text()),
                    content: cleanText($el.find('.snippet-markup').text())
                });
            }
            // Accordion Group
            else if ($el.hasClass('panel-group')) {
                const items = [];
                $el.find('.panel').each((j, panel) => {
                    const $panel = $(panel);
                    const title = cleanText($panel.find('.panel-heading, .panel-title').text());
                    // Recurse into body
                    const bodyBlocks = parseNodes($, $panel.find('.panel-body'));
                    items.push({ title, body: bodyBlocks });
                });
                blocks.push({ type: 'accordion', items });
            }
            // Generic Div - Recurse but don't flatten too much
            else {
                // If it's a structural div like row/col, recurse
                const childBlocks = parseNodes($, $el);
                blocks.push(...childBlocks);
            }
        }
        // Center tag
        else if (tag === 'center') {
            const childBlocks = parseNodes($, $el);
            blocks.push(...childBlocks);
        }
    });

    return blocks;
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
        rows.push(cells);
    });
    return { type: 'table', rows };
}

function parseHTMLToBlocks(html) {
    const $ = cheerio.load(html);
    return parseNodes($, $('body'));
}

async function run() {
    console.log(`Fetching posts for Company ID: ${COMPANY_ID}...`);

    // Fetch posts that have content
    const { data: posts, error } = await supabase
        .from('post')
        .select('id, slug, title, content')
        .eq('company_id', COMPANY_ID);

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Found ${posts.length} posts. Parsing...`);

    const results = [];

    for (const post of posts) {
        if (!post.content) continue;

        console.log(`Processing: ${post.slug}`);
        const blocks = parseHTMLToBlocks(post.content);

        results.push({
            id: post.id,
            slug: post.slug,
            blocks_count: blocks.length,
            blocks_preview: blocks.slice(0, 3), // Preview first 3
            full_blocks: blocks
        });
    }

    // Output results to file for inspection
    fs.writeFileSync('parsed_content_preview.json', JSON.stringify(results.map(r => ({
        slug: r.slug,
        blocks_count: r.blocks_count,
        preview: r.blocks_preview
    })), null, 2));

    console.log('Preview saved. Writing to Database...');

    // Write to DB
    for (const item of results) {
        process.stdout.write(`Updating ${item.slug}... `);
        const { error } = await supabase
            .from('post')
            .update({ structured_content: item.full_blocks })
            .eq('id', item.id);

        if (error) {
            console.error(`FAILED: ${error.message}`);
        } else {
            console.log('OK');
        }
    }

    console.log('Database update complete.');
}

run();
