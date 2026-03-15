"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

const categories = [
  { slug: 'smart-budgeting-and-saving', label: 'Budgeting & Saving' },
  { slug: 'beginner-investing-tips', label: 'Investing Tips' },
  { slug: 'debt-management', label: 'Debt Management' },
  { slug: 'side-hustles-and-income-growth', label: 'Side Hustles' },
  { slug: 'financial-wellness', label: 'Financial Wellness' },
];

const CategoryFilter: FC = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Category filters" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`text-sm font-sans font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
          pathname === '/blog'
            ? 'bg-primary text-white border-primary shadow-md'
            : 'bg-white text-foreground/70 border-primary/15 hover:border-primary/30 hover:text-primary'
        }`}
      >
        All Posts
      </Link>
      {categories.map((cat) => {
        const isActive = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`text-sm font-sans font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white text-foreground/70 border-primary/15 hover:border-primary/30 hover:text-primary'
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryFilter;
