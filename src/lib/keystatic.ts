import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/* =================================================================
   TYPE DEFINITIONS
   ================================================================= */

export interface TableOfContentsItem {
  heading: string;
  anchor: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  focusKeyword: string;
  categories: string[];
  readingTime: number;
  tableOfContents: TableOfContentsItem[];
  keyTakeaways: string[];
}

export interface Post extends PostFrontmatter {
  content: string;
}

/* =================================================================
   CONSTANTS
   ================================================================= */

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

export const ALL_CATEGORIES: { slug: string; name: string; icon: string; description: string }[] = [
  {
    slug: 'smart-budgeting-and-saving',
    name: 'Smart Budgeting and Saving',
    icon: '',
    description: 'Master the art of budgeting with proven frameworks, automate your savings, and build an unshakeable financial foundation for lasting wealth.',
  },
  {
    slug: 'beginner-investing-tips',
    name: 'Beginner Investing Tips',
    icon: '',
    description: 'Start investing with confidence. From index funds and ETFs to retirement accounts, learn how to grow your money even with small amounts.',
  },
  {
    slug: 'debt-management',
    name: 'Debt Management',
    icon: '',
    description: 'Take control of debt with proven payoff strategies like the snowball and avalanche methods, refinancing guides, and expert financial advice.',
  },
  {
    slug: 'side-hustles-and-income-growth',
    name: 'Side Hustles and Income Growth',
    icon: '',
    description: 'Discover profitable side hustles, freelance tips, and creative ways to earn more money alongside your 9-to-5 career.',
  },
  {
    slug: 'financial-wellness',
    name: 'Financial Wellness',
    icon: '',
    description: 'Achieve balance between money goals and mental well-being. Overcome anxiety, build healthy habits, and align spending with your values.',
  },
];

/* =================================================================
   HELPERS
   ================================================================= */

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 230;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function parseTableOfContents(raw: unknown): TableOfContentsItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is { heading: string; anchor: string } =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Record<string, unknown>).heading === 'string' &&
        typeof (item as Record<string, unknown>).anchor === 'string'
    )
    .map((item) => ({ heading: item.heading, anchor: item.anchor }));
}

function parseStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is string => typeof item === 'string');
}

/* =================================================================
   DATA FETCHING
   ================================================================= */

/**
 * Read all MDX posts from the content/posts directory.
 * Falls back to an empty array if the directory doesn't exist.
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));

    const posts: Post[] = files
      .map((filename) => {
        const filePath = path.join(CONTENT_DIR, filename);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);

        const slug =
          (data.slug as string) || filename.replace(/\.mdx$/, '');

        const post: Post = {
          title: (data.title as string) || slug,
          slug,
          publishedAt: (data.publishedAt as string) || '2026-01-01',
          updatedAt: (data.updatedAt as string) || (data.publishedAt as string) || '2026-01-01',
          excerpt: (data.excerpt as string) || '',
          coverImage: (data.coverImage as string) || 'https://picsum.photos/seed/default/1200/630',
          coverImageAlt: (data.coverImageAlt as string) || (data.title as string) || 'Blog post cover image',
          author: (data.author as string) || 'Marine Lafitte',
          focusKeyword: (data.focusKeyword as string) || '',
          categories: parseStringArray(data.categories),
          readingTime: (data.readingTime as number) || estimateReadingTime(content),
          tableOfContents: parseTableOfContents(data.tableOfContents),
          keyTakeaways: parseStringArray(data.keyTakeaways),
          content,
        };

        return post;
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

/**
 * Get a single post by slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get posts filtered by category slug.
 */
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.categories.includes(categorySlug));
}

/**
 * Get related posts — same category, different slug.
 */
export async function getRelatedPosts(
  currentSlug: string,
  categories: string[],
  limit: number = 3
): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.categories.some((c) => categories.includes(c))
    )
    .slice(0, limit);
}

/**
 * Get category metadata by slug.
 */
export function getCategoryBySlug(slug: string) {
  return ALL_CATEGORIES.find((c) => c.slug === slug) || null;
}

/**
 * Format a date string for display.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format category slug to readable name.
 */
export function formatCategoryName(slug: string): string {
  const cat = getCategoryBySlug(slug);
  if (cat) return cat.name;
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
