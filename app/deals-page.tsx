"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"
import Header from "@/components/header"
import EnhancedDealCard from "@/components/enhanced-deal-card"
import TestimonialsSection from "@/components/testimonials-section"
import USPSection from "@/components/usp-section"
import PartnerTrustSection from "@/components/partner-trust-section"
import NewsletterSection from "@/components/newsletter-section"
import SearchFilterSection from "@/components/search-filter-section"
import PriceTrackingSection from "@/components/price-tracking-section"
import DealCategoriesSection from "@/components/deal-categories-section"
import DealOfTheDaySection from "@/components/deal-of-the-day-section"
import SocialProofBanner from "@/components/social-proof-banner"
import {
  HeaderBannerAd,
  SidebarAd,
  InContentAd,
  BetweenDealsAd,
  MobileBannerAd,
  FooterAd,
} from "@/components/adsense-components"
import { FlightSchema } from "@/components/seo/flight-schema"

const flightDeals = [
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
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    category: "budget",
    duration: "short",
    flightClass: "economy",
    rating: 4.6,
    reviewCount: 1247,
    competitorPrice: 125,
    bookingsToday: 23,
    partner: "booking" as const,
  },
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
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    category: "weekend",
    duration: "short",
    flightClass: "economy",
    rating: 4.3,
    reviewCount: 892,
    competitorPrice: 89,
    bookingsToday: 47,
    partner: "expedia" as const,
  },
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
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    category: "budget",
    duration: "short",
    flightClass: "economy",
    rating: 4.8,
    reviewCount: 2156,
    competitorPrice: 78,
    bookingsToday: 34,
    partner: "kayak" as const,
  },
  {
    id: 4,
    destination: "Rome",
    country: "Italy",
    originalPrice: 189,
    currentPrice: 78,
    discount: 59,
    airline: "ITA Airways",
    seatsRemaining: 5,
    image: "/rome-colosseum-vatican.png",
    airlineLogo: "/ita-airways-logo.png",
    expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000), // 15 hours from now
    category: "weekend",
    duration: "short",
    flightClass: "economy",
    rating: 4.4,
    reviewCount: 673,
    competitorPrice: 95,
    bookingsToday: 18,
    partner: "booking" as const,
  },
  {
    id: 5,
    destination: "Prague",
    country: "Czech Republic",
    originalPrice: 167,
    currentPrice: 52,
    discount: 69,
    airline: "Czech Airlines",
    seatsRemaining: 4,
    image: "/prague-castle-charles-bridge.png",
    airlineLogo: "/czech-airlines-logo.png",
    expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10 hours from now
    category: "budget",
    duration: "short",
    flightClass: "economy",
    rating: 4.2,
    reviewCount: 445,
    competitorPrice: 72,
    bookingsToday: 29,
    partner: "expedia" as const,
  },
  {
    id: 6,
    destination: "Amsterdam",
    country: "Netherlands",
    originalPrice: 134,
    currentPrice: 61,
    discount: 54,
    airline: "KLM",
    seatsRemaining: 6,
    image: "/amsterdam-canals-tulips.png",
    airlineLogo: "/klm-logo.png",
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    category: "weekend",
    duration: "short",
    flightClass: "economy",
    rating: 4.7,
    reviewCount: 1834,
    competitorPrice: 85,
    bookingsToday: 41,
    partner: "kayak" as const,
  },
  {
    id: 7,
    destination: "New York",
    country: "United States",
    originalPrice: 650,
    currentPrice: 389,
    discount: 40,
    airline: "Delta Airlines",
    seatsRemaining: 8,
    image: "/new-york-city-skyline.png",
    airlineLogo: "/delta-airlines-logo.png",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    category: "longhaul",
    duration: "long",
    flightClass: "economy",
    rating: 4.5,
    reviewCount: 3421,
    competitorPrice: 445,
    bookingsToday: 12,
    partner: "booking" as const,
  },
  {
    id: 8,
    destination: "Tokyo",
    country: "Japan",
    originalPrice: 850,
    currentPrice: 599,
    discount: 30,
    airline: "Japan Airlines",
    seatsRemaining: 3,
    image: "/tokyo-fuji-skyline.png",
    airlineLogo: "/japan-airlines-logo.png",
    expiresAt: new Date(Date.now() + 36 * 60 * 60 * 1000),
    category: "longhaul",
    duration: "long",
    flightClass: "economy",
    rating: 4.9,
    reviewCount: 2876,
    competitorPrice: 699,
    bookingsToday: 8,
    partner: "expedia" as const,
  },
  {
    id: 9,
    destination: "Paris",
    country: "France",
    originalPrice: 450,
    currentPrice: 299,
    discount: 34,
    airline: "Air France",
    seatsRemaining: 2,
    image: "/paris-eiffel-tower.png",
    airlineLogo: "/air-france-logo.png",
    expiresAt: new Date(Date.now() + 14 * 60 * 60 * 1000),
    category: "luxury",
    duration: "short",
    flightClass: "business",
    rating: 4.8,
    reviewCount: 1567,
    competitorPrice: 359,
    bookingsToday: 15,
    partner: "kayak" as const,
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  const dealOfTheDay = useMemo(() => {
    return flightDeals.reduce((prev, current) => (prev.discount > current.discount ? prev : current))
  }, [])

  const filteredDeals = useMemo(() => {
    return flightDeals.filter((deal) => {
      const matchesSearch =
        searchTerm === "" ||
        deal.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.country.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPrice = deal.currentPrice >= priceRange.min && deal.currentPrice <= priceRange.max

      const matchesAirline = selectedAirlines.length === 0 || selectedAirlines.includes(deal.airline)

      const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(deal.destination)

      const matchesCategory = activeCategory === "all" || deal.category === activeCategory

      return matchesSearch && matchesPrice && matchesAirline && matchesDestination && matchesCategory
    })
  }, [searchTerm, priceRange, selectedAirlines, selectedDestinations, activeCategory])

  const availableAirlines = [...new Set(flightDeals.map((deal) => deal.airline))]
  const availableDestinations = [...new Set(flightDeals.map((deal) => deal.destination))]

  const handleSearch = (term: string) => setSearchTerm(term)
  const handlePriceFilter = (min: number, max: number) => setPriceRange({ min, max })
  const handleAirlineFilter = (airlines: string[]) => setSelectedAirlines(airlines)
  const handleDestinationFilter = (destinations: string[]) => setSelectedDestinations(destinations)
  const handleClearFilters = () => {
    setSearchTerm("")
    setPriceRange({ min: 0, max: 1000 })
    setSelectedAirlines([])
    setSelectedDestinations([])
    setActiveCategory("all")
  }

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
  }

  const getCategoryCount = (category: string) => {
    if (category === "all") return flightDeals.length
    return flightDeals.filter((deal) => deal.category === category).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {flightDeals.slice(0, 3).map((deal) => (
        <FlightSchema
          key={deal.id}
          departure="Amsterdam"
          arrival={deal.destination}
          departureDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
          price={deal.currentPrice}
          currency="EUR"
          airline={deal.airline}
        />
      ))}

      <Header />

      <HeaderBannerAd />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Plane className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Ontdek de Wereld voor Minder</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Vind de beste vliegdeals naar je favoriete bestemmingen. Bespaar tot 70% op je volgende reis.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Bekijk Alle Deals
          </Button>
        </div>
      </section>

      <MobileBannerAd />

      <DealOfTheDaySection deal={dealOfTheDay} />

      <InContentAd />

      <DealCategoriesSection onCategorySelect={handleCategorySelect} activeCategory={activeCategory} />

      {/* Deals Section with Sidebar */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeCategory === "all"
                    ? "Populaire Vliegdeals"
                    : activeCategory === "weekend"
                      ? "Weekend Getaways"
                      : activeCategory === "budget"
                        ? "Budget Vluchten"
                        : activeCategory === "longhaul"
                          ? "Long Haul Bestemmingen"
                          : activeCategory === "luxury"
                            ? "Luxury Vluchten"
                            : "Vliegdeals"}
                </h2>
                <p className="text-gray-600 text-lg">
                  Beperkte tijd aanbiedingen - boek nu voordat ze uitverkocht zijn!
                </p>
              </div>

              <SearchFilterSection
                onSearch={handleSearch}
                onPriceFilter={handlePriceFilter}
                onAirlineFilter={handleAirlineFilter}
                onDestinationFilter={handleDestinationFilter}
                availableAirlines={availableAirlines}
                availableDestinations={availableDestinations}
                onClearFilters={handleClearFilters}
              />

              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredDeals.length} van {getCategoryCount(activeCategory)} deals gevonden
                  {activeCategory !== "all" && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {activeCategory === "weekend"
                        ? "Weekend"
                        : activeCategory === "budget"
                          ? "Budget"
                          : activeCategory === "longhaul"
                            ? "Long Haul"
                            : activeCategory === "luxury"
                              ? "Luxury"
                              : activeCategory}
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal, index) => (
                  <>
                    <EnhancedDealCard key={deal.id} deal={deal} />
                    {(index + 1) % 6 === 0 && index < filteredDeals.length - 1 && (
                      <BetweenDealsAd key={`ad-${index}`} />
                    )}
                  </>
                ))}
              </div>

              {filteredDeals.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">Geen deals gevonden met de huidige filters.</p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Alle filters wissen
                  </Button>
                </div>
              )}
            </div>

            <div className="w-80">
              <SidebarAd />
            </div>
          </div>
        </div>
      </section>

      {/* Price Tracking Section */}
      <PriceTrackingSection />

      <InContentAd className="bg-gray-50" />

      {/* USP Section */}
      <USPSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      <InContentAd />

      {/* Partner Trust Section */}
      <PartnerTrustSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Social Proof Banner */}
      <SocialProofBanner />

      <FooterAd />
    </div>
  )
}
