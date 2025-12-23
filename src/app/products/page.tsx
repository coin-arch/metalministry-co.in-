import { createClient } from '@/lib/supabase';
import ProductCatalog from '@/components/ProductCatalog';

// export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Our Products - Metal Ministry Inc.',
    description: 'Explore our comprehensive range of Stainless Steel, High Nickel Alloy, and Duplex Steel products.',
};

export default async function ProductsIndexPage() {
    const supabase = createClient();
    let posts = null;
    let error = null;

    try {
        console.log("Fetching products for Company:", process.env.NEXT_PUBLIC_COMPANY_ID);
        const result = await supabase
            .from('post')
            .select('title, slug, meta_description')
            .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
            .eq('type', 'product')
            .not('slug', 'eq', 'about-us') // Explicitly exclude About Us
            .not('title', 'ilike', '%Pipes%') // Exclude Pipes if they are polluting
            .order('title', { ascending: true });

        posts = result.data;
        error = result.error;

        if (error) {
            console.error("Error fetching products:", error);
        }
    } catch (err) {
        console.error("Unexpected error in ProductsIndexPage:", err);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Product Catalog</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We manufacture and export a wide range of ferrous and non-ferrous metal products complying with international standards.
                    </p>
                </div>

                {/* Client Component with Search & Filter - Passing Cleaned Data */}
                {posts && (() => {
                    // SERVER-SIDE CLEANUP
                    // 1. Deduplicate by slug
                    const uniquePosts = Array.from(new Map(posts.map(item => [item.slug, item])).values());

                    // 2. Strict Filter
                    const cleanPosts = uniquePosts.filter(p => {
                        const title = p.title.toLowerCase();
                        const slug = p.slug.toLowerCase();

                        // Exclude Non-Product Pages that might be in the database as 'products' or 'posts'
                        const nonProducts = ['about us', 'contact', 'disclaimer', 'quality', 'privacy', 'sitemap', 'terms'];
                        if (nonProducts.some(term => title.toLowerCase().includes(term) || slug.includes(term))) return false;


                        // Exclude Non-Forged Fittings (e.g. Pipes, if accidentally mixed)
                        if (title.includes('pipe') || title.includes('tube')) return false;

                        // Exclude Location-Based SEO Spam (Duplicates)
                        // Using .includes() to catch suffixes like '-uae', '-uaer', '-oman', etc. anywhere in the slug
                        const spamSuffixes = ['-uae', '-oman', '-qatar', '-kuwait', '-saudi', '-bahrain', 'saudi arabia'];
                        if (spamSuffixes.some(suffix => slug.includes(suffix) || title.toLowerCase().includes(suffix))) return false;

                        return true;
                    });

                    return <ProductCatalog products={cleanPosts} />;
                })()}
            </div>
        </div>
    );
}
