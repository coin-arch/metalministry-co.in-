'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageForProduct } from '@/lib/image-mapper';
import { useEffect } from 'react';

type Product = {
    title: string;
    slug: string;
    meta_description: string;
};

import { useSearchParams } from 'next/navigation';

export default function ProductCatalog({ products }: { products: Product[] }) {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);

    // Sync state with URL if user clicks a different link
    
    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const filteredProducts = products.filter(p =>
        p.slug !== 'about-us' && // Explicit client-side filter
        (p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.meta_description?.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12 relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence>
                    {filteredProducts.map((product) => {
                        return (
                            <motion.div
                                layout
                                key={product.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col h-full"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-slate-800">
                                        <Image
                                            src={getImageForProduct(product.slug)}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                        {/* Floating Action / Badge */}
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-2 rounded-full shadow-lg translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                            <ArrowRight size={18} className="text-blue-600" />
                                        </div>
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col relative">
                                        {/* Decorative Line */}
                                        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-700 to-transparent group-hover:via-blue-500 transition-colors duration-500" />

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow font-light leading-relaxed">
                                            {product.meta_description || 'Premium quality forged fittings manufactured to international standards.'}
                                        </p>

                                        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                                            View Specifications <ArrowRight size={16} className="ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No products found matching &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    );
}
