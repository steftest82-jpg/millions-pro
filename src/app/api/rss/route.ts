import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://millionspro.com';
  const posts = await getAllPosts();

  const feed = new RSS({
    title: 'Millions Pro',
    description: 'Your Daily Finance Magazine for Smart Money Moves — personal finance tips, budgeting, investing, and more.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/api/rss`,
    language: 'en',
    pubDate: posts.length > 0 ? new Date(posts[0].publishedAt) : new Date(),
    copyright: `© ${new Date().getFullYear()} Millions Pro. All rights reserved.`,
    managingEditor: 'info@millionspro.com (Marine Lafitte)',
    webMaster: 'info@millionspro.com (Marine Lafitte)',
    categories: [
      'Smart Budgeting and Saving',
      'Beginner Investing Tips',
      'Debt Management',
      'Side Hustles and Income Growth',
      'Financial Wellness',
    ],
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      guid: post.slug,
      categories: post.categories.map((c: string) =>
        c.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
      ),
      date: new Date(post.publishedAt),
      author: post.author,
      enclosure: {
        url: post.coverImage,
        type: 'image/jpeg',
      },
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}
