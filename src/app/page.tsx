import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Users, Camera, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/layout/Layout'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
              Contractor‑Grade Video Production
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Procurement‑ready vendor for agencies and primes. Punctual crews, vetted and insured. ARRI Alexa, Kino Flo. Secure, compliant deliverables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3">
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Agencies & Primes */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Agencies & Primes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lean crews. On‑time calls. Secure deliverables. Scroll for work samples.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Reliability First</h3>
              <p className="text-muted-foreground">On time, every time. Professional crews that respect your schedule and deliver on promises.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Compliant</h3>
              <p className="text-muted-foreground">Government-ready with COI, background checks, and secure data handling protocols.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Professional Equipment</h3>
              <p className="text-muted-foreground">ARRI Alexa, Kino Flo lighting, and complete production packages ready for any project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Concepting → Pre‑Production → Production → Post. Agile from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Corporate Communications */}
            <div className="bg-card p-8 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Corporate Communications</h3>
              <p className="text-muted-foreground mb-4">
                Executive interviews, internal comms, training, recruitment, and public information spots.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Clear, compliant storytelling</li>
                <li>• Aligned to your style guides</li>
                <li>• Security protocols respected</li>
              </ul>
            </div>

            {/* Event Coverage */}
            <div className="bg-white dark:bg-card p-8 rounded-lg shadow-sm border border-gray-200 dark:border-border">
              <h3 className="text-xl font-semibold text-black dark:text-card-foreground mb-4">Event Coverage</h3>
              <p className="text-gray-600 dark:text-muted-foreground mb-4">
                Vérité to panel coverage, planned or live. Multi‑cam setups with clean, reliable audio.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-muted-foreground">
                <li>• Professional live streaming</li>
                <li>• Multi-camera coverage</li>
                <li>• Real-time editing support</li>
              </ul>
            </div>

            {/* Training Videos */}
            <div className="bg-white dark:bg-card p-8 rounded-lg shadow-sm border border-gray-200 dark:border-border">
              <h3 className="text-xl font-semibold text-black dark:text-card-foreground mb-4">Training Videos</h3>
              <p className="text-gray-600 dark:text-muted-foreground mb-4">
                Demo videos & process explainers. Technically accurate visuals that highlight benefits.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-muted-foreground">
                <li>• Reduce friction through clarity</li>
                <li>• Optimized for web & mobile</li>
                <li>• SME-approved content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Government Capabilities */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
                Government Capabilities
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>• Punctual, background‑checked crew; strict call‑time discipline.</p>
                <p>• SAM / UEI / CAGE registered contractor.</p>
                <p>• Insurance COI on file; additional insured certificates available.</p>
                <p>• Secure data handling: encrypted drives, signed NDAs, chain‑of‑custody.</p>
                <p>• On‑base and facility‑friendly kit; compact footprint when required.</p>
                <p>• Multilingual set capability (English / Spanish).</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Why Agencies Choose Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Reliability first: on time, every time.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Accuracy: we respect technical subject matter and review with SMEs.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Agility: lean crew that scales up as needed.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Deliverables: captioned, versioned, and QC&apos;d files.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black dark:bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Tell us about your project timeline, location, and deliverables. We&apos;ll respond within one business day.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-3">
              Get Your Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}