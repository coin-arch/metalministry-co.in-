const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check202() {
    const { data, error } = await supabase
        .from('post')
        .select('slug, title')
        .ilike('slug', '%202%')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID);

    console.log('Found 202 products:', data);

    // Also check for "Stainless Steel 202" specifically in title
    const { data: titleSearch } = await supabase
        .from('post')
        .select('slug, title')
        .ilike('title', '%202%')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID);

    console.log('Found title 202:', titleSearch);
}

check202();
