import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const PostCard: FC<PostCardProps> = ({
  slug,
  title,
  excerpt,
  coverImage,
  coverImageAlt,
  category,
  categorySlug,
  author,
  publishedAt,
  readingTime,
}) => {
  return (
    <article className="card group h-full flex flex-col">
      <Link href={`/blog/${slug}`} className="block flex-1 flex flex-col">
        {/* Image */}
        <div className="relative aspect-card overflow-hidden">
          <Image
            src={coverImage}
            alt={coverImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Reading time badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
            <svg
              className="w-3 h-3 text-foreground/50"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-sans font-semibold">{readingTime} min</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {/* Category badge */}
          <div className="mb-3">
            <span className="badge badge-primary text-[11px]">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-foreground/60 leading-relaxed mb-5 line-clamp-3 flex-1">
            {excerpt}
          </p>

          {/* Author & Date Row */}
          <div className="flex items-center justify-between pt-4 border-t border-primary/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold font-sans text-[10px] flex-shrink-0 shadow-sm">
                ML
              </div>
              <div className="min-w-0">
                <p className="text-xs font-sans font-semibold text-foreground truncate">{author}</p>
                <p className="text-[11px] font-sans text-foreground/45">{formatDate(publishedAt)}</p>
              </div>
            </div>

            {/* Read More Arrow */}
            <div className="w-8 h-8 rounded-full bg-primary/[0.06] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 flex-shrink-0">
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
