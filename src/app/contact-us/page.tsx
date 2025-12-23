import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-[var(--font-outfit)]">
            {/* Header Strip - Slate Theme */}
            <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
                        Have a question or need a quote? We are here to help you with your metal requirements.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 -mt-10 relative z-20">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2">

                    {/* Contact Form (Left) */}
                    <div className="p-12 lg:p-16 order-2 lg:order-1 bg-white dark:bg-slate-900">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                    <input type="text" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white outline-none placeholder:text-gray-400" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white outline-none placeholder:text-gray-400" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input type="email" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white outline-none placeholder:text-gray-400" placeholder="john@company.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Product Interest</label>
                                <select className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white outline-none cursor-pointer">
                                    <option>Stainless Steel Pipes</option>
                                    <option>Butt Weld Fittings</option>
                                    <option>Flanges</option>
                                    <option>High Nickel Alloys</option>
                                    <option>Other / General Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white outline-none resize-none placeholder:text-gray-400" placeholder="Tell us about your requirements..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info (Right) */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-gray-100 dark:border-slate-800">

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h2>
                            <div className="space-y-10">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Registered Office</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Prasad Chambers<br />
                                            Tata Rd No 2, Charni Road East,<br />
                                            Opera House, Girgaon,<br />
                                            Mumbai, Maharashtra 400004
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Phone</h3>
                                        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">+91-9892171042</p>
                                        <p className="text-sm text-gray-500 mt-1">(Mon-Sat, 9am - 7pm IST)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Email</h3>
                                        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">enquiry@metalministry.in</p>
                                        <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700 relative z-10">
                            <div className="flex items-center gap-4 text-gray-500">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm">Operating Hours: 09:00 AM - 07:00 PM</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Map Section */}
                <div className="mt-12 bg-white dark:bg-slate-900 p-2 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 h-[450px] relative overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.6559533358!2d72.8166699742478!3d18.95287705602738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce0e60802c63%3A0x6295551f33276668!2sPrasad%20Chambers%20Opera%20House!5e0!3m2!1sen!2sin!4v1703333333333!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
}
