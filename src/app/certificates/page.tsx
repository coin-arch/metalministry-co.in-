import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import Marquee from '@/components/Marquee';

export default function Certificates() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">

            {/* Hero Section */}
            <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-bold mb-6">Certificates</h1>
                    <p className="text-xl max-w-2xl mx-auto text-blue-100">
                        Validated by international standards.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 z-0 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="p-12 md:p-16">
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShieldCheck className="w-10 h-10 text-blue-600" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">ISO 9001:2015 Certified</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                Metal Ministry Inc. is proud to be an ISO certified company. Our commitment to quality management ensures that every product leaving our facility meets the most stringent international standards. We believe in transparency and trust.
                            </p>

                            {/* Replaced broken download with View Quality Policy as it's more relevant if no PDF exists yet */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/quality" className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    View Quality Policy
                                </Link>
                                <Link href="/contact-us" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                                    Request Audit Report
                                </Link>
                            </div>
                        </div>

                        {/* Marquee inside the card */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 py-8 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-6">Accredited By</p>
                            <Marquee speed={30}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <div key={num} className="relative w-24 h-16 opacity-70 hover:opacity-100 transition-opacity">
                                        <Image
                                            src={`/images/partner0${num}.png`}
                                            alt={`Certification ${num}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
