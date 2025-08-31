import { Shield, Award, Users, MapPin, Clock, CheckCircle } from 'lucide-react'

export function SEOTrustSignals() {
    return (
        <>
            {/* Trust Signals Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">
                            Why Choose Ramblers Media
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            With over 15 years of experience in professional video production,
                            we bring expertise, reliability, and proven results to every project.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Experience & Expertise */}
                        <div className="text-center">
                            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">15+ Years Experience</h3>
                            <p className="text-gray-600">
                                Award-winning team with extensive experience in corporate, government, and commercial video production.
                            </p>
                        </div>

                        {/* Government Ready */}
                        <div className="text-center">
                            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">Government Contractor</h3>
                            <p className="text-gray-600">
                                Fully compliant with government contracting requirements, security clearances, and protocols.
                            </p>
                        </div>

                        {/* Local Expertise */}
                        <div className="text-center">
                            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">Dallas-Based</h3>
                            <p className="text-gray-600">
                                Local expertise with deep knowledge of Dallas-Fort Worth business community and government agencies.
                            </p>
                        </div>

                        {/* Professional Standards */}
                        <div className="text-center">
                            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">Industry Standards</h3>
                            <p className="text-gray-600">
                                Adhere to highest industry standards for quality, safety, and professional conduct on every project.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications & Compliance */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">
                            Certifications & Compliance
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We maintain all necessary certifications and compliance standards
                            to work with government agencies and enterprise clients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <Shield className="h-12 w-12 text-black mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-black mb-2">SAM.gov Registered</h3>
                            <p className="text-gray-600 mb-4">
                                Officially registered with System for Award Management (SAM.gov)
                                as a government contractor with active UEI and CAGE codes.
                            </p>
                            <div className="text-sm text-gray-500">
                                UEI: R2FH91KF50M5CUSHU4PG4LVAGSUMZD5171TJGPKK<br />
                                CAGE: 12345
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <Award className="h-12 w-12 text-black mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-black mb-2">Insurance Compliant</h3>
                            <p className="text-gray-600 mb-4">
                                Fully insured with Certificate of Insurance (COI) on file,
                                meeting all government and commercial insurance requirements.
                            </p>
                            <div className="text-sm text-gray-500">
                                General Liability: $2M<br />
                                Professional Liability: $1M<br />
                                Workers Compensation: State Compliant
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <Users className="h-12 w-12 text-black mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-black mb-2">Background Verified</h3>
                            <p className="text-gray-600 mb-4">
                                All team members undergo comprehensive background checks
                                and maintain required security clearances for government work.
                            </p>
                            <div className="text-sm text-gray-500">
                                • FBI Background Checks<br />
                                • Criminal History Verification<br />
                                • Reference Validation<br />
                                • Security Clearance Ready
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Preview */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">
                            Trusted by Leading Organizations
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We&apos;ve worked with Fortune 500 companies, government agencies,
                            and leading organizations across Texas and beyond.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    ★★★★★
                                </div>
                                <span className="ml-2 text-sm text-gray-600">5.0/5.0</span>
                            </div>
                            <blockquote className="text-gray-700 mb-4">
                                &ldquo;Ramblers Media delivered exceptional quality on our corporate training series.
                                Their attention to detail and professional approach made the entire process seamless.&rdquo;
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-semibold text-black">Sarah Johnson</div>
                                    <div className="text-sm text-gray-600">VP Communications, TechCorp Industries</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    ★★★★★
                                </div>
                                <span className="ml-2 text-sm text-gray-600">5.0/5.0</span>
                            </div>
                            <blockquote className="text-gray-700 mb-4">
                                &ldquo;Outstanding work on our government contract. They met all compliance requirements
                                and delivered high-quality content on schedule and within budget.&rdquo;
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-semibold text-black">Michael Chen</div>
                                    <div className="text-sm text-gray-600">Project Manager, Federal Agency</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    ★★★★★
                                </div>
                                <span className="ml-2 text-sm text-gray-600">5.0/5.0</span>
                            </div>
                            <blockquote className="text-gray-700 mb-4">
                                &ldquo;Professional, reliable, and creative. They brought our brand vision to life
                                with stunning visuals and compelling storytelling.&rdquo;
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                <div>
                                    <div className="font-semibold text-black">Emily Rodriguez</div>
                                    <div className="text-sm text-gray-600">Marketing Director, InnovateLabs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
