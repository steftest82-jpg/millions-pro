import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllPosts, formatCategoryName } from '@/lib/keystatic';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://millionspro.com';
  const posts = await getAllPosts();

  const feed = new RSS({
    title: 'Millions Pro — Your Daily Finance Magazine',
    description:
      'Practical personal finance tips for everyday professionals. Smart budgeting, investing, debt management, side hustles, and financial wellness by Marine Lafitte.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/api/feed`,
    language: 'en',
    pubDate: posts.length > 0 ? new Date(posts[0].publishedAt) : new Date(),
    copyright: `© ${new Date().getFullYear()} Millions Pro. All rights reserved.`,
    managingEditor: 'info@millionspro.com (Marine Lafitte)',
    webMaster: 'info@millionspro.com (Marine Lafitte)',
    ttl: 60,
    categories: [
      'Smart Budgeting and Saving',
      'Beginner Investing Tips',
      'Debt Management',
      'Side Hustles and Income Growth',
      'Financial Wellness',
      'Personal Finance',
      'Financial Commentary',
    ],
    custom_namespaces: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    custom_elements: [
      {
        'atom:link': {
          _attr: {
            href: `${siteUrl}/api/feed`,
            rel: 'self',
            type: 'application/rss+xml',
          },
        },
      },
    ],
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      guid: `${siteUrl}/blog/${post.slug}`,
      categories: post.categories.map((c) => formatCategoryName(c)),
      date: new Date(post.publishedAt),
      author: post.author,
      enclosure: post.coverImage
        ? {
            url: post.coverImage,
            type: 'image/jpeg',
          }
        : undefined,
      custom_elements: [
        { 'content:encoded': { _cdata: post.content } },
        { 'dc:creator': post.author },
      ],
    });
  });

  const xml = feed.xml({ indent: true });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
