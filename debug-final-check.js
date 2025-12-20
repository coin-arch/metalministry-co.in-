const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;

const slugsToCheck = [
    'stainless-steel-316-316l-seamless-welded-erw-pipes-tubes-exporter',
    'stainless-steel-buttweld-fittings-manufacturer',
    'stainless-steel-forged-fittings-manufacturer',
    'stainless-steel-347-347h-weldneck-flanges-manufacturer-supplier',
    'high-nickel-alloy-seamless-welded-pipes-tubes-exporter',
    'duplex-steel-uns-s31803-pipe-fitting-manufacturer',
    'super-duplex-uns-s32750-pipe-fitting-manufacturer',
    'copper-nickel-pipes-tubes-manufacturer',
    'titanium-pipe-fittings-manufacturer'
];

async function checkFinal() {
    console.log('Checking all navigation slugs...');
    const { data: found, error } = await supabase
        .from('post')
        .select('slug')
        .eq('company_id', companyId)
        .in('slug', slugsToCheck);

    if (error) { console.error(error); return; }

    const foundSlugs = found.map(f => f.slug);
    const missing = slugsToCheck.filter(s => !foundSlugs.includes(s));

    console.log('--- MISSING SLUGS ---');
    console.log(missing);

    if (missing.length > 0) {
        console.log('\n--- FINDING ALTERNATIVES ---');
        for (const m of missing) {
            // Split by - and take some keywords
            const keywords = m.split('-').filter(w => w.length > 3 && !['stainless', 'steel', 'manufacturer', 'exporter'].includes(w));
            const query = keywords[0] || 'fitting';

            const { data: alts } = await supabase
                .from('post')
                .select('slug')
                .eq('company_id', companyId)
                .ilike('slug', `%${query}%`)
                .limit(3);

            console.log(`Alternatives for ${m} (query: ${query}):`, alts?.map(a => a.slug));
        }
    }
}

checkFinal();
