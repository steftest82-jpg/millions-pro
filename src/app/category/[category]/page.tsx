import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostsByCategory,
  getCategoryBySlug,
  ALL_CATEGORIES,
  formatCategoryName,
} from '@/lib/keystatic';
import PostCard from '@/components/PostCard';

interface PageProps {
  params: { category: string };
}

/* ---- Static Params ---- */
export async function generateStaticParams() {
  return ALL_CATEGORIES.map((c) => ({ category: c.slug }));
}

/* ---- Metadata ---- */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    return { title: 'Category Not Found | Millions Pro' };
  }

  return {
    title: `${category.name} — Expert Personal Finance Tips`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Millions Pro`,
      description: category.description,
    },
  };
}

/* ---- Page Component ---- */
export default async function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(params.category);

  return (
    <>
      {/* ============================================================
          CATEGORY HEADER
          ============================================================ */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-sans text-blue-200/60">
              <li>
                <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors duration-200">Blog</Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </li>
              <li className="text-blue-200/80" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="text-5xl mb-5 block" aria-hidden="true">{category.icon}</span>
            <h1 className="text-display-sm sm:text-display-md font-bold text-white mb-5 leading-tight">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg text-blue-100/75 max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
            <p className="mt-4 text-sm font-sans text-blue-200/50">
              {posts.length} article{posts.length !== 1 ? 's' : ''} published
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================================
          CATEGORY NAVIGATION
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-10 mb-12">
        <nav
          aria-label="Browse categories"
          className="bg-white rounded-2xl shadow-soft-lg border border-primary/10 p-2 flex items-center gap-1.5 overflow-x-auto scrollbar-hide"
        >
          <Link
            href="/blog"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans font-medium text-foreground/55 hover:text-primary hover:bg-primary/[0.04] transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            <span aria-hidden="true">✦</span>
            All Topics
          </Link>
          {ALL_CATEGORIES.map((cat) => {
            const isActive = cat.slug === params.category;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-foreground/55 hover:text-primary hover:bg-primary/[0.04]'
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.name}
              </Link>
            );
          })}
        </nav>
      </section>

      {/* ============================================================
          POSTS GRID
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
              >
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
                  coverImageAlt={post.coverImageAlt}
                  category={category.name}
                  categorySlug={category.slug}
                  author={post.author}
                  publishedAt={post.publishedAt}
                  readingTime={post.readingTime}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-5 block" aria-hidden="true">{category.icon}</span>
            <h2 className="text-2xl font-bold text-foreground mb-3">No Articles Yet</h2>
            <p className="text-foreground/55 mb-6 max-w-md mx-auto">
              We&apos;re preparing expert content for {category.name}. Check back soon or browse other topics.
            </p>
            <Link href="/blog" className="btn-primary text-sm">
              Browse All Articles
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
