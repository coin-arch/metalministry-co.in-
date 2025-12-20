const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;

async function findFasteners() {
    console.log('Searching for fasteners...');
    const { data, error } = await supabase
        .from('post')
        .select('slug, title')
        .eq('company_id', companyId)
        .or('slug.ilike.%fastener%,slug.ilike.%bolt%,slug.ilike.%nut%,slug.ilike.%washer%')
        .limit(5);

    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
}

findFasteners();
