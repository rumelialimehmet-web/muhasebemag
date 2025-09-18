import type { ApiDeal, Deal, ApiResponse } from "@/types/deal"

export const API_BASE_URL = "https://spotmijnvlucht-api-77895017095-europe-west1.a.run.app"

// Transform API data to match component expectations
function transformApiDeal(apiDeal: ApiDeal): Deal {
  return {
    id: apiDeal.id,
    destination: apiDeal.destination,
    country: apiDeal.country,
    originalPrice: apiDeal.original_price,
    currentPrice: apiDeal.current_price,
    discount: apiDeal.discount,
    airline: apiDeal.airline,
    seatsRemaining: apiDeal.seats_remaining,
    image:
      apiDeal.image_url ||
      `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(apiDeal.destination + " " + apiDeal.country)}`,
    airlineLogo:
      apiDeal.airline_logo_url ||
      `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(apiDeal.airline + " logo")}`,
    expiresAt: new Date(apiDeal.expires_at),
    category: apiDeal.category || "budget",
    duration: apiDeal.duration || "short",
    flightClass: apiDeal.flight_class || "economy",
    rating: apiDeal.rating || 4.5,
    reviewCount: apiDeal.review_count || Math.floor(Math.random() * 1000) + 100,
    competitorPrice: apiDeal.competitor_price,
    bookingsToday: apiDeal.bookings_today || Math.floor(Math.random() * 50) + 10,
    partner: (apiDeal.partner as "booking" | "expedia" | "kayak") || "booking",
  }
}

export async function fetchDeals(): Promise<Deal[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/deals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    // Validate response structure
    if (!data.deals || !Array.isArray(data.deals)) {
      throw new Error("Invalid API response structure")
    }

    return data.deals.map(transformApiDeal)
  } catch (error) {
    console.error("Error fetching deals:", error)

    // Return fallback data if API fails
    if (process.env.NODE_ENV === "development") {
      console.warn("API failed, using fallback data for development")
      return getFallbackDeals()
    }

    throw error
  }
}

// Fallback data for development/testing
export function getFallbackDeals(): Deal[] {
  return [
    {
      id: 1,
      destination: "Istanbul",
      country: "Turkey",
      originalPrice: 245,
      currentPrice: 89,
      discount: 64,
      airline: "Turkish Airlines",
      seatsRemaining: 3,
      image: "/istanbul-turkey.jpg",
      airlineLogo: "/turkish-airlines-logo.png",
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      category: "budget",
      duration: "short",
      flightClass: "economy",
      rating: 4.6,
      reviewCount: 1247,
      competitorPrice: 125,
      bookingsToday: 23,
      partner: "booking",
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
      image: "/barcelona-cityscape.png",
      airlineLogo: "/vueling-logo.jpg",
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      category: "weekend",
      duration: "short",
      flightClass: "economy",
      rating: 4.3,
      reviewCount: 892,
      competitorPrice: 89,
      bookingsToday: 47,
      partner: "expedia",
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
      image: "/london-uk.jpg",
      airlineLogo: "/british-airways-logo.png",
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
      category: "budget",
      duration: "short",
      flightClass: "economy",
      rating: 4.8,
      reviewCount: 2156,
      competitorPrice: 78,
      bookingsToday: 34,
      partner: "kayak",
    },
  ]
}
