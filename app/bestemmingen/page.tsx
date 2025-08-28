import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Plane, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Alle Bestemmingen | Goedkope Vliegtickets | SpotMijnVlucht.nl",
  description:
    "Ontdek alle bestemmingen met goedkope vliegtickets. Van Istanbul €89 tot Barcelona €67. Vergelijk prijzen naar 200+ bestemmingen wereldwijd.",
  keywords: "bestemmingen, vliegtickets, goedkope vluchten, reizen, vakantie bestemmingen, vliegdeals",
}

const destinations = [
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Turkije",
    price: 89,
    originalPrice: 245,
    discount: 64,
    image: "/destinations/istanbul-card.png",
    description: "Waar Europa en Azië elkaar ontmoeten",
    popular: true,
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Spanje",
    price: 67,
    originalPrice: 198,
    discount: 66,
    image: "/destinations/barcelona-card.png",
    description: "Gaudí, strand en Catalaanse cultuur",
    popular: true,
  },
  {
    slug: "london",
    name: "London",
    country: "Verenigd Koninkrijk",
    price: 45,
    originalPrice: 156,
    discount: 71,
    image: "/destinations/london-card.png",
    description: "Koninklijke paleizen en moderne attracties",
    popular: true,
  },
  {
    slug: "rome",
    name: "Rome",
    country: "Italië",
    price: 78,
    originalPrice: 189,
    discount: 59,
    image: "/destinations/rome-card.png",
    description: "De eeuwige stad vol geschiedenis",
    popular: false,
  },
  {
    slug: "prague",
    name: "Praag",
    country: "Tsjechië",
    price: 52,
    originalPrice: 167,
    discount: 69,
    image: "/destinations/prague-card.png",
    description: "Sprookjesachtige architectuur en bier",
    popular: false,
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    country: "Nederland",
    price: 61,
    originalPrice: 134,
    discount: 54,
    image: "/destinations/amsterdam-card.png",
    description: "Grachten, musea en gezelligheid",
    popular: false,
  },
]

export default function DestinationsPage() {
  const popularDestinations = destinations.filter((dest) => dest.popular)
  const otherDestinations = destinations.filter((dest) => !dest.popular)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Alle Bestemmingen</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ontdek goedkope vliegtickets naar meer dan 200 bestemmingen wereldwijd. Vergelijk prijzen en vind de beste
            deals voor je volgende reis.
          </p>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Populaire Bestemmingen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination) => (
              <Link key={destination.slug} href={`/bestemmingen/${destination.slug}`}>
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{destination.discount}%
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500 text-sm">{destination.country}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                    <p className="text-gray-600 mb-4">{destination.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">€{destination.price}</span>
                        <span className="text-gray-500 line-through text-sm">€{destination.originalPrice}</span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plane className="mr-1 h-4 w-4" />
                        Bekijk Deals
                      </Button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Meer Bestemmingen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherDestinations.map((destination) => (
              <Link key={destination.slug} href={`/bestemmingen/${destination.slug}`}>
                <article className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="relative w-20 h-16 flex-shrink-0">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="font-bold text-gray-900">{destination.name}</h3>
                      <span className="text-gray-500 text-sm">• {destination.country}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">€{destination.price}</span>
                        <span className="text-gray-500 line-through text-xs">€{destination.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <TrendingDown className="h-3 w-3" />-{destination.discount}%
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Niet gevonden wat je zocht?</h3>
          <p className="text-xl mb-8 opacity-90">
            Bekijk alle actuele vliegdeals of stel een prijsalert in voor je favoriete bestemming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Alle Deals Bekijken
              </Button>
            </Link>
            <Link href="/#price-tracking">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Prijsalert Instellen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
