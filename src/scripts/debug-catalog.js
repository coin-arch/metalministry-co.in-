
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const rootEnvPath = path.join(__dirname, '../../.env');
const clientEnvPath = path.join(__dirname, '../../.env.local');

// Load .env.local for keys
dotenv.config({ path: clientEnvPath, override: true });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function check() {
    console.log("Fetching products for Company:", COMPANY_ID);

    // Simulate the exact query from page.tsx (before my recent edits, to see what was coming)
    // Actually, let's run the query exactly as I intended it to be to see why it fails
    const { data: posts, error } = await supabase
        .from('post')
        .select('title, slug, type')
        .eq('company_id', COMPANY_ID)
        // .eq('type', 'product') // identifying if type is actually stricter
        .order('title', { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    console.log(`\nTotal Items Found: ${posts.length}`);

    console.log("\n--- Potentially problematic items (Non-products or special pages) ---");
    const nonProducts = posts.filter(p => p.type !== 'product' || p.title.includes('About') || p.title.includes('Contact'));
    console.table(nonProducts);

    console.log("\n--- Checking for Duplicates (by slug) ---");
    const slugCounts = {};
    posts.forEach(p => {
        slugCounts[p.slug] = (slugCounts[p.slug] || 0) + 1;
    });

    const duplicates = Object.entries(slugCounts).filter(([slug, count]) => count > 1);
    if (duplicates.length > 0) {
        console.log("Found Duplicates:");
        duplicates.forEach(([slug, count]) => console.log(`${slug}: ${count}`));
    } else {
        console.log("No exact slug duplicates found.");
    }

    console.log("\n--- Sample of 'Valid' Products ---");
    console.table(posts.filter(p => !p.title.includes('About') && !p.title.includes('Contact')).slice(0, 10));
}

check();
