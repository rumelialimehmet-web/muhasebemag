import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { HotjarScript } from "@/components/analytics/hotjar-script"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: {
    default: "SpotMijnVlucht.nl - Goedkope Vliegtickets & Beste Vliegdeals",
    template: "%s | SpotMijnVlucht.nl",
  },
  description:
    "✈️ Vind de goedkoopste vliegtickets naar 200+ bestemmingen. Dagelijks bijgewerkte vliegdeals met tot 70% korting. Vergelijk prijzen van alle airlines en boek direct.",
  generator: "Next.js",
  keywords: [
    "goedkope vliegtickets",
    "vliegdeals",
    "vliegtickets vergelijken",
    "last minute vluchten",
    "vakantie deals",
    "budget vliegtickets",
    "vliegtuigtickets",
    "reizen goedkoop",
    "vluchten boeken",
    "airline tickets",
  ].join(", "),
  authors: [{ name: "SpotMijnVlucht.nl" }],
  creator: "SpotMijnVlucht.nl",
  publisher: "SpotMijnVlucht.nl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://spotmijnvlucht.nl",
    siteName: "SpotMijnVlucht.nl",
    title: "SpotMijnVlucht.nl - Goedkope Vliegtickets & Beste Vliegdeals",
    description: "✈️ Vind de goedkoopste vliegtickets naar 200+ bestemmingen. Tot 70% korting op vliegdeals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpotMijnVlucht.nl - Goedkope Vliegtickets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@spotmijnvlucht",
    creator: "@spotmijnvlucht",
    title: "SpotMijnVlucht.nl - Goedkope Vliegtickets & Beste Vliegdeals",
    description: "✈️ Vind de goedkoopste vliegtickets naar 200+ bestemmingen. Tot 70% korting op vliegdeals.",
    images: ["/twitter-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://spotmijnvlucht.nl",
    languages: {
      "nl-NL": "https://spotmijnvlucht.nl",
      "en-US": "https://spotmijnvlucht.nl/en",
    },
  },
  category: "travel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="antialiased">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "SpotMijnVlucht.nl",
              description: "Vind de goedkoopste vliegtickets naar 200+ bestemmingen wereldwijd",
              url: "https://spotmijnvlucht.nl",
              logo: "https://spotmijnvlucht.nl/logo.png",
              sameAs: [
                "https://facebook.com/spotmijnvlucht",
                "https://twitter.com/spotmijnvlucht",
                "https://instagram.com/spotmijnvlucht",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+31-20-123-4567",
                contactType: "customer service",
                availableLanguage: ["Dutch", "English"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "NL",
                addressLocality: "Amsterdam",
              },
            }),
          }}
        />
        <GoogleAnalytics />
        <HotjarScript />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans">
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
