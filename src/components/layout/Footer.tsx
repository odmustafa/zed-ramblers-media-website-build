import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, ExternalLink } from 'lucide-react'

const footerNavigation = {
  services: [
    { name: 'Corporate Communications', href: '/services/corporate' },
    // { name: 'Government Contracts', href: '/services/government' },
    { name: 'Event Coverage', href: '/services/events' },
    { name: 'Equipment Rental', href: '/equipment' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com/ramblersmedia', icon: Instagram },
    { name: 'Vimeo', href: 'https://vimeo.com/ramblersmedia', icon: ExternalLink },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/ramblers-media-logo.svg"
                alt="Ramblers Media"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert dark:brightness-100 dark:invert"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {/* Dallas-based video production company specializing in corporate communications and government contracts. */}
              Dallas-based video production company specializing in events and corporate communications.
            </p>
            <div className="flex space-x-4">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (765) 760-0699</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="space-y-1">
                  <a
                    href="mailto:hello@ramblersmedia.com"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    hello@ramblersmedia.com
                  </a>
                  <br />
                  <a
                    href="mailto:kiara@ramblersmedia.com"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    kiara@ramblersmedia.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Based in Los Angeles, CA<br />
                  Available nationwide
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ramblers Media. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm text-center md:text-right">
              Government contractor • SAM/UEI registered • Fully insured
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
