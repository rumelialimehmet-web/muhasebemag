import Link from 'next/link'
import { Mail, MapPin, Phone, Plane, ShieldCheck } from 'lucide-react'

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/deals-page', label: 'Deals' },
  { href: '/bestemmingen', label: 'Bestemmingen' },
  { href: '/blog', label: 'Reistips' },
  { href: '/premium', label: 'Premium' },
]

const serviceLinks = [
  { href: '/dashboard', label: 'Admin & Dashboard' },
  { href: '/dashboard/email', label: 'Email Automations' },
  { href: '/maintenance', label: 'Statuspagina' },
  { href: '/privacybeleid', label: 'Privacybeleid' },
  { href: '/voorwaarden', label: 'Algemene voorwaarden' },
]

const contactDetails = [
  {
    icon: MapPin,
    label: 'Adres',
    value: 'Aviationstraat 12, 1017XZ Amsterdam',
  },
  {
    icon: Phone,
    label: 'Telefoon',
    value: '+31 (0)20 123 4567',
    href: 'tel:+31201234567',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'support@spotmijnvlucht.nl',
    href: 'mailto:support@spotmijnvlucht.nl',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800" aria-labelledby="site-footer-heading">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 id="site-footer-heading" className="sr-only">
          SpotMijnVlucht footer
        </h2>
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Plane className="h-7 w-7" aria-hidden="true" />
              <span className="text-2xl font-semibold tracking-tight">SpotMijnVlucht.nl</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Vergelijk duizenden vliegdeals, ontdek verborgen parels en beheer eenvoudig je boekingen via ons
              gebruiksvriendelijke dashboard. Wij verbinden reizigers met betrouwbare partners wereldwijd.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-3 py-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>100% Veilig boeken</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Realtime beschikbaarheid</span>
              </div>
            </div>
          </div>

          <nav aria-label="Hoofdmenu" className="grid grid-cols-2 gap-8 sm:gap-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Navigatie</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {navigationLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Services &amp; beleid</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {serviceLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Neem contact op</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-gray-800 p-2 text-blue-400">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
                      {href ? (
                        <Link
                          href={href}
                          className="mt-1 block text-sm text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          {value}
                        </Link>
                      ) : (
                        <p className="mt-1 text-sm text-gray-300">{value}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 sm:flex sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} SpotMijnVlucht.nl. Alle rechten voorbehouden.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <Link
              href="/cookies"
              className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded"
            >
              Cookievoorkeuren
            </Link>
            <Link
              href="/veiligheid"
              className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded"
            >
              Veiligheid &amp; compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
