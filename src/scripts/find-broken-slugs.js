
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const problemTitles = [
    'Carbon Steel Socket Weld Fittings',
    'Hastelloy Socket Weld Fittings',
    'Hastelloy Threaded Forged Fittings',
    'Inconel Alloy 825 Socket',
    'Inconel Alloy Socket weld',
    'Inconel Alloy Threaded Forged',
    'Monel Alloy Socket Weld',
    'Monel Alloy Threaded Forged',
    'Stainless Steel 316 Socket Weld',
    'Stainless Steel 316TI Socket Weld',
    'Stainless Steel 347 Socket',
    'Titanium Alloy Grade 2 Socket Weld'
];

async function checkSlugs() {
    console.log('Searching for problem products...');

    // Fetch all products to filter in memory (easier for partial matches)
    const { data: posts, error } = await supabase
        .from('posts')
        .select('title, slug')
        .eq('company_id', companyId)
        .eq('type', 'product');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    problemTitles.forEach(searchTeam => {
        const matches = posts.filter(p => p.title.toLowerCase().includes(searchTeam.toLowerCase()));
        console.log(`\n--- Matches for "${searchTeam}" ---`);
        matches.forEach(m => {
            // Filter out the spam ones we know about for clarity
            if (!m.slug.includes('-uae') && !m.slug.includes('-oman') && !m.slug.includes('-qatar')) {
                console.log(`Title: "${m.title}"\nSlug:  "${m.slug}"`);
            }
        });
    });
}

checkSlugs();
