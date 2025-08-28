import DealsPage from "./deals-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Goedkope Vliegtickets & Vliegdeals | SpotMijnVlucht.nl",
  description:
    "✈️ Ontdek de beste vliegdeals naar Istanbul €89, Barcelona €67, London €45. Dagelijks bijgewerkte aanbiedingen met tot 70% korting. Vergelijk en boek direct!",
  keywords: [
    "goedkope vliegtickets Istanbul",
    "Barcelona vliegdeals",
    "London budget vluchten",
    "last minute vliegtickets",
    "vliegdeals Nederland",
    "goedkoop vliegen Europa",
    "vliegtickets vergelijken",
    "budget airlines",
    "vakantie aanbiedingen",
  ].join(", "),
  openGraph: {
    title: "Goedkope Vliegtickets & Vliegdeals | SpotMijnVlucht.nl",
    description: "✈️ Ontdek de beste vliegdeals naar Istanbul €89, Barcelona €67, London €45. Tot 70% korting!",
    images: [
      {
        url: "/og-deals-homepage.png",
        width: 1200,
        height: 630,
        alt: "SpotMijnVlucht.nl Vliegdeals",
      },
    ],
  },
}

export default function HomePage() {
  return <DealsPage />
}
