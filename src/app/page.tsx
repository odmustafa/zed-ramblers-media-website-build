import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Camera, Shield } from 'lucide-react'
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
              Professional Video Production
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              We are a full-service video production company specializing in video advertising, music videos, and film production. From concept to final cut, we bring your vision to life.
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
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compelling storytelling and high-quality production across all formats.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Reliability First</h3>
              <p className="text-muted-foreground">On time, every time. Professional crews that respect your schedule and deliver on promises.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Compliant</h3>
              <p className="text-muted-foreground">Government-ready with COI, background checks, and secure data handling protocols.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
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
              From concept to final cut, we bring your vision to life with compelling storytelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video Advertising */}
            <div className="bg-card p-8 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Video Advertising</h3>
              <p className="text-muted-foreground mb-4">
                Compelling video advertising content that drives engagement and delivers results for your brand.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Brand-focused storytelling</li>
                <li>• Multi-platform optimization</li>
                <li>• Performance-driven content</li>
              </ul>
            </div>

            {/* Music Videos */}
            <div className="bg-white dark:bg-card p-8 rounded-lg shadow-sm border border-gray-200 dark:border-border">
              <h3 className="text-xl font-semibold text-black dark:text-card-foreground mb-4">Music Videos</h3>
              <p className="text-gray-600 dark:text-muted-foreground mb-4">
                Creative music video production with high-quality cinematography and compelling visual storytelling.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-muted-foreground">
                <li>• Creative concept development</li>
                <li>• Professional cinematography</li>
                <li>• Artist-focused direction</li>
              </ul>
            </div>

            {/* Film Production */}
            <div className="bg-white dark:bg-card p-8 rounded-lg shadow-sm border border-gray-200 dark:border-border">
              <h3 className="text-xl font-semibold text-black dark:text-card-foreground mb-4">Film Production</h3>
              <p className="text-gray-600 dark:text-muted-foreground mb-4">
                Full-service film production from concept to final cut with compelling storytelling and high-quality production.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-muted-foreground">
                <li>• Complete production services</li>
                <li>• Professional post-production</li>
                <li>• Story-driven content</li>
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
              <h3 className="text-xl font-semibold text-foreground mb-4">Why Agencies Choose Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Reliability first: on time, every time.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Accuracy: we respect technical subject matter and review with SMEs.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Agility: lean crew that scales up as needed.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Deliverables: captioned, versioned, and QC&apos;d files.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 dark:bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Tell us about your project timeline, location, and deliverables. We&apos;ll respond within one business day.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Your Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}