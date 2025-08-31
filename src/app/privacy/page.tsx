import Layout from '@/components/layout/Layout'

export default function PrivacyPage() {
    return (
        <Layout>
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-black mb-8">Privacy Policy</h1>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                We collect only the information you provide via the contact form. We use this information to respond to your inquiry and for project coordination. We do not sell your data. If you wish to access or delete your information, contact us at privacy@ramblersmedia.com.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-black mb-4">Analytics</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Optional privacy‑respecting analytics may be used to improve the site (no cookies by default). Media you send may be stored for the duration of a project and archived per contract terms.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold text-black mb-4">Contact Information</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        If you have any questions about this Privacy Policy, please contact us:
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700">
                                            <strong>Email:</strong> <a href="mailto:privacy@ramblersmedia.com" className="text-black hover:underline">privacy@ramblersmedia.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-sm text-gray-500">
                                        Last Updated: August 20, 2025
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
