"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import type { FC } from 'react';

interface SerializedPost {
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
  categories: string[];
}

interface CategoryInfo {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

interface BlogListingClientProps {
  posts: SerializedPost[];
  categories: CategoryInfo[];
}

const POSTS_PER_PAGE = 9;

const BlogListingClient: FC<BlogListingClientProps> = ({ posts, categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* ---- Filtered posts ---- */
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categories.includes(activeCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* ---- Search Bar ---- */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id="blog-search"
            type="search"
            placeholder="Search articles on budgeting, investing, debt, side hustles…"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-primary/15 bg-white text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-sans text-sm shadow-soft transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center text-foreground/50 transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ---- Category Filters ---- */}
      <nav aria-label="Category filters" className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans font-medium border transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-primary text-white border-primary shadow-soft'
                : 'bg-white text-foreground/65 border-primary/15 hover:border-primary/30 hover:text-primary'
            }`}
          >
            <span aria-hidden="true">✦</span>
            All Topics
            <span className="ml-1 text-[11px] opacity-60">({posts.length})</span>
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.categories.includes(cat.slug)).length;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans font-medium border transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? 'bg-primary text-white border-primary shadow-soft'
                    : 'bg-white text-foreground/65 border-primary/15 hover:border-primary/30 hover:text-primary'
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.name}
                <span className="ml-1 text-[11px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ---- Results Info ---- */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm font-sans text-foreground/50">
          {filteredPosts.length === 0
            ? 'No articles found'
            : `Showing ${(currentPage - 1) * POSTS_PER_PAGE + 1}–${Math.min(
                currentPage * POSTS_PER_PAGE,
                filteredPosts.length
              )} of ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`}
        </p>
        {activeCategory !== 'all' && (
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className="text-sm font-sans font-medium text-secondary hover:text-primary transition-colors duration-200"
          >
            Clear filter ×
          </button>
        )}
      </div>

      {/* ---- Posts Grid ---- */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {paginatedPosts.map((post, index) => (
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
                category={post.category}
                categorySlug={post.categorySlug}
                author={post.author}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-5" aria-hidden="true">🔍</p>
          <h2 className="text-2xl font-bold text-foreground mb-3">No Articles Found</h2>
          <p className="text-foreground/55 mb-6 max-w-md mx-auto">
            {searchQuery
              ? `We couldn't find any articles matching "${searchQuery}". Try a different search term or browse by category.`
              : 'No articles in this category yet. Check back soon for new content!'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setCurrentPage(1);
            }}
            className="btn-primary text-sm"
          >
            View All Articles
          </button>
        </div>
      )}

      {/* ---- Pagination ---- */}
      {totalPages > 1 && (
        <nav aria-label="Blog pagination" className="mt-14 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border border-primary/15 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl text-sm font-sans font-semibold transition-all duration-200 ${
                page === currentPage
                  ? 'bg-primary text-white shadow-soft'
                  : 'border border-primary/15 text-foreground/60 hover:text-primary hover:border-primary/30'
              }`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl border border-primary/15 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </nav>
      )}
    </section>
  );
};

export default BlogListingClient;
