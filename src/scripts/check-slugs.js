
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const rootEnvPath = path.join(__dirname, '../../.env');
const clientEnvPath = path.join(__dirname, '../../.env.local');

// Load .env.local for keys
const localConfig = dotenv.config({ path: clientEnvPath, override: true });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function check() {
    console.log("Checking slugs for Company:", COMPANY_ID);

    // 1. Check for "About Us" appearing as a product
    const { data: about, error: aboutError } = await supabase
        .from('post')
        .select('title, slug, type')
        .ilike('title', '%About Us%')
        .eq('company_id', COMPANY_ID);

    console.log("\n--- 'About Us' Entries ---");
    console.table(about);

    // 2. Check for "Nickel Alloy" valid slugs
    const { data: nickel, error: nickelError } = await supabase
        .from('post')
        .select('title, slug')
        .ilike('slug', '%nickel%')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    console.log("\n--- Valid 'Nickel' Product Slugs ---");
    if (nickel) {
        nickel.forEach(p => console.log(p.slug));
    }

    // 3. unexpected metal ministry products?
    // Maybe check for "Pipes" if they shouldn't be there?
    const { data: pipes, error: pipesError } = await supabase
        .from('post')
        .select('title, slug')
        .ilike('title', '%Pipes%')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product')
        .limit(5);

    console.log("\n--- 'Pipes' entries (Should these be here?) ---");
    if (pipes) console.table(pipes);
}

check();
