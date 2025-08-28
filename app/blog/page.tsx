import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Reisgids & Tips | SpotMijnVlucht.nl",
  description:
    "Ontdek de beste reistips, budget travel advice en destination guides. Leer wanneer je het beste kunt boeken en bespaar op je volgende reis.",
  keywords: "reistips, budget travel, beste tijd boeken, vliegtickets tips, destination guides",
}

const blogPosts = [
  {
    id: 1,
    title: "Beste Tijd om Vliegtickets te Boeken: Complete Gids 2024",
    excerpt:
      "Ontdek wanneer je het meeste bespaart op vliegtickets. Van seizoenen tot dagen van de week - alle tips om goedkoop te vliegen.",
    image: "/blog/best-time-to-book.png",
    category: "Tips",
    readTime: "8 min",
    publishDate: "2024-01-15",
    author: "Sarah van der Berg",
    slug: "beste-tijd-vliegtickets-boeken",
    featured: true,
  },
  {
    id: 2,
    title: "Budget Travel: 15 Manieren om €500+ te Besparen op je Reis",
    excerpt:
      "Praktische tips om je reisbudget te maximaliseren. Van accommodatie tot transport - zo reis je goedkoop zonder in te leveren op kwaliteit.",
    image: "/blog/budget-travel-tips.png",
    category: "Budget",
    readTime: "12 min",
    publishDate: "2024-01-12",
    author: "Mark Jansen",
    slug: "budget-travel-tips-besparen",
    featured: true,
  },
  {
    id: 3,
    title: "Istanbul Reisgids: Verborgen Parels & Must-See Attracties",
    excerpt:
      "Complete gids voor Istanbul met insider tips, beste restaurants, verborgen plekjes en praktische informatie voor je bezoek.",
    image: "/blog/istanbul-guide.png",
    category: "Bestemmingen",
    readTime: "15 min",
    publishDate: "2024-01-10",
    author: "Ayşe Demir",
    slug: "istanbul-reisgids-complete",
    featured: true,
  },
  {
    id: 4,
    title: "Last Minute Deals: Hoe Vind je de Beste Aanbiedingen?",
    excerpt: "Strategieën om last minute vliegdeals te vinden. Apps, websites en timing tips voor spontane reizigers.",
    image: "/blog/last-minute-deals.png",
    category: "Tips",
    readTime: "6 min",
    publishDate: "2024-01-08",
    author: "Lisa Chen",
    slug: "last-minute-deals-vinden",
    featured: false,
  },
  {
    id: 5,
    title: "Barcelona Budget Gids: 3 Dagen voor Onder €200",
    excerpt:
      "Ontdek Barcelona zonder je budget te overschrijden. Gratis attracties, goedkope eetplekken en budget accommodaties.",
    image: "/blog/barcelona-budget.png",
    category: "Bestemmingen",
    readTime: "10 min",
    publishDate: "2024-01-05",
    author: "Carlos Rodriguez",
    slug: "barcelona-budget-gids",
    featured: false,
  },
  {
    id: 6,
    title: "Handbagage Regels 2024: Wat Mag Wel en Niet Mee?",
    excerpt:
      "Actuele handbagage regels van alle airlines. Vermijd extra kosten en vertragingen met deze complete checklist.",
    image: "/blog/handbagage-regels.png",
    category: "Tips",
    readTime: "7 min",
    publishDate: "2024-01-03",
    author: "Tom Bakker",
    slug: "handbagage-regels-2024",
    featured: false,
  },
]

const categories = ["Alle", "Tips", "Budget", "Bestemmingen"]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Reisgids & Tips</h1>
          <p className="text-xl text-gray-600 mb-8">
            Ontdek de beste reistips, budget advice en destination guides om meer te besparen op je volgende reis.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Uitgelichte Artikelen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishDate).toLocaleDateString("nl-NL")}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Lees Meer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Alle Artikelen</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {new Date(post.publishDate).toLocaleDateString("nl-NL")}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        Lees meer →
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
