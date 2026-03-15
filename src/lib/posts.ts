import fs from 'fs';
import path from 'path';

export interface PostFrontmatter {
  title: string;
  slug: string;
  publishedAt: string;
  author: string;
  focusKeyword: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  categories: string[];
  keyTakeaways: string[];
  tableOfContents: { label: string; anchor: string }[];
  contentHtml?: React.ReactNode;
  content?: string;
}

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

const SAMPLE_POSTS: PostFrontmatter[] = [
  {
    title: '10 Personal Finance Tips Every Millennial Should Know in 2024',
    slug: '10-personal-finance-tips-every-millennial-should-know',
    publishedAt: '2024-11-15',
    author: 'Marine Lafitte',
    focusKeyword: 'personal finance tips',
    excerpt: 'From automating your savings to understanding compound interest, these ten personal finance tips will transform how you manage money and build lasting wealth.',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop',
    coverImageAlt: 'Abstract texture representing solid financial foundation',
    categories: ['smart-budgeting-and-saving', 'financial-wellness'],
    keyTakeaways: [
      'Automate your savings to build wealth without thinking about it',
      'Start investing early — even small amounts compound over time',
      'Build a 3-6 month emergency fund before aggressive investing',
      'Track every dollar using the 50/30/20 budgeting rule',
      'Review and optimize your subscriptions quarterly',
    ],
    tableOfContents: [
      { label: 'Why Personal Finance Matters Now', anchor: 'why-personal-finance-matters' },
      { label: 'Automate Your Savings First', anchor: 'automate-savings' },
      { label: 'The 50/30/20 Rule Explained', anchor: 'budgeting-rule' },
      { label: 'Start Investing With $100', anchor: 'start-investing' },
      { label: 'Build Your Emergency Fund', anchor: 'emergency-fund' },
    ],
  },
  {
    title: 'How to Start Investing With Just $50 a Month',
    slug: 'how-to-start-investing-with-50-dollars-a-month',
    publishedAt: '2024-11-10',
    author: 'Marine Lafitte',
    focusKeyword: 'beginner investing',
    excerpt: 'You do not need thousands to start investing. This step-by-step guide shows you how to begin building a portfolio with as little as $50 per month using low-cost index funds and robo-advisors.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    coverImageAlt: 'Clean paper texture representing a fresh start in investing',
    categories: ['beginner-investing-tips'],
    keyTakeaways: [
      'You can start investing with as little as $50 per month',
      'Index funds offer diversification at minimal cost',
      'Robo-advisors automate portfolio management for beginners',
      'Consistent monthly investing beats timing the market',
      'Tax-advantaged accounts maximize your returns',
    ],
    tableOfContents: [
      { label: 'Breaking the Investing Myth', anchor: 'breaking-the-myth' },
      { label: 'Choosing Your First Account', anchor: 'choosing-account' },
      { label: 'Index Funds vs. Individual Stocks', anchor: 'index-vs-stocks' },
      { label: 'Setting Up Automatic Investments', anchor: 'automatic-investments' },
    ],
  },
  {
    title: 'The Debt Snowball Method: A Step-by-Step Payoff Plan',
    slug: 'debt-snowball-method-step-by-step-payoff-plan',
    publishedAt: '2024-11-05',
    author: 'Marine Lafitte',
    focusKeyword: 'debt snowball method',
    excerpt: 'Learn how the debt snowball method can help you eliminate debt faster by focusing on quick wins and building unstoppable momentum toward financial freedom.',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop',
    coverImageAlt: 'Textured wall symbolizing building blocks of debt freedom',
    categories: ['debt-management'],
    keyTakeaways: [
      'List all debts from smallest to largest balance',
      'Make minimum payments on everything except the smallest debt',
      'Throw all extra money at the smallest debt first',
      'Roll each paid-off payment into the next debt',
      'The psychological wins keep you motivated to stay on track',
    ],
    tableOfContents: [
      { label: 'What Is the Debt Snowball?', anchor: 'what-is-debt-snowball' },
      { label: 'Step-by-Step Guide', anchor: 'step-by-step' },
      { label: 'Snowball vs. Avalanche', anchor: 'snowball-vs-avalanche' },
      { label: 'Staying Motivated', anchor: 'staying-motivated' },
    ],
  },
  {
    title: '15 Profitable Side Hustles You Can Start This Weekend',
    slug: '15-profitable-side-hustles-start-this-weekend',
    publishedAt: '2024-10-28',
    author: 'Marine Lafitte',
    focusKeyword: 'profitable side hustles',
    excerpt: 'Looking to boost your income? Here are 15 proven side hustles you can launch this weekend — from freelancing and e-commerce to content creation and consulting.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    coverImageAlt: 'Paper texture representing the blank canvas of new income opportunities',
    categories: ['side-hustles-and-income-growth'],
    keyTakeaways: [
      'Freelancing in your existing skills is the fastest path to extra income',
      'Digital products create passive income streams over time',
      'Start small and scale — do not over-invest upfront',
      'Consistency matters more than perfection when building a side hustle',
      'Track side hustle income separately for tax purposes',
    ],
    tableOfContents: [
      { label: 'Why Start a Side Hustle', anchor: 'why-side-hustle' },
      { label: 'Skill-Based Hustles', anchor: 'skill-based' },
      { label: 'Digital Product Ideas', anchor: 'digital-products' },
      { label: 'Service-Based Businesses', anchor: 'service-based' },
    ],
  },
  {
    title: 'Financial Wellness: How to Build a Healthy Relationship With Money',
    slug: 'financial-wellness-build-healthy-relationship-with-money',
    publishedAt: '2024-10-20',
    author: 'Marine Lafitte',
    focusKeyword: 'financial wellness',
    excerpt: 'Financial wellness is about more than numbers. Discover how to overcome money anxiety, develop healthy financial habits, and align your spending with your values.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    coverImageAlt: 'Confident professional representing financial empowerment',
    categories: ['financial-wellness'],
    keyTakeaways: [
      'Money anxiety is common — understanding it is the first step to overcoming it',
      'Align your spending with your values for greater satisfaction',
      'Practice regular money check-ins to stay on track',
      'Celebrate financial milestones, no matter how small',
      'Financial wellness encompasses physical, mental, and emotional health',
    ],
    tableOfContents: [
      { label: 'What Is Financial Wellness?', anchor: 'what-is-financial-wellness' },
      { label: 'Understanding Money Anxiety', anchor: 'money-anxiety' },
      { label: 'Building Healthy Habits', anchor: 'healthy-habits' },
      { label: 'Values-Based Spending', anchor: 'values-based-spending' },
    ],
  },
  {
    title: 'The Complete Guide to the 50/30/20 Budget Rule',
    slug: 'complete-guide-50-30-20-budget-rule',
    publishedAt: '2024-10-12',
    author: 'Marine Lafitte',
    focusKeyword: 'budgeting tips',
    excerpt: 'The 50/30/20 rule is one of the simplest budgeting frameworks. Learn how to divide your income into needs, wants, and savings for stress-free money management.',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop',
    coverImageAlt: 'Clean textured surface representing structured financial planning',
    categories: ['smart-budgeting-and-saving'],
    keyTakeaways: [
      '50% of after-tax income goes to needs like rent and groceries',
      '30% covers wants including dining out and entertainment',
      '20% goes directly to savings and debt repayment',
      'Customize the percentages to fit your life stage',
      'Review your budget monthly and adjust as needed',
    ],
    tableOfContents: [
      { label: 'How the 50/30/20 Rule Works', anchor: 'how-it-works' },
      { label: 'Categorizing Needs vs. Wants', anchor: 'needs-vs-wants' },
      { label: 'Maximizing Your 20%', anchor: 'maximize-savings' },
      { label: 'Common Mistakes to Avoid', anchor: 'common-mistakes' },
    ],
  },
];

export async function getAllPosts(): Promise<PostFrontmatter[]> {
  try {
    if (!fs.existsSync(POSTS_DIR)) {
      return SAMPLE_POSTS.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });
    const postDirs = entries.filter((e) => e.isDirectory());

    if (postDirs.length === 0) {
      return SAMPLE_POSTS.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    const posts: PostFrontmatter[] = [];

    for (const dir of postDirs) {
      const indexPath = path.join(POSTS_DIR, dir.name, 'index.yaml');
      const jsonPath = path.join(POSTS_DIR, dir.name, 'index.json');

      if (fs.existsSync(jsonPath)) {
        try {
          const raw = fs.readFileSync(jsonPath, 'utf-8');
          const data = JSON.parse(raw);
          posts.push({
            title: data.title || dir.name,
            slug: data.title?.slug || dir.name,
            publishedAt: data.publishedAt || '2024-01-01',
            author: data.author || 'Marine Lafitte',
            focusKeyword: data.focusKeyword || 'personal finance tips',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage || '',
            coverImageAlt: data.coverImageAlt || '',
            categories: data.categories || [],
            keyTakeaways: data.keyTakeaways || [],
            tableOfContents: data.tableOfContents || [],
          });
        } catch {
          // Skip invalid files
        }
      }
    }

    if (posts.length === 0) {
      return SAMPLE_POSTS.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return SAMPLE_POSTS.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
}

export async function getPostBySlug(slug: string): Promise<PostFrontmatter | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
