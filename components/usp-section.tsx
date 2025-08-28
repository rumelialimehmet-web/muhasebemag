import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, TrendingDown, Clock, Award } from "lucide-react"

const usps = [
  {
    icon: TrendingDown,
    title: "Tot 70% Besparing",
    description:
      "Onze algoritmes scannen duizenden vluchten per dag om de beste deals voor jou te vinden. Gemiddeld besparen onze klanten €300 per boeking.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Prijzen worden elke 5 minuten bijgewerkt. Mis nooit meer een deal door onze instant notificaties en live countdown timers.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "100% Veilig Boeken",
    description:
      "SSL-versleuteling, IATA-gecertificeerd en volledige geld-terug-garantie. Jouw gegevens en betaling zijn altijd beschermd.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Users,
    title: "50.000+ Tevreden Klanten",
    description:
      "Sluit je aan bij onze community van slimme reizigers. Meer dan 50.000 mensen hebben al hun droomreis geboekt via ons platform.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Clock,
    title: "24/7 Klantenservice",
    description:
      "Nederlandse klantenservice die altijd voor je klaarstaat. Chat, bel of mail ons - we helpen je binnen 2 uur.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Award,
    title: "Exclusieve Deals",
    description:
      "Toegang tot verborgen tarieven en last-minute aanbiedingen die je nergens anders vindt. Alleen voor onze leden beschikbaar.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
]

export default function USPSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Waarom SpotMijnVlucht?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ontdek waarom duizenden Nederlanders kiezen voor SpotMijnVlucht als hun vertrouwde reispartner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => {
            const IconComponent = usp.icon
            return (
              <Card
                key={index}
                className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${usp.bgColor} mb-4`}>
                    <IconComponent className={`h-8 w-8 ${usp.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{usp.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{usp.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">€15M+</div>
              <div className="text-gray-600">Totaal bespaard door klanten</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Tevreden reizigers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">Bestemmingen wereldwijd</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
              <div className="text-gray-600">Gemiddelde beoordeling</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
