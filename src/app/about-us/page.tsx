import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Users, Globe, Clock, Target, Rocket } from 'lucide-react';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-[var(--font-outfit)]">
            {/* Hero Section - Industrial Dark Theme */}
            <div className="relative bg-slate-900 text-white py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black opacity-90" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-6 block animate-fade-in-up">The Metal Ministry Legacy</span>
                    <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight animate-fade-in-up delay-100 tracking-tight">
                        Forging <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Excellence</span> <br /> Since Inception
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
                        Dedicated to precision manufacturing and global supply of high-pressure forged fittings and flanges.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-24 space-y-24">

                {/* Our Story */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Who We Are</h2>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">A Partner You Can Trust</h3>
                        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify font-light">
                            <p>
                                <strong>Metal Ministry Inc.</strong> is a premier manufacturer and exporter specializing in high-quality Ferrous and Non-Ferrous metal components.
                                Under the visionary leadership of <strong className="text-blue-600">Mr. Dinesh Chandan</strong>, we have established ourselves as a reliable partner for industries ranging from Oil & Gas to Pharmaceuticals.
                            </p>
                            <p>
                                We prioritize quality above all else. Our state-of-the-art manufacturing facility ensures that every product—whether it be Stainless Steel Fittings or High Nickel Alloys—meets rigorous international standards (ASME, ASTM, DIN).
                            </p>
                            <p>
                                Located in the heart of Mumbai's metal market, we maintain a vast inventory to ensure rapid delivery for urgent specialized requirements.
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="relative bg-gray-100 dark:bg-slate-800 rounded-3xl h-[500px] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/who-we-are.jpg"
                                alt="Metal Ministry Workshop"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 dark:bg-slate-900 p-12 rounded-3xl border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                            <Target size={36} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            To be the global benchmark for quality in the metal manufacturing sector, fostering innovation and setting new standards for reliability and customer service.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900 p-12 rounded-3xl border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                            <Rocket size={36} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            To deliver excellence through superior products, maintain a zero-defect policy, and build lasting partnerships based on trust, transparency, and timely execution.
                        </p>
                    </div>
                </div>

                {/* Stats Strip (moved down) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100 dark:border-slate-800">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                        <div className="text-sm uppercase tracking-widest text-gray-500">Countries Served</div>
                    </div>
                    <div className="text-center border-l border-gray-200 dark:border-slate-800">
                        <div className="text-4xl font-bold text-blue-600 mb-2">ISO</div>
                        <div className="text-sm uppercase tracking-widest text-gray-500">9001:2015</div>
                    </div>
                    <div className="text-center border-l border-gray-200 dark:border-slate-800">
                        <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                        <div className="text-sm uppercase tracking-widest text-gray-500">Projects Done</div>
                    </div>
                    <div className="text-center border-l border-gray-200 dark:border-slate-800">
                        <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                        <div className="text-sm uppercase tracking-widest text-gray-500">Support</div>
                    </div>
                </div>

            </div>

            {/* CTA Section */}
            <div className="bg-slate-900 text-white py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20" />
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Ready to work with us?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
                        Get in touch for a competitive quote or technical consultation.
                    </p>
                    <Link href="/contact-us" className="inline-block bg-white text-slate-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105">
                        Get Quotation
                    </Link>
                </div>
            </div>
        </div>
    );
}
