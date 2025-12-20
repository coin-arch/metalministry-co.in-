const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = 'https://vvrjhbmoaaexamtewidv.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_KEY_HERE';
// NOTE: I am not pasting the actual key here to avoid logging it if not safe, but in valid env it should work. 
// Actually, I should use the one from known env or trust process.env if running via npm run dev context? 
// But run_command is isolated. 
// I will rely on process.env being correctly passed if I check valid slugs.
// Wait, I don't have the key handy in this chat history (it was redacted or I missed it).
// But I can read it from `src/lib/supabase.ts` if it's there? No, usually it's in env.
// The user provided company ID: c54bfb5b-65ec-4eb2-b551-a6d647647205
// I'll try to use a simple approach: Read `imageMap` again and guess? No, checking DB is better.
// I will blindly try to run this with `process.env`.

async function main() {
    console.log("Checking slugs...");
    const supabase = createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // Check for 'flange'
    const { data, error } = await supabase
        .from('post')
        .select('title, slug')
        .ilike('slug', '%flange%')
        .limit(20);

    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
}

main();
