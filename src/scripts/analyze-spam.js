
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const clientEnvPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath, override: true });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function analyzeSlugs() {
    console.log("Analyzing Slugs for Location Spam...");

    const { data: posts, error } = await supabase
        .from('post')
        .select('slug')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    if (error) {
        console.error(error);
        return;
    }

    const suffixes = new Map();
    const spamCountries = ['uae', 'oman', 'qatar', 'kuwait', 'saudi-arabia', 'bahrain'];

    posts.forEach(p => {
        const parts = p.slug.split('-');
        const lastPart = parts[parts.length - 1];
        const secondLast = parts[parts.length - 2];

        // Check for known spam countries
        if (spamCountries.includes(lastPart) || (lastPart === 'arabia' && secondLast === 'saudi')) {
            const suffix = (lastPart === 'arabia') ? 'saudi-arabia' : lastPart;
            suffixes.set(suffix, (suffixes.get(suffix) || 0) + 1);
        }
    });

    console.log("\n--- Detected Location Suffixes ---");
    // Sort by count
    const sorted = [...suffixes.entries()].sort((a, b) => b[1] - a[1]);
    sorted.forEach(([suffix, count]) => console.log(`${suffix}: ${count} products`));

    const cleanCount = posts.length - sorted.reduce((acc, curr) => acc + curr[1], 0);
    console.log(`\nTotal Products: ${posts.length}`);
    console.log(`Estimated Clean Products: ${cleanCount}`);
}

analyzeSlugs();
