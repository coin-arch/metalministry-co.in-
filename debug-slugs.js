const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
const supabase = createClient(supabaseUrl, supabaseKey);

const slugsToCheck = [
    'slip-on-flanges',
    'stainless-steel-slip-on-flanges',
    'stainless-steel-slip-on-flanges-manufacturer',
    'stainless-steel-slip-on-flanges-manufacturer-central-government-suppliers'
];

async function checkSlugs() {
    console.log('Checking slugs for Company ID:', companyId);

    // Precise title search
    const { data: found, error } = await supabase
        .from('post')
        .select('slug, title')
        .eq('title', 'Stainless Steel Nickel Alloy Duplex Steel Slip On Flanges Manufacturer')
        .limit(1);

    if (error) console.error(error);
    else if (found && found.length > 0) {
        console.log("Confirmed Slug Match:");
        found.forEach(p => console.log(`Slug: ${p.slug}`));
    } else {
        console.log("Exact title match not found. Trying ilike...");
        const { data: found2 } = await supabase
            .from('post')
            .select('slug, title')
            .ilike('title', 'Stainless Steel Nickel Alloy Duplex Steel Slip On Flanges Manufacturer%')
            .limit(1);
        found2?.forEach(p => console.log(`Alternatve Slug: ${p.slug}`));
    }
    return;  // Also search for general ones to fill gaps
    const { data: general } = await supabase
        .from('post')
        .select('slug, title')
        .or('slug.ilike.%blind-flange%,slug.ilike.%weld-neck%,slug.ilike.%threaded-flange%,slug.ilike.%plate-flange%')
        .limit(20);

    if (general) {
        console.log("Other Flanges:");
        general.forEach(p => console.log(`Slug: ${p.slug}\n---`));
    }

    return;

    /*
    const { data: found, error } = await supabase
        .from('post')
        .select('slug')
        .eq('company_id', companyId)
        .in('slug', slugsToCheck);
    */

    if (error) {
        console.error(error);
        return;
    }

    const foundSlugs = found.map(f => f.slug);
    console.log('Found Slugs:', foundSlugs);

    const missing = slugsToCheck.filter(s => !foundSlugs.includes(s));
    console.log('Missing Slugs:', missing);

    if (missing.length > 0) {
        console.log('\nSearching for alternatives for missing slugs...');
        for (const slug of missing) {
            // Search for partial matches
            // Search for partial matches - try the last meaningful words
            const parts = slug.split('-');
            const searchTerm = parts.length > 2 ? parts.slice(-3).join(' ') : slug;
            const { data: alternatives } = await supabase
                .from('post')
                .select('slug, title')
                .eq('company_id', companyId)
                .ilike('slug', `%${searchTerm}%`)
                .limit(3);

            console.log(`Alternatives for ${slug}:`, alternatives?.map(a => a.slug));
        }
    }
}

checkSlugs();
