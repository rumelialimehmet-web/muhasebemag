"use client"

import { Button } from "@/components/ui/button"
import { Plane, Search } from "lucide-react"

interface EmptyStateProps {
  onClearFilters: () => void
  hasFilters: boolean
}

export default function EmptyState({ onClearFilters, hasFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="relative">
            <Plane className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <Search className="h-6 w-6 text-gray-400 absolute -bottom-1 -right-1" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Geen deals beschikbaar</h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {hasFilters
            ? "Er zijn geen vliegdeals gevonden die voldoen aan je filters. Probeer je zoekcriteria aan te passen."
            : "Er zijn momenteel geen vliegdeals beschikbaar. Kom later terug voor nieuwe aanbiedingen!"}
        </p>

        {hasFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
          >
            Alle filters wissen
          </Button>
        )}
      </div>
    </div>
  )
}
