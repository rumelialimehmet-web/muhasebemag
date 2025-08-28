"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Shield, Bell, Star } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/stripe"
import { trackEvent } from "@/lib/analytics"

export default function PremiumPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planType: "monthly" | "yearly") => {
    setLoading(planType)

    try {
      // Track subscription attempt
      trackEvent("subscription_attempt", {
        event_category: "subscription",
        event_label: planType,
      })

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: planType === "yearly" ? "yearly" : "monthly",
          userId: "temp-user-id", // Replace with actual user ID from auth
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-yellow-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">SpotMijnVlucht Premium</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontgrendel exclusieve deals en geniet van een advertentievrije ervaring
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Monthly Plan */}
          <Card className="relative border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {SUBSCRIPTION_PLANS.premium_monthly.name}
              </CardTitle>
              <CardDescription className="text-gray-600">Perfect om te proberen</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-600">€{SUBSCRIPTION_PLANS.premium_monthly.price}</span>
                <span className="text-gray-600 ml-2">/maand</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {SUBSCRIPTION_PLANS.premium_monthly.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe("monthly")}
                disabled={loading === "monthly"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {loading === "monthly" ? "Bezig..." : "Start Maandelijks Abonnement"}
              </Button>
            </CardContent>
          </Card>

          {/* Yearly Plan */}
          <Card className="relative border-2 border-blue-500 hover:border-blue-600 transition-colors">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
              Meest Populair
            </Badge>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {SUBSCRIPTION_PLANS.premium_yearly.name}
              </CardTitle>
              <CardDescription className="text-gray-600">Beste waarde - 2 maanden gratis!</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-600">€{SUBSCRIPTION_PLANS.premium_yearly.price}</span>
                <span className="text-gray-600 ml-2">/jaar</span>
              </div>
              <div className="text-sm text-green-600 font-medium">
                Bespaar €
                {(SUBSCRIPTION_PLANS.premium_monthly.price * 12 - SUBSCRIPTION_PLANS.premium_yearly.price).toFixed(2)}{" "}
                per jaar
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {SUBSCRIPTION_PLANS.premium_yearly.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe("yearly")}
                disabled={loading === "yearly"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {loading === "yearly" ? "Bezig..." : "Start Jaarlijks Abonnement"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Premium Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Waarom Premium?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusieve Deals</h3>
              <p className="text-gray-600">
                Toegang tot premium deals die niet beschikbaar zijn voor gratis gebruikers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advertentievrij</h3>
              <p className="text-gray-600">Geniet van een schone, snelle ervaring zonder advertenties</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bell className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Geavanceerde Alarmen</h3>
              <p className="text-gray-600">Ontvang directe meldingen voor prijsdalingen en nieuwe deals</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Wat Zeggen Onze Premium Leden?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Premium heeft me al meer dan €500 bespaard dit jaar! De exclusieve deals zijn echt de moeite waard."
              </p>
              <div className="font-semibold text-gray-900">- Sarah M.</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Geen advertenties meer en altijd de eerste die nieuwe deals ziet. Perfect voor frequent reizigers!"
              </p>
              <div className="font-semibold text-gray-900">- Mark V.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
