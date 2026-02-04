const { createClient } = require('@supabase/supabase-js');
// Hardcoding env vars for this script only to avoid process.env issues if any, 
// using values from .env.local if possible, but for this agent I see .env.local is open.
// I will read .env.local first.

const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envConfig = require('dotenv').config({ path: envPath });

    // Fallback if dotenv not installed or fails
    const fileContent = fs.readFileSync(envPath, 'utf8');
    const url = fileContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
    const key = fileContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

    console.log("URL found:", url);

    const supabase = createClient(url, key);

    async function check() {
        console.log('Searching for Pipe Fittings...');
        const { data: data_pf } = await supabase.from('post').select('slug').ilike('slug', '%pipe%fitting%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Pipe Fittings:', data_pf);

        console.log('Searching for Fittings...');
        const { data: data8 } = await supabase.from('post').select('slug').ilike('slug', '%fitting%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Fittings:', data8);

        console.log('Searching for Flanges...');
        const { data: data9 } = await supabase.from('post').select('slug').ilike('slug', '%flange%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Flanges:', data9);

        console.log('Searching for Perforated...');
        const { data: data5 } = await supabase.from('post').select('slug').ilike('slug', '%perforated%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Perforated:', data5);

        console.log('Searching for Chequered...');
        const { data: data6 } = await supabase.from('post').select('slug').ilike('slug', '%chequered%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Chequered:', data6);

        console.log('Searching for 17-4PH...');
        const { data: data7 } = await supabase.from('post').select('slug').ilike('slug', '%17-4ph%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('17-4ph:', data7);

        console.log('Searching for Alloy 20...');
        const { data: data2 } = await supabase.from('post').select('slug').ilike('slug', '%alloy%20%sheet%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Alloy 20:', data2);

        console.log('Searching for Duplex...');
        const { data: data3 } = await supabase.from('post').select('slug').ilike('slug', '%duplex%sheet%').eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID).limit(5);
        console.log('Duplex:', data3);
    }

    check();

} catch (e) {
    console.error(e);
}
