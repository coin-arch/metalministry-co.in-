
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load env
const rootEnvPath = path.join(__dirname, '../../.env');
const clientEnvPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: rootEnvPath });
const clientEnvConfig = dotenv.config({ path: clientEnvPath }).parsed;
if (clientEnvConfig) {
    for (const k in clientEnvConfig) {
        process.env[k] = clientEnvConfig[k];
    }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

if (!SUPABASE_URL || !SUPABASE_KEY || !COMPANY_ID) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const PUBLIC_HTML_DIR = path.join(__dirname, '../../legacy_source');
const EXCLUDED_FILES = [
    'index.html', 'contact-us.html', 'about-us.html', 'sitemap.html', 'thank-you.html', 'googlef006c00a2c7879ea.html'
];

async function repair() {
    console.log('Starting content repair...');
    const files = glob.sync('*.html', { cwd: PUBLIC_HTML_DIR });
    let updatedCount = 0;

    for (const file of files) {
        if (EXCLUDED_FILES.includes(file)) continue;

        try {
            const filePath = path.join(PUBLIC_HTML_DIR, file);
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);
            const slug = path.basename(file, '.html');

            // TARGET SPECIFIC CONTENT BLOCK
            // The bug was selecting the first .col-sm-9 which was the menu.
            // Converting to use .ss-block which is unique to the content area, or fall back to second col-sm-9?
            // Safest: #single-service .col-sm-9 OR .ss-block
            let content = $('.ss-block').html();

            // If .ss-block not found, try #single-service .col-sm-9
            if (!content) {
                content = $('#single-service .col-sm-9').html();
            }

            // Fallback for pages that might not have standard structure (like Quality/Certificates if they were dynamic?)
            // But let's stick to fixing the product pages first.
            if (!content) {
                // Try finding any col-sm-9 that is NOT the menu
                const candidates = $('.col-sm-9');
                if (candidates.length > 1) {
                    // The second one is likely content
                    content = $(candidates[1]).html();
                } else {
                    // Check for col-sm-12 (full width pages)
                    const col12 = $('.col-sm-12');
                    // Filter out header/footer/copyright/topbar col-12s if possible, or just grab the biggest text block?
                    // For now, let's log if we can't find specific content
                    if (!content) {
                        console.warn(`[SKIP] Could not identify content block for ${file}`);
                        continue;
                    }
                }
            }

            if (!content) continue;

            // Cleanups
            const content$ = cheerio.load(content, null, false);
            content$('script').remove();
            content$('style').remove();
            content$('link').remove(); // remove linked stylesheets
            content$('iframe').remove(); // remove maps/videos if unwanted? Keep for now.
            content$('.whatsapp').remove(); // remove floating whatsapp if present in content
            content$('#snippet-box').remove(); // remove legacy SEO snippet box if unwanted (user said "irrelevant things")

            // Remove the enquiry form inside the content? 
            // The file showed <div class="col-sm-9 ss-block"> ... <aside> ... </aside> NO, aside is sibling.
            // But inside ss-block there is a Form? No, Form is in aside usually?
            // Wait, looking at file: 
            // <div class="col-sm-9 ss-block"> ...content... </div>
            // <aside class="col-sm-3"> ...widget form... </aside>
            // So extracting .ss-block is correct.

            // Fix Images
            content$('img').each((i, el) => {
                const src = content$(el).attr('src');
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    content$(el).attr('src', '/images/products/' + path.basename(src)); // Remap to verified product images folder if possible
                    // Or keep original path if we copied everything? 
                    // earlier we said we copied legacy images to /images/products/ ?
                    // Let's stick to generic fix:
                    // content$(el).attr('src', '/' + src); 
                    // actually, better to use the flat images structure if we flattened it.
                    // The user said: "Copied ~250 product images from legacy_source/images to public/images/products/"
                    // So we should repoint to /images/products/filename
                    content$(el).attr('src', `/images/products/${path.basename(src)}`);
                }
            });

            // Fix Links
            content$('a').each((i, el) => {
                const href = content$(el).attr('href');
                if (href && href.endsWith('.html')) {
                    const linkSlug = path.basename(href, '.html');
                    if (linkSlug !== slug) {
                        if (href === 'index.html') content$(el).attr('href', '/');
                        else if (href === 'contact-us.html') content$(el).attr('href', '/contact-us');
                        else if (href === 'about-us.html') content$(el).attr('href', '/about-us');
                        else content$(el).attr('href', `/products/${linkSlug}`);
                    }
                }
            });

            content = content$.html();

            // Update Database
            const { error } = await supabase
                .from('post')
                .update({
                    content: content,
                    structured_content: null // Force fallback to content
                })
                .eq('slug', slug)
                .eq('company_id', COMPANY_ID);

            if (error) {
                console.error(`Error updating ${slug}:`, error.message);
            } else {
                console.log(`Repaired: ${slug}`);
                updatedCount++;
            }

        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log(`Repair Complete. Updated: ${updatedCount}`);
}

repair();
