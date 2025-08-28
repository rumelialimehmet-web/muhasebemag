"use client"

import { Wrench, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-lg w-full text-center animate-fadeIn">
        <div className="mb-8">
          <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-12 h-12 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Onderhoud bezig</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We werken hard aan het verbeteren van SpotMijnVlucht. We zijn zo terug met nog betere deals!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-medium text-gray-900 dark:text-white">Verwachte duur</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2-4 uur</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Laatste update: {new Date().toLocaleString("nl-NL")}
          </p>
        </div>

        <div className="space-y-4">
          <Button className="w-full" onClick={() => window.location.reload()}>
            Pagina vernieuwen
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            <Mail className="w-4 h-4 mr-2" />
            Stuur me een update
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Volg ons op social media voor live updates</p>
        </div>
      </div>
    </div>
  )
}
