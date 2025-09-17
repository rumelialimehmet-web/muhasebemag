export interface ApiDeal {
  id: number
  destination: string
  country: string
  original_price: number
  current_price: number
  discount: number
  airline: string
  seats_remaining: number
  image_url?: string
  airline_logo_url?: string
  expires_at: string
  category?: string
  duration?: string
  flight_class?: string
  rating?: number
  review_count?: number
  competitor_price?: number
  bookings_today?: number
  partner?: string
}

export interface Deal {
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
  category?: string
  duration?: string
  flightClass?: string
  rating?: number
  reviewCount?: number
  competitorPrice?: number
  bookingsToday?: number
  partner?: "booking" | "expedia" | "kayak"
}

export interface ApiResponse {
  deals: ApiDeal[]
  total: number
  page: number
  limit: number
}
