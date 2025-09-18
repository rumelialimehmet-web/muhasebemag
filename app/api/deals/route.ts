import { NextResponse } from 'next/server'

import { fetchDeals, getFallbackDeals } from '@/lib/api'

const CACHE_SECONDS = 300
const STALE_SECONDS = 120

export async function GET() {
  try {
    const deals = await fetchDeals()

    return NextResponse.json(
      {
        items: deals,
        count: deals.length,
        fallback: false,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`,
        },
      },
    )
  } catch (error) {
    console.error('Failed to fetch deals from external API:', error)

    const fallbackDeals = getFallbackDeals()

    return NextResponse.json(
      {
        items: fallbackDeals,
        count: fallbackDeals.length,
        fallback: true,
        updatedAt: new Date().toISOString(),
        error: 'Deals konden niet worden geladen. Fallback gegevens worden getoond.',
      },
      {
        status: fallbackDeals.length > 0 ? 200 : 502,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}
