"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plane, RefreshCw } from "lucide-react"
import Header from "@/components/header"
import EnhancedDealCard from "@/components/enhanced-deal-card"
import SkeletonDealCard from "@/components/skeleton-deal-card"
import ErrorState from "@/components/error-state"
import EmptyState from "@/components/empty-state"
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
import { useDeals } from "@/hooks/use-deals"

export default function HomePage() {
  const { deals: flightDeals, isLoading, error, isRetrying, refetch } = useDeals()

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [visibleDeals, setVisibleDeals] = useState(6)

  const dealOfTheDay = useMemo(() => {
    if (flightDeals.length === 0) return null
    return flightDeals.reduce((prev, current) => (prev.discount > current.discount ? prev : current))
  }, [flightDeals])

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
  }, [flightDeals, searchTerm, priceRange, selectedAirlines, selectedDestinations, activeCategory])

  const displayedDeals = filteredDeals.slice(0, visibleDeals)
  const hasMoreDeals = filteredDeals.length > visibleDeals

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
    setVisibleDeals(6)
  }

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
    setVisibleDeals(6)
  }

  const handleLoadMore = () => {
    setVisibleDeals((prev) => prev + 6)
  }

  const getCategoryCount = (category: string) => {
    if (category === "all") return flightDeals.length
    return flightDeals.filter((deal) => deal.category === category).length
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    priceRange.min !== 0 ||
    priceRange.max !== 1000 ||
    selectedAirlines.length > 0 ||
    selectedDestinations.length > 0 ||
    activeCategory !== "all"

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

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Plane className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Ontdek de Wereld voor Minder</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Vind de beste vliegdeals naar je favoriete bestemmingen. Bespaar tot 70% op je volgende reis.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Bekijk Alle Deals
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={refetch}
              disabled={isRetrying}
              className="px-6 py-3 bg-transparent"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Vernieuwen...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Vernieuw Deals
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <MobileBannerAd />

      {dealOfTheDay && !isLoading && <DealOfTheDaySection deal={dealOfTheDay} />}

      <InContentAd />

      <DealCategoriesSection onCategorySelect={handleCategorySelect} activeCategory={activeCategory} />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
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

              {!isLoading && (
                <SearchFilterSection
                  onSearch={handleSearch}
                  onPriceFilter={handlePriceFilter}
                  onAirlineFilter={handleAirlineFilter}
                  onDestinationFilter={handleDestinationFilter}
                  availableAirlines={availableAirlines}
                  availableDestinations={availableDestinations}
                  onClearFilters={handleClearFilters}
                />
              )}

              {isLoading && (
                <>
                  <div className="mb-6">
                    <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonDealCard key={index} />
                    ))}
                  </div>
                </>
              )}

              {error && !isLoading && <ErrorState onRetry={refetch} isRetrying={isRetrying} error={error} />}

              {!isLoading && !error && (
                <>
                  {filteredDeals.length > 0 ? (
                    <>
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
                        {displayedDeals.map((deal, index) => (
                          <>
                            <EnhancedDealCard key={deal.id} deal={deal} />
                            {(index + 1) % 6 === 0 && index < displayedDeals.length - 1 && (
                              <BetweenDealsAd key={`ad-${index}`} />
                            )}
                          </>
                        ))}
                      </div>

                      {hasMoreDeals && (
                        <div className="text-center mt-8">
                          <Button
                            onClick={handleLoadMore}
                            size="lg"
                            variant="outline"
                            className="px-8 py-3 text-lg border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
                          >
                            Meer deals laden ({filteredDeals.length - visibleDeals} resterend)
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <EmptyState onClearFilters={handleClearFilters} hasFilters={hasActiveFilters} />
                  )}
                </>
              )}
            </div>

            <div className="w-80">
              <SidebarAd />
            </div>
          </div>
        </div>
      </section>

      <PriceTrackingSection />

      <InContentAd className="bg-gray-50" />

      <USPSection />

      <TestimonialsSection />

      <InContentAd />

      <PartnerTrustSection />

      <NewsletterSection />

      <SocialProofBanner />

      <FooterAd />
    </div>
  )
}
