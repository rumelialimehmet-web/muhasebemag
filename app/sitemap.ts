import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://spotmijnvlucht.nl"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bestemmingen`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]

  // Blog posts
  const blogPosts = [
    "beste-tijd-vliegtickets-boeken",
    "budget-travel-tips-besparen",
    "istanbul-reisgids-complete",
    "last-minute-deals-vinden",
    "barcelona-budget-gids",
    "handbagage-regels-2024",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Destination pages
  const destinations = [
    "istanbul",
    "barcelona",
    "london",
    "rome",
    "prague",
    "amsterdam",
    "paris",
    "new-york",
    "tokyo",
  ].map((destination) => ({
    url: `${baseUrl}/bestemmingen/${destination}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts, ...destinations]
}
