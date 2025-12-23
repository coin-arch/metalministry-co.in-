
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const clientEnvPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath, override: true });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    // Mimic the catalog query
    const { data: posts } = await supabase
        .from('post')
        .select('title, slug')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
        .eq('type', 'product')
        .order('title', { ascending: true })
        .limit(20);

    console.log("Top 20 items in Catalog:");
    console.table(posts);
}

check();
