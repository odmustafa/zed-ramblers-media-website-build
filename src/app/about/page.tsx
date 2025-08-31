import { CheckCircle, Users, MapPin, Clock, Shield, Award } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import { SEOTrustSignals } from '@/components/SEOTrustSignals'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Ramblers Media - Professional Video Production Team | Dallas, TX',
  description: 'Learn about Ramblers Media, a Dallas-based video production company with 15+ years experience. Government contractor ready with bilingual capabilities and proven track record.',
  keywords: 'about Ramblers Media, video production team, Dallas video company, government contractor, bilingual video production, professional filming crew',
  openGraph: {
    title: 'About Ramblers Media - Professional Video Production Team | Dallas, TX',
    description: 'Learn about Ramblers Media, a Dallas-based video production company with 15+ years experience. Government contractor ready with bilingual capabilities and proven track record.',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00.000Z',
    authors: ['Ramblers Media Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Ramblers Media - Professional Video Production Team | Dallas, TX',
    description: 'Learn about Ramblers Media, a Dallas-based video production company with 15+ years experience.',
  },
}

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            About Ramblers Media
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a Dallas‑based team led by a veteran director‑DP—multidisciplinary, hands‑on, and comfortable wearing many hats.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Approach</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Lean, punctual crews, a strong safety culture, and a proven track record across multiple U.S. states and abroad.
                </p>
                <p>
                  Agency producer background with calm, solutions‑first sets. Pre‑pro to delivery: efficient, organized, and transparent.
                </p>
                <p>
                  COI on file; secure data handling. Punctual, reliable, fully equipped.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-black mb-6">Key Strengths</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-black">Agency Producer Background</h4>
                    <p className="text-gray-600">Calm, solutions‑first sets with professional experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-black">Complete Production Pipeline</h4>
                    <p className="text-gray-600">Efficient, organized workflow from pre-production to delivery.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-black">Security & Compliance</h4>
                    <p className="text-gray-600">COI on file with secure data handling protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Multi‑state</h3>
              <p className="text-gray-600">We travel light and scale on demand across the United States.</p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Bilingual</h3>
              <p className="text-gray-600">English / Spanish communication for clear client and talent coordination.</p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Mission‑critical</h3>
              <p className="text-gray-600">Time‑sensitive shoots with approvals and security needs.</p>
            </div>
          </div>

          {/* Government Ready Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-black mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-black mb-4">Government Contractor Ready</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fully equipped and compliant for government contracts and agency work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-black mb-4">Compliance & Security</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>SAM / UEI / CAGE registered contractor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>Insurance COI on file</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>Background-checked crew</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>Secure data handling protocols</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black mb-4">Operational Excellence</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>Strict call-time discipline</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>On-base and facility-friendly equipment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>Multilingual capability (English/Spanish)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span>Compact equipment footprint</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black mb-8">Why Agencies & Primes Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-semibold text-black mb-2">Reliability</h4>
                <p className="text-gray-600 text-sm">On time, every time with professional crews.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-semibold text-black mb-2">Accuracy</h4>
                <p className="text-gray-600 text-sm">Respect for technical subject matter with SME reviews.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-semibold text-black mb-2">Agility</h4>
                <p className="text-gray-600 text-sm">Lean crew that scales up as needed.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-semibold text-black mb-2">Quality</h4>
                <p className="text-gray-600 text-sm">Captioned, versioned, and QC'd deliverables.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SEOTrustSignals />
    </Layout>
  )
}
