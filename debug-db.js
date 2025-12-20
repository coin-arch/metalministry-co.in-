const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;

console.log('Supabase URL:', supabaseUrl);
console.log('Company ID:', companyId);

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    const { data, error } = await supabase
        .from('post')
        .select('slug, title')
        .eq('company_id', companyId)
        .limit(5);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
}

checkData();
