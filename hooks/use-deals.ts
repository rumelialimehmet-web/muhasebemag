"use client"

import { useState, useEffect, useCallback } from "react"
import type { Deal } from "@/types/deal"
import { fetchDeals } from "@/lib/api"

interface UseDealsReturn {
  deals: Deal[]
  isLoading: boolean
  error: string | null
  isRetrying: boolean
  refetch: () => Promise<void>
}

export function useDeals(): UseDealsReturn {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)

  const loadDeals = useCallback(async (isRetry = false) => {
    try {
      if (isRetry) {
        setIsRetrying(true)
      } else {
        setIsLoading(true)
      }

      setError(null)

      const dealsData = await fetchDeals()
      setDeals(dealsData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Er ging iets mis bij het laden van de deals"
      setError(errorMessage)
      console.error("Failed to load deals:", err)
    } finally {
      setIsLoading(false)
      setIsRetrying(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    await loadDeals(true)
  }, [loadDeals])

  useEffect(() => {
    loadDeals()
  }, [loadDeals])

  return {
    deals,
    isLoading,
    error,
    isRetrying,
    refetch,
  }
}
