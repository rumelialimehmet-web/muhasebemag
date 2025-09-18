'use client'

import { useEffect, useMemo, useState } from 'react'

import DealOfTheDaySection from '@/components/deal-of-the-day-section'
import EnhancedDealCard from '@/components/enhanced-deal-card'
import Footer from '@/components/footer'
import Header from '@/components/header'
import NewsletterSection from '@/components/newsletter-section'
import PartnerBrandingFooter from '@/components/partner-branding-footer'
import SearchFilterSection from '@/components/search-filter-section'
import TestimonialsSection from '@/components/testimonials-section'
import { AFFILIATE_PARTNERS } from '@/lib/affiliate-tracking'
import { DEFAULT_SEATS_REMAINING, resolveSeatsRemaining, type SeatAwareDeal } from '@/lib/deals'

const FALLBACK_AIRLINE_LOGO = '/placeholder.svg'
const FALLBACK_CURRENT_PRICE = 199
const DEFAULT_COUNTRY = 'Onbekend'
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

const API_ENDPOINT = '/api/deals'

type AffiliatePartnerKey = keyof typeof AFFILIATE_PARTNERS

type ApiDeal = SeatAwareDeal & {
  id: string | number
  destination?: string | null
  origin?: string | null
  country?: string | null
  country_name?: string | null
  city?: string | null
  city_name?: string | null
  airline?: string | null
  airline_logo?: string | null
  airlineLogo?: string | null
  airline_logo_url?: string | null
  airlineLogoUrl?: string | null
  image?: { src?: string | null; alt?: string | null } | string | null
  image_url?: string | null
  imageUrl?: string | null
  imageURL?: string | null
  hero_image?: string | null
  heroImage?: string | null
  thumbnail?: string | null
  thumbnail_url?: string | null
  thumbnailUrl?: string | null
  original_price?: number | string | null
  originalPrice?: number | string | null
  current_price?: number | string | null
  currentPrice?: number | string | null
  price?: number | string | null
  discount_percentage?: number | string | null
  discount?: number | string | null
  rating?: number | string | null
  review_count?: number | string | null
  reviewCount?: number | string | null
  competitor_price?: number | string | null
  competitorPrice?: number | string | null
  daily_bookings?: number | string | null
  bookings_today?: number | string | null
  bookingsToday?: number | string | null
  partner_id?: string | null
  partnerId?: string | null
  partner?: string | null
  deal_expires_at?: string | Date | null
  expires_at?: string | Date | null
  expiresAt?: string | Date | null
  expirationDate?: string | Date | null
  dealExpiration?: string | Date | null
  [key: string]: unknown
}

type DealCardData = {
  id: number
  destination: string
  country: string
  originalPrice: number
  currentPrice: number
  discount: number
  airline: string
  seatsRemaining: number
  image: string
  airlineLogo: string
  expiresAt: Date
  partner?: AffiliatePartnerKey
  rating?: number
  reviewCount?: number
  competitorPrice?: number
  bookingsToday?: number
}

const featuredDeal: DealCardData = {
  id: 1,
  destination: 'Barcelona',
  country: 'Spanje',
  originalPrice: 299,
  currentPrice: 199,
  discount: 33,
  airline: 'KLM',
  seatsRemaining: 5,
  image: '/barcelona-sagrada-familia-park-guell.png',
  airlineLogo: '/klm-logo.png',
  expiresAt: new Date(Date.now() + MILLISECONDS_IN_DAY),
}

const parseNumber = (
  value: unknown,
  { allowNegative = false }: { allowNegative?: boolean } = {},
): number | null => {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value === 'bigint') {
    return Number(value)
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (!trimmed) {
      return null
    }

    const normalized = trimmed
      .replace(/,/g, '.')
      .match(allowNegative ? /-?\d+(?:\.\d+)?/ : /\d+(?:\.\d+)?/)

    if (!normalized || normalized.length === 0) {
      return null
    }

    const parsed = Number(normalized[0])

    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

const parseDate = (value: unknown): Date | null => {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    const dateFromNumber = new Date(value)
    return Number.isNaN(dateFromNumber.getTime()) ? null : dateFromNumber
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (!trimmed) {
      return null
    }

    const parsed = Date.parse(trimmed)

    return Number.isNaN(parsed) ? null : new Date(parsed)
  }

  return null
}

const isValidAffiliatePartner = (value: string): value is AffiliatePartnerKey => value in AFFILIATE_PARTNERS

const extractImage = (deal: ApiDeal, destination: string): string => {
  if (typeof deal.image === 'string' && deal.image.trim()) {
    return deal.image.trim()
  }

  if (deal.image && typeof deal.image === 'object' && 'src' in deal.image && deal.image.src) {
    const src = String(deal.image.src)

    if (src.trim()) {
      return src.trim()
    }
  }

  const candidates = [
    deal.image_url,
    deal.imageUrl,
    deal.imageURL,
    deal.hero_image,
    deal.heroImage,
    deal.thumbnail,
    deal.thumbnail_url,
    deal.thumbnailUrl,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim()
    }
  }

  return `https://source.unsplash.com/800x600/?${encodeURIComponent(destination)},travel`
}

const extractAirlineLogo = (deal: ApiDeal): string => {
  const candidates = [deal.airlineLogo, deal.airline_logo, deal.airline_logo_url, deal.airlineLogoUrl]

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim()
    }
  }

  return FALLBACK_AIRLINE_LOGO
}

const computeDiscountPercentage = (original: number, current: number): number => {
  if (!Number.isFinite(original) || original <= 0) {
    return 0
  }

  const difference = original - current

  if (difference <= 0) {
    return 0
  }

  const percentage = (difference / original) * 100

  return Math.max(0, Math.round(percentage))
}

const resolveDealSeats = (deal: ApiDeal): number => {
  const directSeatValue = parseNumber((deal as SeatAwareDeal).seatsRemaining ?? null, { allowNegative: true })

  if (directSeatValue !== null) {
    return directSeatValue
  }

  return resolveSeatsRemaining(deal, DEFAULT_SEATS_REMAINING)
}

const readFirstString = (deal: ApiDeal, keys: string[], fallback?: string): string | undefined => {
  for (const key of keys) {
    const value = deal[key]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return fallback
}

const readFirstNumber = (
  deal: ApiDeal,
  keys: string[],
  options?: Parameters<typeof parseNumber>[1],
): number | null => {
  for (const key of keys) {
    const parsed = parseNumber(deal[key], options)

    if (parsed !== null) {
      return parsed
    }
  }

  return null
}

const mapDealToCardData = (deal: ApiDeal, index: number): DealCardData => {
  const id =
    typeof deal.id === 'number' && Number.isFinite(deal.id)
      ? Math.trunc(deal.id)
      : typeof deal.id === 'string' && /^\d+$/.test(deal.id.trim())
        ? Number.parseInt(deal.id.trim(), 10)
        : index + 1

  const destination =
    readFirstString(deal, ['destination', 'city_name', 'city', 'origin']) || 'Onbekende bestemming'

  const country = readFirstString(deal, ['country', 'country_name'], DEFAULT_COUNTRY) ?? DEFAULT_COUNTRY

  const airline = readFirstString(deal, ['airline']) || 'Onbekende maatschappij'

  const currentPriceCandidate =
    readFirstNumber(deal, ['current_price', 'price', 'currentPrice'], { allowNegative: false }) ??
    readFirstNumber(deal, ['price'], { allowNegative: false })

  const currentPrice =
    currentPriceCandidate !== null && currentPriceCandidate > 0
      ? Math.round(currentPriceCandidate)
      : FALLBACK_CURRENT_PRICE

  const originalPriceCandidate = readFirstNumber(deal, ['original_price', 'originalPrice'], { allowNegative: false })

  let originalPrice =
    originalPriceCandidate !== null && originalPriceCandidate > 0
      ? Math.round(originalPriceCandidate)
      : Math.round(currentPrice * 1.35)

  if (originalPrice <= currentPrice) {
    originalPrice = currentPrice + Math.max(20, Math.round(currentPrice * 0.15))
  }

  const discountCandidate = readFirstNumber(deal, ['discount_percentage', 'discount'], { allowNegative: false })
  const discount =
    discountCandidate !== null ? Math.max(0, Math.round(discountCandidate)) : computeDiscountPercentage(originalPrice, currentPrice)

  const seatsRemaining = resolveDealSeats(deal)

  const image = extractImage(deal, destination)
  const airlineLogo = extractAirlineLogo(deal)

  const expiresAt =
    parseDate(deal.deal_expires_at) ??
    parseDate(deal.expires_at) ??
    parseDate(deal.expiresAt) ??
    parseDate(deal.expirationDate) ??
    parseDate(deal.dealExpiration) ??
    new Date(Date.now() + (index + 1) * MILLISECONDS_IN_DAY)

  const partnerCandidates = [deal.partner, deal.partner_id, deal.partnerId]
  let partner: AffiliatePartnerKey | undefined

  for (const candidate of partnerCandidates) {
    if (typeof candidate === 'string' && isValidAffiliatePartner(candidate)) {
      partner = candidate
      break
    }
  }

  const rating = readFirstNumber(deal, ['rating'], { allowNegative: false })
  const reviewCount = readFirstNumber(deal, ['review_count', 'reviewCount'], { allowNegative: false })
  const competitorPrice = readFirstNumber(deal, ['competitor_price', 'competitorPrice'], { allowNegative: false })
  const bookingsToday =
    readFirstNumber(deal, ['daily_bookings', 'bookings_today', 'bookingsToday'], { allowNegative: false }) ?? undefined

  return {
    id,
    destination,
    country,
    originalPrice,
    currentPrice,
    discount,
    airline,
    seatsRemaining,
    image,
    airlineLogo,
    expiresAt,
    partner,
    rating: rating ?? undefined,
    reviewCount: reviewCount ?? undefined,
    competitorPrice: competitorPrice ?? undefined,
    bookingsToday: bookingsToday ?? undefined,
  }
}

export default function HomePage() {
  const [deals, setDeals] = useState<DealCardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchDeals = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(API_ENDPOINT)

        if (!response.ok) {
          throw new Error('Deals konden niet worden geladen.')
        }

        const data = await response.json()
        const items: ApiDeal[] = Array.isArray(data?.items) ? data.items : []

        const mappedDeals = items
          .map((item, index) => {
            try {
              return mapDealToCardData(item, index)
            } catch (mappingError) {
              console.error('Failed to map deal', mappingError, item)
              return null
            }
          })
          .filter((deal): deal is DealCardData => Boolean(deal))

        if (isMounted) {
          setDeals(mappedDeals)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Onbekende fout bij het laden van deals.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchDeals()

    return () => {
      isMounted = false
    }
  }, [])

  const highlightedDeal = useMemo(() => (deals.length > 0 ? deals[0] : featuredDeal), [deals])

  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <SearchFilterSection />
        <DealOfTheDaySection deal={highlightedDeal} />
        <section id="deals" className="container mx-auto px-4 md:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Populaire Vliegdeals</h2>
          {isLoading && <p className="text-center py-10">Deals worden geladen...</p>}
          {error && <p className="text-center text-red-500 py-10">Fout: {error}</p>}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deals.length > 0 ? (
                deals.map((deal) => <EnhancedDealCard key={deal.id} deal={deal} />)
              ) : (
                <p className="col-span-full text-center py-10">Geen passende deals gevonden.</p>
              )}
            </div>
          )}
        </section>
        <TestimonialsSection />
        <NewsletterSection />
        <PartnerBrandingFooter />
      </main>
      <Footer />
    </div>
  )
}
