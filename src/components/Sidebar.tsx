import Link from 'next/link';
import { Phone, Mail, ChevronRight } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-full lg:w-1/4 px-4 border-l border-gray-100 dark:border-slate-800">
            {/* Sticky Container */}
            <div className="sticky top-20 space-y-4">

                {/* Threaded Fittings Widget */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3 border-b dark:border-slate-700 pb-2">Threaded Fittings</h3>
                    <ul className="space-y-1.5 text-sm">
                        <li>
                            <Link href="/products/stainless-steel-threaded-forged-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Stainless Steel
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/carbon-steel-threaded-forged-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Carbon Steel
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/alloy-steel-threaded-forged-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Alloy Steel
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/inconel-alloy-threaded-forged-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Inconel Alloy
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/duplex-steel-s31803-s32205-threaded-forged-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Duplex Steel
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Socket Weld Widget */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3 border-b dark:border-slate-700 pb-2">Socket Weld Fittings</h3>
                    <ul className="space-y-1.5 text-sm">
                        <li>
                            <Link href="/products/stainless-steel-socket-weld-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Stainless Steel
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/carbon-steel-socket-weld-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Carbon Steel
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/alloy-steel-socket-weld-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Alloy Steel
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/inconel-alloy-socket-weld-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Inconel Alloy
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/duplex-steel-s31803-s32205-socket-weld-fittings-manufacturer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="mr-2">›</span> Duplex Steel
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Widget - Sticky & Last */}
                {/* Quick Enquiry Form - Modern Replacement for Legacy Widget */}
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                        <Mail size={18} className="text-blue-400" /> Request a Quote
                    </h3>

                    <form className="space-y-3 relative z-10">
                        <div>
                            <input type="text" placeholder="Your Name" className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white" />
                        </div>
                        <div>
                            <input type="email" placeholder="Email Address" className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white" />
                        </div>
                        <div>
                            <input type="tel" placeholder="Phone Number" className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white" />
                        </div>
                        <div>
                            <textarea placeholder="Message / Requirements" rows={3} className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-900/50 text-sm">
                            Send Enquiry
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-3 mb-2">
                            <Phone size={16} className="text-blue-400" />
                            <a href="tel:+919892171042" className="text-slate-300 hover:text-white text-sm transition-colors">+91-9892171042</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-blue-400" />
                            <a href="mailto:enquiry@metalministry.in" className="text-slate-300 hover:text-white text-sm transition-colors">enquiry@metalministry.in</a>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
