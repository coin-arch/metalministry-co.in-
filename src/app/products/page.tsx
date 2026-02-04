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
                    // 1. Deduplicate by slug AND Normalized Title
                    const seenSlugs = new Set();
                    const seenTitles = new Set();

                    const cleanPosts = posts.filter(p => {
                        // 1. Basic Filters from before
                        if (p.slug === 'about-us') return false;
                        const title = p.title.toLowerCase();
                        const slug = p.slug.toLowerCase();

                        const nonProducts = ['about us', 'contact', 'disclaimer', 'quality', 'privacy', 'sitemap', 'terms'];
                        if (nonProducts.some(term => title.includes(term) || slug.includes(term))) return false;

                        // Exclude Location-Based SEO Spam
                        const spamSuffixes = ['-uae', '-oman', '-qatar', '-kuwait', '-saudi', '-bahrain', 'saudi arabia'];
                        if (spamSuffixes.some(suffix => slug.includes(suffix) || title.includes(suffix))) return false;

                        // 2. Strict Deduplication
                        // Slug Check
                        if (seenSlugs.has(slug)) return false;

                        // Title Normalization (remove manufacturer, stockist, exporter, etc.)
                        const normTitle = title
                            .replace(/sheets/g, 'sheet').replace(/plates/g, 'plate')
                            .replace(/bars/g, 'bar').replace(/rods/g, 'bar')
                            .replace(/stockist/g, '').replace(/manufacturer/g, '')
                            .replace(/exporter/g, '').replace(/supplier/g, '')
                            .replace(/distributor/g, '').replace(/dealer/g, '')
                            .trim();

                        if (seenTitles.has(normTitle)) return false; // Duplicate underlying product

                        seenSlugs.add(slug);
                        seenTitles.add(normTitle);
                        return true;
                    });

                    return <ProductCatalog products={cleanPosts} />;
                })()}
            </div>
        </div>
    );
}
