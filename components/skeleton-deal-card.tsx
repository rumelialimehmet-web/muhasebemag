import { Card, CardContent } from "@/components/ui/card"

export default function SkeletonDealCard() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg animate-pulse">
      <div className="relative">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />

        {/* Discount badge skeleton */}
        <div className="absolute top-3 right-3 w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded" />

        {/* Airline logo skeleton */}
        <div className="absolute bottom-3 left-3 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />

        {/* Partner badge skeleton */}
        <div className="absolute bottom-3 right-3 w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>

      <CardContent className="p-6">
        {/* Title and rating skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
        </div>

        {/* Price section skeleton */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="w-20 h-3 bg-gray-200 dark:bg-gray-600 rounded mb-1" />
              <div className="w-16 h-5 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
            <div className="text-right">
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-600 rounded mb-1" />
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-6 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
          </div>
        </div>

        {/* Airline and countdown skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Seats remaining skeleton */}
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded mb-3" />

        {/* Social proof skeleton */}
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded mb-3" />

        {/* Security info skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4" />

        {/* CTA button skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Footer info skeleton */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}
