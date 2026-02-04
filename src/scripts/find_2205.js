const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function find2205() {
    const { data, error } = await supabase
        .from('post')
        .select('slug, title')
        .ilike('slug', '%2205%')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID);

    console.log('Found 2205 products:', data);
}

find2205();
