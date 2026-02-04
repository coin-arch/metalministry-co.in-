import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import WhoWeAre from '@/components/home/WhoWeAre';
import FeatureCards from '@/components/home/FeatureCards';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import ContentRenderer from '@/components/content/ContentRenderer';

export const metadata: Metadata = {
    title: "About Us | Metal Ministry Inc.",
    description: "Learn about Metal Ministry Inc., a premier exporter of engineering goods and metal products including Stainless Steel, Nickel Alloys, and more since 2000.",
};

function ContentLoading() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
        </div>
    );
}

export default async function AboutUs() {
    const supabase = createClient();
    const { data: post } = await supabase
        .from('post')
        .select('*')
        .eq('slug', 'about')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
        .single();



    return (
        <div className="bg-white dark:bg-slate-900">
            {/* 1. Page Banner - Enhanced */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slide-img.jpg"
                        alt="About Us Banner"
                        fill
                        className="object-cover"
                    />
                    {/* Modern Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-slate-900/90 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-20" /> {/* Subtle texture if available, or just ignore if not */}
                </div>

                <div className="relative z-10 text-center text-white max-w-3xl px-4 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                        Since 2000
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                        Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Metal Engineering</span>
                    </h1>
                    <div className="flex justify-center gap-3 text-sm font-medium opacity-80 mt-4">
                        <span className="hover:text-blue-300 transition-colors cursor-pointer">Home</span>
                        <span className="text-blue-500">/</span>
                        <span className="text-white">About Us</span>
                    </div>
                </div>
            </section>

            {/* 2. Introduction & Vision - Dynamic Content */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />

                    <div className="mb-10 flex justify-center relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl rotate-3 shadow-lg flex items-center justify-center text-blue-600 border border-blue-100 dark:border-slate-600">
                            <Quote size={40} className="-rotate-3" />
                        </div>
                    </div>

                    {post ? (
                        <div className="text-left">
                            <ContentRenderer blocks={post.structured_content} />
                        </div>
                    ) : (
                        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            <ContentLoading />
                        </div>
                    )}
                </div>
            </section>

            {/* 3. Reused Innovation Section ("Who We Are") */}
            <WhoWeAre />

            {/* 4. Reused Services Section ("Feature Cards") */}
            <div className="bg-gray-50 dark:bg-slate-950 pb-20 pt-10">
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Core Commitments</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </div>
                <FeatureCards />
            </div>

        </div>
    );
}
