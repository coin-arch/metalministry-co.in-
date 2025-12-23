import React from 'react';
import { Award, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Quality() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">

            {/* Hero Section */}
            <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-bold mb-6">Quality Policy</h1>
                    <p className="text-xl max-w-2xl mx-auto text-blue-100">
                        Our commitment to excellence: Zero defects, 100% customer satisfaction, and continuous improvement.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Commitment</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">Uncompromising Quality</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-8" />
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            Metal Ministry Inc. is dedicated to providing high-quality Forged Fittings that meet and exceed customer expectations.
                            Our Quality Assurance Systems are guided by the principles of <strong className="text-blue-600">ISO 9001:2015</strong>, ensuring consistent product performance and reliability.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-gray-700 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                            <Award className="w-14 h-14 text-blue-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">ISO Certified</h3>
                            <p className="text-gray-600 dark:text-gray-300 relative z-10 leading-relaxed">
                                We maintain an ISO 9001:2015 certified Quality Management System to monitor all processes.
                            </p>
                        </div>

                        <div className="group bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 dark:bg-gray-700 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                            <ShieldCheck className="w-14 h-14 text-purple-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">Rigorous Testing</h3>
                            <p className="text-gray-600 dark:text-gray-300 relative z-10 leading-relaxed">
                                All fittings utilize raw materials tested for chemical and mechanical properties. NDT, Ultrasonic, and Hydro testing available.
                            </p>
                        </div>

                        <div className="group bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 dark:bg-gray-700 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                            <CheckCircle className="w-14 h-14 text-green-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">Final Inspection</h3>
                            <p className="text-gray-600 dark:text-gray-300 relative z-10 leading-relaxed">
                                Rigorous stage-wise inspection ensures dimensional accuracy, correct threading, and defect-free surfaces before dispatch.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
