"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Wifi } from "lucide-react"

interface ErrorStateProps {
  onRetry: () => void
  isRetrying?: boolean
  error?: string
}

export default function ErrorState({ onRetry, isRetrying = false, error }: ErrorStateProps) {
  const isNetworkError = error?.toLowerCase().includes("network") || error?.toLowerCase().includes("fetch")

  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          {isNetworkError ? (
            <Wifi className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          ) : (
            <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isNetworkError ? "Verbindingsprobleem" : "Er ging iets mis"}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isNetworkError
            ? "Controleer je internetverbinding en probeer het opnieuw."
            : "We konden de vliegdeals niet laden. Probeer het over een paar minuten opnieuw."}
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-700 dark:text-red-300 font-mono">{error}</p>
          </div>
        )}

        <Button onClick={onRetry} disabled={isRetrying} className="bg-blue-600 hover:bg-blue-700 text-white">
          {isRetrying ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Opnieuw laden...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Probeer opnieuw
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
