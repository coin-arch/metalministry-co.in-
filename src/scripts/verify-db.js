
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const rootEnvPath = path.join(__dirname, '../../.env');
const clientEnvPath = path.join(__dirname, '../../.env.local');

// 1. Load Root .env
const rootConfig = dotenv.config({ path: rootEnvPath });
if (rootConfig.error) console.log("Root .env not found");

// 2. Load .env.local (Override)
const localConfig = dotenv.config({ path: clientEnvPath, override: true });
if (localConfig.error) console.log(".env.local not found");

// Debug print (masked)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log(`URL: ${url ? 'Found' : 'Missing'}`);
console.log(`KEY: ${key ? 'Found' : 'Missing'}`);

const supabase = createClient(url, key);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;
const TEST_SLUG = 'stainless-steel-threaded-forged-fittings-manufacturer';

async function verify() {
    console.log(`Checking content for: ${TEST_SLUG}`);
    const { data, error } = await supabase
        .from('post')
        .select('content, title, structured_content')
        .eq('slug', TEST_SLUG)
        .eq('company_id', COMPANY_ID)
        .single();

    if (error) {
        console.error('Error fetching:', error);
        return;
    }

    if (!data) {
        console.log('No post found!');
        return;
    }

    console.log('--- CONTENT START ---');
    console.log(data.content.substring(0, 500));
    console.log('--- CONTENT END ---');

    if (data.structured_content && data.structured_content.length > 0) {
        console.log("WARNING: structured_content IS PRESENT! This might be overriding the fixed 'content' field.");
        console.log("Length:", data.structured_content.length);
    } else {
        console.log("INFO: structured_content is empty/null. Page should use 'content'.");
    }

    if (data.content.includes('col-sm-3 col-md-3')) {
        console.log("WARNING: Content seems to contain the Logo/Menu column structure!");
    } else if (data.content.includes('ss-block')) {
        console.log("SUCCESS: Content appears to be the correct ss-block!");
    } else if (data.content.includes('One of the India\'s leading Stockist')) {
        console.log("SUCCESS: Content contains expected header text!");
    } else {
        console.log("UNCLEAR: Analyze the snippet above.");
    }
}

verify();
