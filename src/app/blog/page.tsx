import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, ALL_CATEGORIES, formatDate } from '@/lib/keystatic';
import PostCard from '@/components/PostCard';
import BlogListingClient from '@/components/BlogListingClient';

export const metadata: Metadata = {
  title: 'Blog — Personal Finance Tips, Investing Guides & Money Management',
  description:
    'Browse all articles on Millions Pro. Expert personal finance tips covering smart budgeting strategies, beginner investing, debt management, profitable side hustles, and financial wellness by Marine Lafitte.',
  openGraph: {
    title: 'Millions Pro Blog — All Articles',
    description:
      'Actionable personal finance tips, investing strategies, and money management advice for everyday professionals.',
  },
};

export default async function BlogListingPage() {
  const posts = await getAllPosts();

  /* Build serializable post data for client component */
  const serializedPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    coverImageAlt: p.coverImageAlt,
    category:
      p.categories[0]
        ? ALL_CATEGORIES.find((c) => c.slug === p.categories[0])?.name || p.categories[0]
        : 'Uncategorized',
    categorySlug: p.categories[0] || '',
    author: p.author,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
    categories: p.categories,
  }));

  return (
    <>
      {/* ============================================================
          PAGE HEADER
          ============================================================ */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent text-xs font-sans font-semibold uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
            The Blog
          </span>
          <h1 className="text-display-sm sm:text-display-md lg:text-display-lg font-bold text-white mb-5 leading-tight">
            Financial Insights &<br className="hidden sm:block" />
            <span className="text-accent">Smart Money Strategies</span>
          </h1>
          <p className="text-base sm:text-lg text-blue-100/75 max-w-2xl mx-auto leading-relaxed">
            Actionable personal finance tips, investing guides, debt management strategies, and income growth ideas — written by Marine Lafitte for everyday professionals.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================================
          BLOG LISTING — Client component handles filtering & search
          ============================================================ */}
      <BlogListingClient posts={serializedPosts} categories={ALL_CATEGORIES} />
    </>
  );
}
