"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-lg w-full text-center animate-fadeIn">
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pagina niet gevonden</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            De pagina die je zoekt bestaat niet of is verplaatst. Geen zorgen, we helpen je verder!
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Terug naar home
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/#deals">
              <Search className="w-4 h-4 mr-2" />
              Bekijk alle deals
            </Link>
          </Button>

          <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ga terug
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Hulp nodig?{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              Neem contact op
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
