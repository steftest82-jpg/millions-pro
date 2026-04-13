import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
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

/* ---------- category accent colors ---------- */

const CATEGORY_ACCENT: Record<string, string> = {
  'smart-budgeting-and-saving': 'emerald',
  'beginner-investing-tips': 'blue',
  'debt-management': 'amber',
  'side-hustles-and-income-growth': 'violet',
  'financial-wellness': 'rose',
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

  const categoryPostsMap: Record<string, Awaited<ReturnType<typeof getPostsByCategory>>> = {};
  for (const cat of ALL_CATEGORIES) {
    categoryPostsMap[cat.slug] = (await getPostsByCategory(cat.slug)).slice(0, 10);
  }

  const heroPost = allPosts[0] ?? null;
  const spotlightPosts = allPosts.slice(1, 4);
  const latestPosts = allPosts.filter((p) => p.slug !== heroPost?.slug && !spotlightPosts.find((s) => s.slug === p.slug)).slice(0, 6);

  const shownSlugs = new Set<string>();
  if (heroPost) shownSlugs.add(heroPost.slug);
  spotlightPosts.forEach((p) => shownSlugs.add(p.slug));
  latestPosts.forEach((p) => shownSlugs.add(p.slug));

  const dedupedCategoryPosts: Record<string, Awaited<ReturnType<typeof getPostsByCategory>>> = {};
  for (const cat of ALL_CATEGORIES) {
    const posts = (categoryPostsMap[cat.slug] || []).filter((p) => !shownSlugs.has(p.slug));
    posts.forEach((p) => shownSlugs.add(p.slug));
    dedupedCategoryPosts[cat.slug] = posts;
  }

  return (
    <>
      {/* ============================================================
          HERO — Full-width cinematic featured article
          ============================================================ */}
      {heroPost && (
        <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-end overflow-hidden">
          {/* Background image */}
          <Image
            src={heroPost.coverImage}
            alt={heroPost.coverImageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <Link
                href={`/category/${primaryCategory(heroPost.categories).slug}`}
                className="inline-block mb-5 px-4 py-1.5 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-white bg-white/15 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/25 transition-all duration-300"
              >
                {primaryCategory(heroPost.categories).name}
              </Link>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-5 leading-[1.1] text-balance">
                <Link href={`/blog/${heroPost.slug}`} className="hover:opacity-90 transition-opacity duration-300">
                  {heroPost.title}
                </Link>
              </h1>

              <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed max-w-2xl line-clamp-3">
                {heroPost.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white font-serif font-bold text-sm">
                  {authorInitials(heroPost.author)}
                </div>
                <div>
                  <p className="text-sm font-sans font-semibold text-white">{heroPost.author}</p>
                  <p className="text-xs font-sans text-white/50">{formatDate(heroPost.publishedAt)} &middot; {heroPost.readingTime} min read</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SPOTLIGHT — 3 featured articles in editorial strip
          ============================================================ */}
      {spotlightPosts.length > 0 && (
        <section className="bg-white border-b border-primary/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/[0.08]">
              {spotlightPosts.map((post, i) => {
                const cat = primaryCategory(post.categories);
                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="flex items-start gap-5 p-6 lg:p-8 hover:bg-primary/[0.02] transition-colors duration-300">
                      <span className="text-4xl font-serif font-bold text-primary/15 leading-none flex-shrink-0 group-hover:text-primary/30 transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-primary/60 mb-2 block">
                          {cat.name}
                        </span>
                        <h3 className="text-base font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1.5">
                          {post.title}
                        </h3>
                        <p className="text-xs font-sans text-foreground/40">
                          {formatDate(post.publishedAt)} &middot; {post.readingTime} min
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          LATEST ARTICLES — Editorial grid
          ============================================================ */}
      {latestPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-primary/60 mb-2">
                Latest Stories
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                Fresh From the Editor
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-medium text-foreground/50 hover:text-primary transition-colors duration-200 group"
            >
              View all
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* First row: 1 large + 2 stacked */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {latestPosts[0] && (
              <article className="group">
                <Link href={`/blog/${latestPosts[0].slug}`} className="block">
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-5">
                    <Image
                      src={latestPosts[0].coverImage}
                      alt={latestPosts[0].coverImageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-primary/60 mb-2 block">
                    {primaryCategory(latestPosts[0].categories).name}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 mb-3 line-clamp-2">
                    {latestPosts[0].title}
                  </h3>
                  <p className="text-sm text-foreground/55 leading-relaxed line-clamp-2 mb-4">
                    {latestPosts[0].excerpt}
                  </p>
                  <p className="text-xs font-sans text-foreground/35">
                    {latestPosts[0].author} &middot; {formatDate(latestPosts[0].publishedAt)}
                  </p>
                </Link>
              </article>
            )}

            <div className="flex flex-col gap-8">
              {latestPosts.slice(1, 3).map((post) => {
                const cat = primaryCategory(post.categories);
                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="flex gap-5">
                      <div className="relative w-40 h-28 sm:w-48 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="200px"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.12em] text-primary/60 mb-1.5">
                          {cat.name}
                        </span>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-xs font-sans text-foreground/35">
                          {post.author} &middot; {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Second row: 3 equal cards */}
          {latestPosts.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {latestPosts.slice(3, 6).map((post, index) => {
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
          )}
        </section>
      )}

      {/* ============================================================
          DIVIDER — Newsletter CTA
          ============================================================ */}
      <NewsletterCTA />

      {/* ============================================================
          CATEGORY SECTIONS — Editorial magazine layout
          ============================================================ */}
      {ALL_CATEGORIES.map((cat, catIndex) => {
        const posts = dedupedCategoryPosts[cat.slug] || [];
        if (posts.length === 0) return null;

        const featured = posts[0];
        const remaining = posts.slice(1, 6);
        const featuredCat = primaryCategory(featured.categories);
        const isEven = catIndex % 2 === 0;

        return (
          <section
            key={cat.slug}
            className={`py-16 sm:py-20 ${isEven ? 'bg-white' : 'bg-background'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-primary/60 mb-2">
                    {cat.name}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                    {cat.name}
                  </h2>
                </div>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-medium text-foreground/50 hover:text-primary transition-colors duration-200 group"
                >
                  See all
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>

              <div className={`grid lg:grid-cols-12 gap-10 ${isEven ? '' : 'lg:direction-rtl'}`}>
                {/* Featured article — large image card with overlay */}
                <div className={`lg:col-span-7 ${!isEven ? 'lg:order-2' : ''}`}>
                  <article className="group relative rounded-xl overflow-hidden">
                    <Link href={`/blog/${featured.slug}`} className="block">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={featured.coverImage}
                          alt={featured.coverImageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <span className="inline-block mb-3 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-white bg-white/15 backdrop-blur-sm border border-white/20 rounded-full">
                          {featuredCat.name}
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug mb-3 line-clamp-2 text-balance">
                          {featured.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4 max-w-lg hidden sm:block">
                          {featured.excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white font-serif font-bold text-[10px]">
                            {authorInitials(featured.author)}
                          </div>
                          <div>
                            <p className="text-xs font-sans font-medium text-white/80">{featured.author}</p>
                            <p className="text-[11px] font-sans text-white/40">{formatDate(featured.publishedAt)} &middot; {featured.readingTime} min</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </div>

                {/* Remaining articles — compact list */}
                {remaining.length > 0 && (
                  <div className={`lg:col-span-5 ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="flex flex-col divide-y divide-primary/[0.06]">
                      {remaining.map((post) => {
                        const postCat = primaryCategory(post.categories);
                        return (
                          <article key={post.slug} className="group py-5 first:pt-0 last:pb-0">
                            <Link href={`/blog/${post.slug}`} className="flex gap-4">
                              <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={post.coverImage}
                                  alt={post.coverImageAlt}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  sizes="120px"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="text-sm font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1.5">
                                  {post.title}
                                </h4>
                                <p className="text-[11px] font-sans text-foreground/40">
                                  {formatDate(post.publishedAt)} &middot; {post.readingTime} min
                                </p>
                              </div>
                            </Link>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link href={`/category/${cat.slug}`} className="btn-secondary text-sm">
                  View All {cat.name}
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============================================================
          BROWSE ALL TOPICS — Minimal cards
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-primary/60 mb-2">
            Explore
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
            Dive Into a Topic
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-sm leading-relaxed">
            Whether you&apos;re just starting your financial journey or looking to level up, we&apos;ve got expert-driven content tailored to your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_CATEGORIES.map((topic) => {
            const articleCount = categoryPostsMap[topic.slug]?.length || 0;

            return (
              <Link
                key={topic.slug}
                href={`/category/${topic.slug}`}
                className="group relative p-7 rounded-xl border border-primary/10 hover:border-primary/25 hover:shadow-soft-lg bg-white transition-all duration-300"
              >
                <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {topic.name}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-primary/50">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-primary/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="border-t border-primary/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-primary/50 mb-4">
            Start Today
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-5">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-foreground/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Join thousands of readers making smarter money decisions every day.
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
