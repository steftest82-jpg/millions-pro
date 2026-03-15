import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Millions Pro — Personal Finance Tips for Smart Money Moves',
  description:
    'Discover actionable personal finance tips, smart budgeting strategies, beginner investing guides, debt management advice, and profitable side hustle ideas. Your daily finance magazine by Marine Lafitte.',
};

/* ---------- sample data ---------- */

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  category: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  readingTime: number;
}

const FEATURED_POST: Post = {
  slug: 'the-ultimate-guide-to-building-an-emergency-fund',
  title: 'The Ultimate Guide to Building an Emergency Fund in 2026',
  excerpt:
    'An emergency fund is the cornerstone of financial security. Learn exactly how much to save, where to keep your money, and the step-by-step strategy that helped thousands of readers build a 6-month safety net — even on a tight budget.',
  coverImage:
    'http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg',
  coverImageAlt:
    'Financial consultant Marine Lafitte smiling in a modern office setting',
  category: 'Smart Budgeting and Saving',
  categorySlug: 'smart-budgeting-and-saving',
  author: 'Marine Lafitte',
  publishedAt: '2026-03-10',
  readingTime: 9,
};

const LATEST_POSTS: Post[] = [
  {
    slug: 'how-to-start-investing-with-50-a-month',
    title: 'How to Start Investing With Just $50 a Month',
    excerpt:
      'You don\u2019t need thousands to begin investing. This step-by-step guide shows you how to build a diversified portfolio with low-cost index funds and a robo-advisor starting at $50 per month.',
    coverImage:
      'http://img.b2bpic.net/free-photo/paper-texture_1194-5999.jpg',
    coverImageAlt: 'Clean paper texture representing a fresh start in investing',
    category: 'Beginner Investing Tips',
    categorySlug: 'beginner-investing-tips',
    author: 'Marine Lafitte',
    publishedAt: '2026-03-08',
    readingTime: 7,
  },
  {
    slug: 'debt-snowball-vs-debt-avalanche',
    title: 'Debt Snowball vs. Debt Avalanche: Which Payoff Strategy Wins?',
    excerpt:
      'Two proven debt payoff methods, one goal: financial freedom. We break down the psychology and math behind each strategy so you can choose the one that fits your life.',
    coverImage:
      'http://img.b2bpic.net/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg',
    coverImageAlt: 'Abstract concrete wall representing the strength of debt-free living',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    author: 'Marine Lafitte',
    publishedAt: '2026-03-05',
    readingTime: 8,
  },
  {
    slug: '15-profitable-side-hustles-you-can-start-this-weekend',
    title: '15 Profitable Side Hustles You Can Start This Weekend',
    excerpt:
      'Looking to boost your income? From freelancing and print-on-demand to content creation and virtual bookkeeping, here are 15 side hustles that real people use to earn an extra $500–$3,000 per month.',
    coverImage:
      'http://img.b2bpic.net/premium-photo/happy-business-man-arms-crossed-portrait-corporate-board-room-with-professional-worker-success-company-african-male-manager-office-workplace-with-smile-startup-vision_590464-201371.jpg',
    coverImageAlt: 'Confident professional representing side hustle success',
    category: 'Side Hustles and Income Growth',
    categorySlug: 'side-hustles-and-income-growth',
    author: 'Marine Lafitte',
    publishedAt: '2026-03-02',
    readingTime: 10,
  },
  {
    slug: 'the-50-30-20-budget-rule-explained',
    title: 'The 50/30/20 Budget Rule Explained: A Simple Framework That Works',
    excerpt:
      'The 50/30/20 rule divides your after-tax income into three buckets: needs, wants, and savings. Discover how to adapt this timeless framework to your unique financial situation.',
    coverImage:
      'http://img.b2bpic.net/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg',
    coverImageAlt: 'Textured surface symbolizing a solid budgeting foundation',
    category: 'Smart Budgeting and Saving',
    categorySlug: 'smart-budgeting-and-saving',
    author: 'Marine Lafitte',
    publishedAt: '2026-02-28',
    readingTime: 6,
  },
  {
    slug: 'financial-wellness-healthy-relationship-with-money',
    title: 'Financial Wellness: How to Build a Healthy Relationship With Money',
    excerpt:
      'Financial wellness goes beyond spreadsheets. Learn to overcome money anxiety, align spending with your values, and build habits that support both your bank account and your peace of mind.',
    coverImage:
      'http://img.b2bpic.net/free-photo/paper-texture_1194-5999.jpg',
    coverImageAlt: 'Calm paper texture representing financial peace of mind',
    category: 'Financial Wellness',
    categorySlug: 'financial-wellness',
    author: 'Marine Lafitte',
    publishedAt: '2026-02-25',
    readingTime: 7,
  },
  {
    slug: 'compound-interest-your-most-powerful-wealth-tool',
    title: 'Compound Interest: Your Most Powerful Wealth-Building Tool',
    excerpt:
      'Albert Einstein reportedly called compound interest the eighth wonder of the world. Here\u2019s how it works, why starting early matters, and a simple calculator to see your money grow.',
    coverImage:
      'http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg',
    coverImageAlt: 'Professional woman discussing compound interest strategies',
    category: 'Beginner Investing Tips',
    categorySlug: 'beginner-investing-tips',
    author: 'Marine Lafitte',
    publishedAt: '2026-02-22',
    readingTime: 8,
  },
];

const CATEGORIES = [
  { name: 'All Topics', slug: 'all', icon: '' },
  { name: 'Budgeting & Saving', slug: 'smart-budgeting-and-saving', icon: '' },
  { name: 'Investing Tips', slug: 'beginner-investing-tips', icon: '' },
  { name: 'Debt Management', slug: 'debt-management', icon: '' },
  { name: 'Side Hustles', slug: 'side-hustles-and-income-growth', icon: '' },
  { name: 'Financial Wellness', slug: 'financial-wellness', icon: '' },
];

/* ---------- helper ---------- */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ---------- page component ---------- */

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Featured Article
          ============================================================ */}
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
                href={`/category/${FEATURED_POST.categorySlug}`}
                className="inline-block mb-5 text-xs font-sans font-bold uppercase tracking-[0.15em] text-accent/90 hover:text-white transition-colors duration-200"
              >
                {FEATURED_POST.category}
              </Link>

              <h1 className="text-3xl sm:text-4xl md:text-display-sm lg:text-display-md font-bold text-white mb-6 leading-tight text-balance">
                {FEATURED_POST.title}
              </h1>

              <p className="text-base sm:text-lg text-blue-100/80 mb-8 leading-relaxed max-w-xl">
                {FEATURED_POST.excerpt}
              </p>

              {/* Author row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold font-sans text-sm shadow-lg">
                  ML
                </div>
                <div>
                  <p className="text-sm font-sans font-semibold text-white">
                    {FEATURED_POST.author}
                  </p>
                  <p className="text-xs font-sans text-blue-200/70">
                    {formatDate(FEATURED_POST.publishedAt)} · {FEATURED_POST.readingTime} min read
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/blog/${FEATURED_POST.slug}`}
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
              <Link href={`/blog/${FEATURED_POST.slug}`} className="block group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={FEATURED_POST.coverImage}
                    alt={FEATURED_POST.coverImageAlt}
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
                    <span className="text-xs font-sans font-semibold">{FEATURED_POST.readingTime} min</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================================
          CATEGORY TABS
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <nav
          aria-label="Article categories"
          className="bg-white rounded-2xl shadow-soft-lg border border-primary/10 p-2 flex items-center gap-1.5 overflow-x-auto scrollbar-hide"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/blog' : `/category/${cat.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-medium text-foreground/65 hover:text-primary hover:bg-primary/[0.05] transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              <span className="text-base" aria-hidden="true">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* ============================================================
          LATEST ARTICLES GRID
          ============================================================ */}
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
          {LATEST_POSTS.map((post, index) => (
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
                category={post.category}
                categorySlug={post.categorySlug}
                author={post.author}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/blog"
            className="btn-secondary"
          >
            View All Articles
          </Link>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER CTA
          ============================================================ */}
      <NewsletterCTA />

      {/* ============================================================
          EXPLORE BY TOPIC
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
            Explore
          </span>
          <h2 className="text-display-sm sm:text-display-md font-bold text-foreground mb-4">
            Dive Into a Topic
          </h2>
          <p className="text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re just starting your financial journey or looking to level up, we&apos;ve got expert-driven content tailored to your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Smart Budgeting and Saving',
              slug: 'smart-budgeting-and-saving',
              icon: '',
              color: 'from-emerald-500/10 to-emerald-500/[0.02]',
              borderColor: 'hover:border-emerald-300/40',
              description: 'Master the art of budgeting with frameworks like the 50/30/20 rule, automate your savings, and build an unshakeable financial foundation.',
              articleCount: 24,
            },
            {
              name: 'Beginner Investing Tips',
              slug: 'beginner-investing-tips',
              icon: '',
              color: 'from-blue-500/10 to-blue-500/[0.02]',
              borderColor: 'hover:border-blue-300/40',
              description: 'Start investing with confidence. From index funds and ETFs to retirement accounts, learn how to grow your money even with small amounts.',
              articleCount: 18,
            },
            {
              name: 'Debt Management',
              slug: 'debt-management',
              icon: '',
              color: 'from-amber-500/10 to-amber-500/[0.02]',
              borderColor: 'hover:border-amber-300/40',
              description: 'Take control of debt with proven payoff strategies, refinancing guides, and the motivation you need to reach financial freedom.',
              articleCount: 15,
            },
            {
              name: 'Side Hustles and Income Growth',
              slug: 'side-hustles-and-income-growth',
              icon: '',
              color: 'from-violet-500/10 to-violet-500/[0.02]',
              borderColor: 'hover:border-violet-300/40',
              description: 'Discover profitable side hustles, freelance tips, and creative ways to earn more money alongside your 9-to-5 career.',
              articleCount: 21,
            },
            {
              name: 'Financial Wellness',
              slug: 'financial-wellness',
              icon: '',
              color: 'from-rose-500/10 to-rose-500/[0.02]',
              borderColor: 'hover:border-rose-300/40',
              description: 'Achieve balance between money goals and mental well-being. Overcome anxiety, build healthy habits, and align spending with your values.',
              articleCount: 12,
            },
          ].map((topic) => (
            <Link
              key={topic.slug}
              href={`/category/${topic.slug}`}
              className={`group relative bg-gradient-to-b ${topic.color} rounded-2xl p-7 border border-primary/10 ${topic.borderColor} hover:shadow-soft-lg transition-all duration-300`}
            >
              <span className="text-4xl mb-5 block" aria-hidden="true">{topic.icon}</span>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {topic.name}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                {topic.description}
              </p>
              <span className="text-xs font-sans font-semibold text-primary/70">
                {topic.articleCount} articles
              </span>
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          ABOUT THE AUTHOR — Homepage section
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

/* ------------------------------------------------------------------ */
/*  Newsletter CTA — client component inlined for interactivity        */
/* ------------------------------------------------------------------ */
import NewsletterCTA from '@/components/NewsletterCTA';
