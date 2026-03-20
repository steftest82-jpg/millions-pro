import type { MetadataRoute } from 'next'
import { getAllPosts, ALL_CATEGORIES } from '@/lib/keystatic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.millionspro.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const posts = await getAllPosts()

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
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = ALL_CATEGORIES.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    ...(post.coverImage
      ? { images: [post.coverImage] }
      : {}),
  }))

  return [...staticPages, ...categoryPages, ...postPages]
}
