const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const NAV_DATA_PATH = './src/lib/nav-data.json';
const OUTPUT_PATH = './src/lib/nav-data-fixed.json';

async function reconcile() {
    const navData = JSON.parse(fs.readFileSync(NAV_DATA_PATH, 'utf8'));
    const fixedNavData = [];

    for (const category of navData) {
        console.log(`Processing Category: ${category.label}`);
        const fixedItems = [];

        for (const item of category.items) {
            let slug = item.href.replace('/products/', '');

            // Checks 1: Exact Match
            let { data, error } = await supabase
                .from('post')
                .select('slug')
                .eq('slug', slug)
                .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
                .single();

            if (data) {
                fixedItems.push(item);
                continue;
            }

            // Check 2: Try replacing '-stockist' with '-exporter'
            if (slug.endsWith('-stockist')) {
                const trySlug = slug.replace('-stockist', '-exporter');
                ({ data } = await supabase
                    .from('post')
                    .select('slug')
                    .eq('slug', trySlug)
                    .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
                    .single());

                if (data) {
                    console.log(`  Fixed: ${slug} -> ${data.slug}`);
                    fixedItems.push({ ...item, href: `/products/${data.slug}` });
                    continue;
                }
            }

            // Check 3: Fuzzy Search (keywords)
            // e.g. "stainless-steel-304-304l-304h-sheets-plates..." -> search "%304%sheet%"
            // This is hard to generalize, but we can try some heuristics
            // Simplify: take first 3 parts of slug? 
            const parts = slug.split('-');
            if (parts.length > 3) {
                const simplePattern = `%${parts[0]}%${parts[1]}%${parts[2]}%`; // very rough
                // Better: try to extract material and type
            }

            // Check 4: Try finding ANY slug that contains significant parts
            // For now, let's just log failures and maybe try a very broad search match
            console.log(`  MISSING: ${slug}`);

            // Attempt broad search for suggestion
            // e.g. stainless-steel-15-5ph-chequered-plates... -> search for 15-5ph
            const materialMatch = slug.match(/(\d+-\d+ph|\d+|alloy-\d+|inconel-\d+)/i);
            const typeMatch = slug.match(/(sheet|plate|pipe|fitting|flange|bar|rod)/i);

            if (materialMatch && typeMatch) {
                const query = `%${materialMatch[0]}%${typeMatch[0]}%`;
                const { data: suggestions } = await supabase
                    .from('post')
                    .select('slug')
                    .ilike('slug', query)
                    .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
                    .limit(1);

                if (suggestions && suggestions.length > 0) {
                    console.log(`    Suggest: ${suggestions[0].slug}`);
                    fixedItems.push({ ...item, href: `/products/${suggestions[0].slug}` }); // Auto-fix? Maybe risky. Let's do it for now.
                } else {
                    console.log(`    No suggestion found for ${query}`);
                }
            } else {
                // Keep it but maybe mark it? checking later.
                // For safety, we DROP items we can't verify, as per user request "showing *only* those products which are there"
                // Or we can keep them to manually review. User said "make sure we are showing only those products which are there".
                // So dropping is safer.
                console.log(`    DROPPING invalid link.`);
            }
        }

        if (fixedItems.length > 0) {
            fixedNavData.push({ ...category, items: fixedItems });
        }
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(fixedNavData, null, 2));
    console.log(`\nWrote fixed data to ${OUTPUT_PATH}`);
}

reconcile();
