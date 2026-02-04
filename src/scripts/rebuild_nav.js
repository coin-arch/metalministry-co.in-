const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CATEGORIES = {
    'Fasteners': ['fastener', 'bolt', 'nut', 'screw', 'washer', 'stud'],
    'Bars': ['bar', 'rod', 'round-bar', 'hex-bar', 'flat-bar', 'square-bar', 'bright-bar', 'rectangular-bar', 'threaded-bar'],
    'Fittings': ['fitting', 'elbow', 'tee', 'reducer', 'stub-end', 'cap', 'coupling', 'nipple', 'union', 'plug', 'bushing'],
    'Flanges': ['flange', 'slip-on', 'blind', 'weld-neck', 'socket-weld', 'threaded', 'lap-joint', 'orifice', 'spectacle'],
    'Pipes': ['pipe'],
    'Tubes': ['tube', 'tubing'],
    'Sheet & Plates': ['sheet', 'plate', 'shim'],
    'Coils': ['coil'],
    'Wire': ['wire'],
    'Refactory Anchors': ['anchor'],
    'Strips': ['strip'],
    'Angle Channel': ['angle', 'channel']
};

async function categorize() {
    // Fetch ALL products
    const { data: products, error } = await supabase
        .from('post')
        .select('slug, title')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID);

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log(`Total Products in DB: ${products.length}`);

    const categorizedData = {};
    const usedSlugs = new Set();

    // Initialize buckets
    for (const cat of Object.keys(CATEGORIES)) {
        categorizedData[cat] = [];
    }

    // Sort products into buckets
    products.forEach(p => {
        const slug = p.slug.toLowerCase();
        let matched = false;

        // Try to match specific categories first (order matters slightly, but keywords help)
        // We'll traverse our map. 
        // Note: A "Flange Bolt" might match both. We generally want specificity.

        // Let's optimize: Check all categories, if matches multiple, pick best? 
        // For now, first match wins? No, "Pipe Fittings" contains "Pipe". 
        // We should put "Pipe Fittings" in "Fittings", not "Pipes".

        // Priority check:
        // 1. Fasteners
        // 2. Flanges
        // 3. Fittings (catch-all for fittings)
        // 4. Bars
        // 5. Sheets
        // ...

        const priorityOrder = [
            'Fasteners', 'Flanges', 'Fittings', 'Refactory Anchors', 'Bars',
            'Angle Channel', 'Coils', 'Strips', 'Wire', 'Tubes', 'Pipes', 'Sheet & Plates'
        ];

        for (const cat of priorityOrder) {
            const keywords = CATEGORIES[cat];
            if (keywords.some(k => slug.includes(k))) {
                categorizedData[cat].push({ label: p.title, href: `/products/${p.slug}` });
                usedSlugs.add(p.slug);
                matched = true;
                break;
            }
        }

        if (!matched) {
            // console.log(`Uncategorized: ${p.slug}`);
        }
    });

    // Construct clean JSON structure
    const navStructure = Object.keys(categorizedData).map(cat => ({
        label: cat,
        items: categorizedData[cat].sort((a, b) => a.label.localeCompare(b.label))
    })).filter(node => node.items.length > 0);

    // Write to file for inspection
    fs.writeFileSync('./src/lib/nav-rebuilt.json', JSON.stringify(navStructure, null, 2));

    // Stats
    console.log('\nCategory Counts:');
    navStructure.forEach(c => console.log(`  ${c.label}: ${c.items.length}`));
    console.log(`\nTotal Categorized: ${usedSlugs.size}`);
}

categorize();
