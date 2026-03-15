import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millionspro.com'

const categories = [
  {
    slug: 'smart-budgeting-and-saving',
    name: 'Smart Budgeting and Saving',
    priority: 0.8,
  },
  {
    slug: 'beginner-investing-tips',
    name: 'Beginner Investing Tips',
    priority: 0.8,
  },
  {
    slug: 'debt-management',
    name: 'Debt Management',
    priority: 0.8,
  },
  {
    slug: 'side-hustles-and-income-growth',
    name: 'Side Hustles and Income Growth',
    priority: 0.8,
  },
  {
    slug: 'financial-wellness',
    name: 'Financial Wellness',
    priority: 0.8,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/blog/category/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: category.priority,
  }))

  return [...staticPages, ...categoryPages]
}
