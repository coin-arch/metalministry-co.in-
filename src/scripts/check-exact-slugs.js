
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSlugs() {
    console.log('Fetching slugs for "Stockist" items...');

    // Fetch specifically items that might be causing issues
    const { data: posts, error } = await supabase
        .from('posts')
        .select('title, slug')
        .ilike('title', '%Stockist%') // filter in DB to save bandwidth
        .limit(100);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log(`Found ${posts.length} Stockist items.`);

    const targets = [
        'Carbon Steel Socket Weld',
        'Hastelloy Socket Weld',
        'Inconel Alloy 825',
        'Monel Alloy Socket',
        '316 Socket Weld',
        '347 Socket',
        'Titanium'
    ];

    posts.forEach(p => {
        const titleLower = p.title.toLowerCase();
        // Check if this post matches any of our problem categories
        if (targets.some(t => p.title.includes(t))) {
            console.log(`MATCH: "${p.title}"  ->  "${p.slug}"`);
        }
    });
}

checkSlugs();
