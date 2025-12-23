'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Mail, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isTransparent = isHomePage && !isScrolled;
    const textColorClass = isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-blue-600';
    const logoClass = isTransparent ? 'brightness-0 invert drop-shadow-md' : '';

    return (
        <header
            className={`z-50 transition-all duration-300 border-b 
            ${isHomePage ? 'fixed top-0 left-0 right-0' : 'sticky top-0 bg-white shadow-sm'}
            ${isTransparent ? 'bg-transparent border-white/10 py-4' : 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-2'}
            `}
        >
            {/* Top Strip - Only on Home Page */}
            {isHomePage && (
                <div className={`absolute top-0 left-0 w-full overflow-hidden transition-all duration-500 ${isScrolled ? 'h-0 opacity-0' : 'h-8 opacity-100 bg-black/40 backdrop-blur-sm'}`}>
                    <div className="w-full h-full flex items-center">
                        <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-medium tracking-widest text-white/90 uppercase px-4">
                            <span>ISO 9001:2015 Certified Manufacturer & Exporter</span>
                            <span><Mail size={12} className="inline mr-1" /> enquiry@metalministry.in</span>
                            <span><Phone size={12} className="inline mr-1" /> +91-9892171042</span>
                            <span>Global Shipping Available</span>
                            <span> </span>
                            <span>ISO 9001:2015 Certified Manufacturer & Exporter</span>
                            <span><Mail size={12} className="inline mr-1" /> enquiry@metalministry.in</span>
                            <span><Phone size={12} className="inline mr-1" /> +91-9892171042</span>
                            <span>Global Shipping Available</span>
                        </div>
                    </div>
                </div>
            )}

            <div className={`container mx-auto px-4 transition-all duration-300 ${isTransparent ? 'mt-6' : 'mt-0'}`}>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 relative group z-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/logo.png"
                            alt="Metal Ministry Inc. Logo"
                            className={`h-16 md:h-20 w-auto object-contain transition-all duration-500 ${logoClass}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Home
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link href="/about-us" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        {/* Threaded Fittings Dropdown */}
                        <div
                            className="relative group h-full"
                            onMouseEnter={() => handleMouseEnter('threaded')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className={`flex items-center gap-1 ${textColorClass} font-bold tracking-wide text-sm uppercase py-4 group`}>
                                Threaded Fittings <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'threaded' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 'threaded' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full -left-10 w-[600px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg border border-gray-100 overflow-hidden grid grid-cols-2 p-6 pb-16 gap-x-8 gap-y-4"
                                    >
                                        <Link href="/products/stainless-steel-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Stainless Steel</Link>
                                        <Link href="/products/carbon-steel-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Carbon Steel</Link>
                                        <Link href="/products/alloy-steel-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Alloy Steel</Link>
                                        <Link href="/products/duplex-steel-s31803-s32205-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Duplex Steel</Link>
                                        <Link href="/products/super-duplex-steel-s32750-s32760-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Super Duplex Steel</Link>
                                        <Link href="/products/nickel-alloy-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Nickel Alloys</Link>
                                        <Link href="/products/inconel-alloy-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Inconel</Link>
                                        <Link href="/products/monel-alloy-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Monel</Link>
                                        <Link href="/products/hastelloy-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Hastelloy</Link>
                                        <Link href="/products/titanium-alloy-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Titanium</Link>
                                        <Link href="/products/cupro-nickel-threaded-forged-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Cupro Nickel</Link>

                                        {/* Footer Link */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gray-50 border-t border-gray-100 p-3 text-center">
                                            <Link href="/products" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1">
                                                View Complete Catalog <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Socket Weld Fittings Dropdown */}
                        <div
                            className="relative group h-full"
                            onMouseEnter={() => handleMouseEnter('socketweld')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className={`flex items-center gap-1 ${textColorClass} font-bold tracking-wide text-sm uppercase py-4 group`}>
                                Socket Weld Fittings <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'socketweld' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 'socketweld' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full -left-10 w-[600px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg border border-gray-100 overflow-hidden grid grid-cols-2 p-6 pb-16 gap-x-8 gap-y-4"
                                    >
                                        <Link href="/products/stainless-steel-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Stainless Steel</Link>
                                        <Link href="/products/carbon-steel-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Carbon Steel</Link>
                                        <Link href="/products/alloy-steel-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Alloy Steel</Link>
                                        <Link href="/products/duplex-steel-s31803-s32205-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Duplex Steel</Link>
                                        <Link href="/products/super-duplex-steel-s32750-s32760-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Super Duplex Steel</Link>
                                        <Link href="/products/nickel-alloy-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Nickel Alloys</Link>
                                        <Link href="/products/inconel-alloy-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Inconel</Link>
                                        <Link href="/products/monel-alloy-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Monel</Link>
                                        <Link href="/products/hastelloy-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Hastelloy</Link>
                                        <Link href="/products/titanium-alloy-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Titanium</Link>
                                        <Link href="/products/cupro-nickel-socket-weld-fittings-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Cupro Nickel</Link>

                                        {/* Footer Link */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gray-50 border-t border-gray-100 p-3 text-center">
                                            <Link href="/products" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1">
                                                View Complete Catalog <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/quality" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Quality
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/certificates" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Certificates
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/blogs" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Blogs
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/contact-us" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Contact
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:block shrink-0">
                        <Link href="/contact-us" className={`px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 transition-all text-base flex items-center gap-2 whitespace-nowrap tracking-wide border ${!isTransparent ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white border-transparent' : 'bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white hover:text-blue-900'}`}>
                            Get Quote <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className={`lg:hidden ${textColorClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: '100vh', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto"
                        >
                            <nav className="p-6 flex flex-col space-y-6 mt-10">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Home</Link>
                                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">About Us</Link>
                                <div className="text-2xl font-bold text-gray-800">Threaded Fittings</div>
                                <Link href="/products/stainless-steel-threaded-forged-fittings-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Stainless Steel</Link>
                                <Link href="/products/carbon-steel-threaded-forged-fittings-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Carbon Steel</Link>

                                <div className="text-2xl font-bold text-gray-800 mt-4">Socket Weld Fittings</div>
                                <Link href="/products/stainless-steel-socket-weld-fittings-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Stainless Steel</Link>
                                <Link href="/products/carbon-steel-socket-weld-fittings-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Carbon Steel</Link>

                                <Link href="/quality" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800 mt-4">Quality</Link>
                                <Link href="/certificates" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Certificates</Link>
                                <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Blogs</Link>
                                <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-blue-600 mt-4">Contact Us</Link>
                            </nav>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </header >
    );
}
