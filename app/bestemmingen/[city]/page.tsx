import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Plane, MapPin, Clock, Star, TrendingDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import EnhancedDealCard from "@/components/enhanced-deal-card"
import { FlightSchema } from "@/components/seo/flight-schema"

const cityData = {
  istanbul: {
    name: "Istanbul",
    country: "Turkije",
    description: "Ontdek de magische stad waar Europa en Azië elkaar ontmoeten",
    longDescription:
      "Istanbul, de bruisende metropool die twee continenten verbindt, biedt een unieke mix van geschiedenis, cultuur en moderne luxe. Van de adembenemende Hagia Sophia tot de kleurrijke Grand Bazaar - deze stad heeft voor elke reiziger iets bijzonders te bieden.",
    image: "/destinations/istanbul-hero.png",
    attractions: [
      "Hagia Sophia",
      "Blauwe Moskee",
      "Topkapi Paleis",
      "Grand Bazaar",
      "Galata Toren",
      "Bosphorus Cruise",
    ],
    bestTime: "April-Juni & September-November",
    currency: "Turkse Lira (TRY)",
    language: "Turks",
    timezone: "UTC+3",
    avgPrice: 89,
    originalPrice: 245,
    discount: 64,
    deals: [
      {
        id: 1,
        destination: "Istanbul",
        country: "Turkey",
        originalPrice: 245,
        currentPrice: 89,
        discount: 64,
        airline: "Turkish Airlines",
        seatsRemaining: 3,
        image: "/istanbul-hagia-sophia-bosphorus.png",
        airlineLogo: "/turkish-airlines-logo.png",
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
        category: "budget",
        duration: "short",
        flightClass: "economy",
        rating: 4.6,
        reviewCount: 1247,
        competitorPrice: 125,
        bookingsToday: 23,
        partner: "booking" as const,
      },
    ],
    tips: [
      "Boek je vlucht 6-8 weken van tevoren voor de beste prijzen",
      "Vlieg doordeweeks voor lagere tarieven",
      "Overweeg een tussenstop voor extra besparingen",
      "Check verschillende luchthavens in Istanbul (IST vs SAW)",
    ],
    keywords: [
      "goedkope vliegtickets Istanbul",
      "Istanbul vliegdeals",
      "budget vluchten Istanbul",
      "last minute Istanbul",
      "vliegtickets naar Istanbul",
      "Istanbul vakantie deals",
    ],
  },
  barcelona: {
    name: "Barcelona",
    country: "Spanje",
    description: "De bruisende Catalaanse hoofdstad vol kunst, architectuur en strand",
    longDescription:
      "Barcelona combineert op unieke wijze rijke geschiedenis met moderne creativiteit. Van Gaudí's architecturale meesterwerken tot de levendige Las Ramblas en prachtige stranden - deze stad betovert elke bezoeker met haar mediterrane charme en culturele rijkdom.",
    image: "/destinations/barcelona-hero.png",
    attractions: ["Sagrada Familia", "Park Güell", "Las Ramblas", "Casa Batlló", "Barceloneta Beach", "Picasso Museum"],
    bestTime: "Mei-Juni & September-Oktober",
    currency: "Euro (EUR)",
    language: "Spaans/Catalaans",
    timezone: "UTC+1",
    avgPrice: 67,
    originalPrice: 198,
    discount: 66,
    deals: [
      {
        id: 2,
        destination: "Barcelona",
        country: "Spain",
        originalPrice: 198,
        currentPrice: 67,
        discount: 66,
        airline: "Vueling",
        seatsRemaining: 7,
        image: "/barcelona-sagrada-familia-park-guell.png",
        airlineLogo: "/vueling-logo.png",
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
        category: "weekend",
        duration: "short",
        flightClass: "economy",
        rating: 4.3,
        reviewCount: 892,
        competitorPrice: 89,
        bookingsToday: 47,
        partner: "expedia" as const,
      },
    ],
    tips: [
      "Boek vroeg voor zomermaanden (juni-augustus)",
      "Overweeg Girona airport voor goedkopere opties",
      "Weekend deals zijn vaak beschikbaar",
      "Combineer met andere Spaanse steden voor betere prijzen",
    ],
    keywords: [
      "goedkope vliegtickets Barcelona",
      "Barcelona vliegdeals",
      "weekend Barcelona",
      "last minute Barcelona deals",
      "vliegtickets naar Barcelona",
      "Barcelona vakantie aanbiedingen",
    ],
  },
  london: {
    name: "London",
    country: "Verenigd Koninkrijk",
    description: "De historische hoofdstad vol koninklijke paleizen en moderne attracties",
    longDescription:
      "London, een wereldstad die traditie en moderniteit naadloos combineert. Van de koninklijke paleizen en historische monumenten tot de bruisende theaters van West End en wereldberoemde musea - London biedt oneindig veel te ontdekken.",
    image: "/destinations/london-hero.png",
    attractions: ["Big Ben", "Tower Bridge", "British Museum", "London Eye", "Buckingham Palace", "Westminster Abbey"],
    bestTime: "Mei-September",
    currency: "Britse Pond (GBP)",
    language: "Engels",
    timezone: "UTC+0",
    avgPrice: 45,
    originalPrice: 156,
    discount: 71,
    deals: [
      {
        id: 3,
        destination: "London",
        country: "United Kingdom",
        originalPrice: 156,
        currentPrice: 45,
        discount: 71,
        airline: "British Airways",
        seatsRemaining: 2,
        image: "/london-big-ben-tower-bridge.png",
        airlineLogo: "/british-airways-logo.png",
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
        category: "budget",
        duration: "short",
        flightClass: "economy",
        rating: 4.8,
        reviewCount: 2156,
        competitorPrice: 78,
        bookingsToday: 34,
        partner: "kayak" as const,
      },
    ],
    tips: [
      "Boek ver van tevoren voor de beste deals",
      "Overweeg Gatwick of Stansted voor goedkopere opties",
      "Vlieg doordeweeks voor lagere prijzen",
      "Check budget airlines zoals EasyJet en Ryanair",
    ],
    keywords: [
      "goedkope vliegtickets London",
      "London vliegdeals",
      "budget vluchten London",
      "last minute London",
      "vliegtickets naar London",
      "London city trip deals",
    ],
  },
}

interface CityPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = cityData[params.city as keyof typeof cityData]

  if (!city) {
    return {
      title: "Bestemming niet gevonden | SpotMijnVlucht.nl",
    }
  }

  return {
    title: `Goedkope Vliegtickets naar ${city.name} vanaf €${city.avgPrice} | SpotMijnVlucht.nl`,
    description: `✈️ Vliegtickets naar ${city.name} vanaf €${city.avgPrice}! ${city.discount}% korting. ${city.description}. Vergelijk prijzen en boek direct.`,
    keywords: city.keywords.join(", "),
    openGraph: {
      title: `Goedkope Vliegtickets naar ${city.name} vanaf €${city.avgPrice}`,
      description: `${city.discount}% korting op vliegtickets naar ${city.name}. ${city.description}`,
      images: [
        {
          url: city.image,
          width: 1200,
          height: 630,
          alt: `Vliegtickets naar ${city.name}`,
        },
      ],
    },
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = cityData[params.city as keyof typeof cityData]

  if (!city) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {city.deals.map((deal) => (
        <FlightSchema
          key={deal.id}
          departure="Amsterdam"
          arrival={city.name}
          departureDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
          price={deal.currentPrice}
          currency="EUR"
          airline={deal.airline}
        />
      ))}

      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600 font-medium">{city.country}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Goedkope Vliegtickets naar {city.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{city.longDescription}</p>

              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">€{city.avgPrice}</div>
                  <div className="text-sm text-gray-500">vanaf</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{city.discount}%</div>
                  <div className="text-sm text-gray-500">korting</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2u</div>
                  <div className="text-sm text-gray-500">vliegen</div>
                </div>
              </div>

              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plane className="mr-2 h-5 w-5" />
                Bekijk Alle Deals naar {city.name}
              </Button>
            </div>

            <div className="relative">
              <Image
                src={city.image || "/placeholder.svg"}
                alt={`${city.name} skyline`}
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-bold">4.8/5</span>
                  <span className="text-gray-500 text-sm">reiziger rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Deals */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Actuele Vliegdeals naar {city.name}</h2>
            <p className="text-gray-600 text-lg">Beperkte tijd aanbiedingen - boek nu voordat ze uitverkocht zijn!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.deals.map((deal) => (
              <EnhancedDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* City Information */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Attractions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Attracties in {city.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                {city.attractions.map((attraction, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">{attraction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Reisinformatie</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Beste reistijd</div>
                    <div className="text-gray-600">{city.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Tijdzone</div>
                    <div className="text-gray-600">{city.timezone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <TrendingDown className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Valuta</div>
                    <div className="text-gray-600">{city.currency}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tips voor Goedkope Vliegtickets naar {city.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {city.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Klaar voor je reis naar {city.name}?</h3>
          <p className="text-xl mb-8 opacity-90">
            Vind de beste vliegdeals en bespaar tot {city.discount}% op je volgende reis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Bekijk Alle Deals
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Lees Reisgids
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(cityData).map((city) => ({
    city: city,
  }))
}
