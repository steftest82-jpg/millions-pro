import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import AuthorCard from '@/components/AuthorCard';
import NewsletterCTA from '@/components/NewsletterCTA';
import {
  getAllPosts,
  getPostsByCategory,
  ALL_CATEGORIES,
  formatDate,
  formatCategoryName,
} from '@/lib/keystatic';

export const metadata: Metadata = {
  title: 'Personal Finance Tips for Smart Money Moves',
  description:
    'Discover actionable personal finance tips, smart budgeting strategies, beginner investing guides, debt management advice, and profitable side hustle ideas. Your daily finance magazine by Marine Lafitte.',
};

/* ---------- category color mapping ---------- */

const CATEGORY_COLORS: Record<string, { gradient: string; border: string }> = {
  'smart-budgeting-and-saving': {
    gradient: 'from-emerald-500/10 to-emerald-500/[0.02]',
    border: 'hover:border-emerald-300/40',
  },
  'beginner-investing-tips': {
    gradient: 'from-blue-500/10 to-blue-500/[0.02]',
    border: 'hover:border-blue-300/40',
  },
  'debt-management': {
    gradient: 'from-amber-500/10 to-amber-500/[0.02]',
    border: 'hover:border-amber-300/40',
  },
  'side-hustles-and-income-growth': {
    gradient: 'from-violet-500/10 to-violet-500/[0.02]',
    border: 'hover:border-violet-300/40',
  },
  'financial-wellness': {
    gradient: 'from-rose-500/10 to-rose-500/[0.02]',
    border: 'hover:border-rose-300/40',
  },
};

/* ---------- helpers ---------- */

function primaryCategory(categories: string[]): { slug: string; name: string } {
  const slug = categories[0] || 'smart-budgeting-and-saving';
  return { slug, name: formatCategoryName(slug) };
}

function authorInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/* ---------- page component ---------- */

export default async function HomePage() {
  const allPosts = await getAllPosts();

  /* Fetch posts for each category (already sorted most recent first) */
  const categoryPostsMap: Record<string, Awaited<ReturnType<typeof getPostsByCategory>>> = {};
  for (const cat of ALL_CATEGORIES) {
    categoryPostsMap[cat.slug] = (await getPostsByCategory(cat.slug)).slice(0, 10);
  }

  /* Most recent post across all categories for the hero */
  const heroPost = allPosts[0] ?? null;

  /* Latest 6 articles (skip the hero post) */
  const latestPosts = allPosts.filter((p) => p.slug !== heroPost?.slug).slice(0, 6);

  /* Track slugs already shown in hero + latest to avoid duplicates in category sections */
  const shownSlugs = new Set<string>();
  if (heroPost) shownSlugs.add(heroPost.slug);
  latestPosts.forEach((p) => shownSlugs.add(p.slug));

  /* Pre-compute deduplicated category posts so JSX doesn't mutate state during render */
  const dedupedCategoryPosts: Record<string, Awaited<ReturnType<typeof getPostsByCategory>>> = {};
  for (const cat of ALL_CATEGORIES) {
    const posts = (categoryPostsMap[cat.slug] || []).filter((p) => !shownSlugs.has(p.slug));
    posts.forEach((p) => shownSlugs.add(p.slug));
    dedupedCategoryPosts[cat.slug] = posts;
  }

  return (
    <>
      {/* ============================================================
          HERO -- Featured Article
          ============================================================ */}
      {heroPost && (
        <section className="relative bg-gradient-hero overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/8 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28">
            {/* Eyebrow */}
            <div className="text-center mb-10 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent text-xs font-sans font-semibold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
                Featured Article
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Text Column */}
              <div className="order-2 lg:order-1 animate-fade-in-up">
                <Link
                  href={`/category/${primaryCategory(heroPost.categories).slug}`}
                  className="inline-block mb-5 text-xs font-sans font-bold uppercase tracking-[0.15em] text-accent/90 hover:text-white transition-colors duration-200"
                >
                  {primaryCategory(heroPost.categories).name}
                </Link>

                <h1 className="text-3xl sm:text-4xl md:text-display-sm lg:text-display-md font-bold text-white mb-6 leading-tight text-balance">
                  {heroPost.title}
                </h1>

                <p className="text-base sm:text-lg text-blue-100/80 mb-8 leading-relaxed max-w-xl">
                  {heroPost.excerpt}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold font-sans text-sm shadow-lg">
                    {authorInitials(heroPost.author)}
                  </div>
                  <div>
                    <p className="text-sm font-sans font-semibold text-white">
                      {heroPost.author}
                    </p>
                    <p className="text-xs font-sans text-blue-200/70">
                      {formatDate(heroPost.publishedAt)} -- {heroPost.readingTime} min read
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/blog/${heroPost.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-foreground font-sans font-semibold rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Read Full Article
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/20 text-white font-sans font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    Browse All Articles
                  </Link>
                </div>
              </div>

              {/* Image Column */}
              <div className="order-1 lg:order-2 animate-fade-in">
                <Link href={`/blog/${heroPost.slug}`} className="block group">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <Image
                      src={heroPost.coverImage}
                      alt={heroPost.coverImageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-60" />
                    {/* Reading time badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-foreground">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-sans font-semibold">{heroPost.readingTime} min</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>
      )}

      {/* ============================================================
          CATEGORY NAV TABS
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <nav
          aria-label="Article categories"
          className="bg-white rounded-2xl shadow-soft-lg border border-primary/10 p-2 flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 rounded-none sm:rounded-2xl"
        >
          <Link
            href="/blog"
            className="flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium text-foreground/65 hover:text-primary hover:bg-primary/[0.05] active:bg-primary/[0.08] transition-all duration-200 whitespace-nowrap flex-shrink-0 min-h-[44px] items-center"
          >
            All Topics
          </Link>
          {ALL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium text-foreground/65 hover:text-primary hover:bg-primary/[0.05] active:bg-primary/[0.08] transition-all duration-200 whitespace-nowrap flex-shrink-0 min-h-[44px] items-center"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* ============================================================
          LATEST ARTICLES GRID (6 most recent, excluding hero)
          ============================================================ */}
      {latestPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                Latest Articles
              </span>
              <h2 className="text-display-sm sm:text-display-md font-bold text-foreground leading-tight">
                Fresh Financial Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-secondary hover:text-primary transition-colors duration-200 group"
            >
              View All
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {latestPosts.map((post, index) => {
              const cat = primaryCategory(post.categories);
              return (
                <div
                  key={post.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
                >
                  <PostCard
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    coverImageAlt={post.coverImageAlt}
                    category={cat.name}
                    categorySlug={cat.slug}
                    author={post.author}
                    publishedAt={post.publishedAt}
                    readingTime={post.readingTime}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile View All */}
          <div className="mt-10 text-center sm:hidden">
            <Link href="/blog" className="btn-secondary">
              View All Articles
            </Link>
          </div>
        </section>
      )}

      {/* ============================================================
          CATEGORY SECTIONS (5 categories, up to 10 articles each)
          ============================================================ */}
      {ALL_CATEGORIES.map((cat) => {
        const posts = dedupedCategoryPosts[cat.slug] || [];
        if (posts.length === 0) return null;

        const featured = posts[0];
        const remaining = posts.slice(1);
        const featuredCat = primaryCategory(featured.categories);
        const colors = CATEGORY_COLORS[cat.slug] || {
          gradient: 'from-gray-500/10 to-gray-500/[0.02]',
          border: 'hover:border-gray-300/40',
        };

        return (
          <section
            key={cat.slug}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-primary/[0.06]"
          >
            {/* Section header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                  {cat.name}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  {cat.name}
                </h2>
              </div>
              <Link
                href={`/category/${cat.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-secondary hover:text-primary transition-colors duration-200 group"
              >
                View All
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Featured article (large) */}
              <div className="lg:col-span-7">
                <article className="card group h-full flex flex-col">
                  <Link href={`/blog/${featured.slug}`} className="block flex-1 flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={featured.coverImage}
                        alt={featured.coverImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
                        <svg className="w-3 h-3 text-foreground/50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[11px] font-sans font-semibold">{featured.readingTime} min</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <span className="badge badge-primary text-[11px]">{featuredCat.name}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {featured.title}
                      </h3>
                      <p className="text-sm text-foreground/60 leading-relaxed mb-5 line-clamp-3 flex-1">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-2.5 pt-4 border-t border-primary/[0.06]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold font-sans text-[10px] flex-shrink-0 shadow-sm">
                          {authorInitials(featured.author)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-sans font-semibold text-foreground truncate">{featured.author}</p>
                          <p className="text-[11px] font-sans text-foreground/45">{formatDate(featured.publishedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              </div>

              {/* Remaining articles (compact list) */}
              {remaining.length > 0 && (
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {remaining.map((post) => {
                    const postCat = primaryCategory(post.categories);
                    return (
                      <article key={post.slug} className="group">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex gap-4 p-3 rounded-xl hover:bg-primary/[0.03] transition-colors duration-200"
                        >
                          <div className="relative w-24 h-24 sm:w-28 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={post.coverImage}
                              alt={post.coverImageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="120px"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.12em] text-primary/70 mb-1">
                              {postCat.name}
                            </span>
                            <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1.5">
                              {post.title}
                            </h4>
                            <p className="text-[11px] font-sans text-foreground/45">
                              {formatDate(post.publishedAt)} -- {post.readingTime} min read
                            </p>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile View All for this category */}
            <div className="mt-8 text-center sm:hidden">
              <Link href={`/category/${cat.slug}`} className="btn-secondary text-sm">
                View All {cat.name}
              </Link>
            </div>
          </section>
        );
      })}

      {/* ============================================================
          NEWSLETTER CTA
          ============================================================ */}
      <NewsletterCTA />

      {/* ============================================================
          BROWSE ALL TOPICS -- Category Cards
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
            Browse All Topics
          </span>
          <h2 className="text-display-sm sm:text-display-md font-bold text-foreground mb-4">
            Dive Into a Topic
          </h2>
          <p className="text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re just starting your financial journey or looking to level up, we&apos;ve got expert-driven content tailored to your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_CATEGORIES.map((topic) => {
            const colors = CATEGORY_COLORS[topic.slug] || {
              gradient: 'from-gray-500/10 to-gray-500/[0.02]',
              border: 'hover:border-gray-300/40',
            };
            const articleCount = categoryPostsMap[topic.slug]?.length || 0;

            return (
              <Link
                key={topic.slug}
                href={`/category/${topic.slug}`}
                className={`group relative bg-gradient-to-b ${colors.gradient} rounded-2xl p-7 border border-primary/10 ${colors.border} hover:shadow-soft-lg transition-all duration-300`}
              >
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {topic.name}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                  {topic.description}
                </p>
                <span className="text-xs font-sans font-semibold text-primary/70">
                  {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                </span>
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          ABOUT THE AUTHOR
          ============================================================ */}
      <section className="bg-white border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <AuthorCard variant="full" />
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-display-sm font-bold text-foreground mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-foreground/65 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of readers making smarter money decisions every day. Start with our most popular articles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="btn-primary text-base px-8 py-4">
              Explore the Blog
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-4">
              Meet the Author
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
