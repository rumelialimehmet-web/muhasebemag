import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Beste Tijd om Vliegtickets te Boeken: Complete Gids 2024",
    excerpt:
      "Ontdek wanneer je het meeste bespaart op vliegtickets. Van seizoenen tot dagen van de week - alle tips om goedkoop te vliegen.",
    content: `
      <h2>Wanneer is de beste tijd om vliegtickets te boeken?</h2>
      <p>De timing van je vliegticket aankoop kan honderden euro's schelen. Na analyse van miljoenen vliegtickets hebben we de optimale boekingsstrategieën ontdekt.</p>
      
      <h3>1. Boek 6-8 weken van tevoren voor Europese vluchten</h3>
      <p>Voor vluchten binnen Europa is 6-8 weken van tevoren de sweet spot. Eerder boeken levert zelden extra korting op, later boeken wordt duurder.</p>
      
      <h3>2. Intercontinentale vluchten: 2-3 maanden vooruit</h3>
      <p>Voor lange afstanden zoals Azië of Amerika is 2-3 maanden van tevoren ideaal. Airlines bieden dan de beste prijzen aan.</p>
      
      <h3>3. Dinsdag en woensdag zijn goedkoopst</h3>
      <p>Vermijd vrijdag en zondag - dit zijn de duurste dagen. Dinsdag en woensdag bieden gemiddeld 15-20% korting.</p>
      
      <h3>4. Seizoenen maken verschil</h3>
      <p>Vlieg in het laagseizoen voor maximale besparingen:</p>
      <ul>
        <li>Europa: Oktober-maart (behalve kerstvakantie)</li>
        <li>Azië: Mei-september</li>
        <li>Amerika: Januari-maart, oktober-november</li>
      </ul>
      
      <h3>5. Gebruik incognito modus</h3>
      <p>Airlines tracken je zoekgedrag. Gebruik altijd incognito/private browsing om prijsmanipulatie te voorkomen.</p>
    `,
    image: "/blog/best-time-to-book.png",
    category: "Tips",
    readTime: "8 min",
    publishDate: "2024-01-15",
    author: "Sarah van der Berg",
    slug: "beste-tijd-vliegtickets-boeken",
    featured: true,
  },
  // Add more posts here...
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Artikel niet gevonden | SpotMijnVlucht.nl",
    }
  }

  return {
    title: `${post.title} | SpotMijnVlucht.nl`,
    description: post.excerpt,
    keywords: `${post.category.toLowerCase()}, reistips, vliegtickets, ${post.title.toLowerCase()}`,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishDate).toLocaleDateString("nl-NL")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Delen
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Klaar om te besparen op je volgende vlucht?</h3>
            <p className="text-gray-600 mb-6">Bekijk onze actuele vliegdeals en bespaar tot 70% op je volgende reis.</p>
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Bekijk Alle Deals
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Gerelateerde Artikelen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" size="sm">
                        Lees meer
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
