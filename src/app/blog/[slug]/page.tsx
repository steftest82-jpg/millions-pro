import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  formatCategoryName,
} from '@/lib/keystatic';
import AuthorCard from '@/components/AuthorCard';
import PostCard from '@/components/PostCard';
import TableOfContents from '@/components/TableOfContents';
import KeyTakeaways from '@/components/KeyTakeaways';
import ShareButtons from '@/components/ShareButtons';
import ArticleContent from '@/components/ArticleContent';

interface PageProps {
  params: { slug: string };
}

/* ---- Static Params ---- */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/* ---- Metadata ---- */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.focusKeyword,
      ...post.categories.map((c) => formatCategoryName(c)),
    ].filter(Boolean),
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

/* ---- Page Component ---- */
export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.categories, 3);

  /* JSON-LD Structured Data */
  const plainText = post.content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const isHowTo = post.title.toLowerCase().startsWith('how to');

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isHowTo ? ['BlogPosting', 'HowTo'] : 'BlogPosting',
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://www.millionspro.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Millions Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.millionspro.com/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.millionspro.com/blog/${post.slug}`,
    },
    wordCount,
    timeRequired: `PT${post.readingTime}M`,
    keywords: [post.focusKeyword, ...post.categories.map((c) => formatCategoryName(c))].join(', '),
    isPartOf: { '@id': 'https://www.millionspro.com/#website' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.key-takeaways', 'h2'],
    },
    ...(post.keyTakeaways.length > 0 && {
      abstract: post.keyTakeaways.join(' '),
    }),
    ...(isHowTo && post.tableOfContents.length > 0 && {
      step: post.tableOfContents
        .filter((toc) => toc.heading.toLowerCase() !== 'frequently asked questions')
        .map((toc, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: toc.heading,
          url: `https://www.millionspro.com/blog/${post.slug}#${toc.anchor}`,
        })),
    }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.millionspro.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.millionspro.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.millionspro.com/blog/${post.slug}` },
    ],
  };

  /* FAQPage schema — extract Q&A pairs from article FAQ section */
  const faqRegex = /<h3[^>]*>(.*?)<\/h3>\s*([\s\S]*?)(?=<h3|<h2|$)/gi;
  const faqContent = post.content.match(/<h2[^>]*>.*?frequently asked questions.*?<\/h2>([\s\S]*)$/i)?.[1] || '';
  const faqItems: { question: string; answer: string }[] = [];
  let faqMatch;
  while ((faqMatch = faqRegex.exec(faqContent)) !== null) {
    const question = faqMatch[1].replace(/<[^>]*>/g, '').trim();
    const answer = faqMatch[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  const faqLd = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <article>
        {/* ============================================================
            ARTICLE HEADER
            ============================================================ */}
        <header className="bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/12 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 md:py-22">
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
                <li className="text-blue-200/80 truncate max-w-[200px]" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat}`}
                  className="inline-flex items-center text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-accent/90 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 transition-all duration-200"
                >
                  {formatCategoryName(cat)}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-display-sm lg:text-display-md font-bold text-white mb-6 leading-tight text-balance">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-blue-100/75 mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author + Meta */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold font-sans text-sm shadow-lg">
                  ML
                </div>
                <div>
                  <Link href="/about" className="text-sm font-sans font-semibold text-white hover:text-accent transition-colors duration-200">
                    {post.author}
                  </Link>
                  <p className="text-xs font-sans text-blue-200/60">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-white/15" aria-hidden="true" />

              <div className="flex items-center gap-4 text-xs font-sans text-blue-200/60">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} min read
                </span>
                {post.focusKeyword && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    {post.focusKeyword}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </header>

        {/* ============================================================
            COVER IMAGE
            ============================================================ */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="relative aspect-hero rounded-2xl overflow-hidden shadow-soft-xl ring-1 ring-primary/10">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
            />
          </div>
        </div>

        {/* ============================================================
            ARTICLE BODY + SIDEBAR
            ============================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* ---- Sidebar (Left on Desktop) ---- */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                {post.tableOfContents.length > 0 && (
                  <TableOfContents items={post.tableOfContents} />
                )}
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </aside>

            {/* ---- Main Content ---- */}
            <div className="lg:col-span-9 min-w-0">
              {/* Mobile ToC */}
              {post.tableOfContents.length > 0 && (
                <div className="lg:hidden mb-8">
                  <TableOfContents items={post.tableOfContents} />
                </div>
              )}

              {/* Key Takeaways */}
              {post.keyTakeaways.length > 0 && (
                <KeyTakeaways items={post.keyTakeaways} />
              )}

              {/* Article HTML Content */}
              <ArticleContent content={post.content} />

              {/* Mobile Share Buttons */}
              <div className="lg:hidden mt-10">
                <ShareButtons title={post.title} slug={post.slug} />
              </div>

              {/* Author Bio */}
              <div className="mt-14 pt-10 border-t border-primary/10">
                <AuthorCard variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ============================================================
          RELATED POSTS
          ============================================================ */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-primary/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                  Keep Reading
                </span>
                <h2 className="text-display-sm font-bold text-foreground">Related Articles</h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-secondary hover:text-primary transition-colors duration-200 group"
              >
                All Articles
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedPosts.map((rp) => {
                const catName = rp.categories[0] ? formatCategoryName(rp.categories[0]) : 'Uncategorized';
                return (
                  <PostCard
                    key={rp.slug}
                    slug={rp.slug}
                    title={rp.title}
                    excerpt={rp.excerpt}
                    coverImage={rp.coverImage}
                    coverImageAlt={rp.coverImageAlt}
                    category={catName}
                    categorySlug={rp.categories[0] || ''}
                    author={rp.author}
                    publishedAt={rp.publishedAt}
                    readingTime={rp.readingTime}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
