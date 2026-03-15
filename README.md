# Millions Pro — Your Daily Finance Magazine for Smart Money Moves

> A modern personal finance blog built with Next.js 14, TypeScript, Tailwind CSS 3, and Keystatic CMS.

![Millions Pro](http://img.b2bpic.net/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg)

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values:
#   SITE_URL=https://millionspro.com
#   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  (optional)

# 3. Start development server
npm run dev

# 4. Open in browser
#    Site:  http://localhost:3000
#    CMS:   http://localhost:3000/keystatic
```

## 📁 Project Structure

```
millions-pro/
├── keystatic.config.ts          # Keystatic CMS configuration
├── next.config.mjs              # Next.js config with MDX support
├── tailwind.config.ts           # Tailwind CSS with brand palette
├── next-sitemap.config.js       # Sitemap & robots.txt generation
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with metadata & GA
│   │   ├── page.tsx             # Homepage with hero, posts, CTA
│   │   ├── globals.css          # Global styles & prose typography
│   │   ├── blog/
│   │   │   └── page.tsx         # Blog listing page
│   │   ├── blog/[slug]/
│   │   │   └── page.tsx         # Individual blog post page
│   │   ├── category/[slug]/
│   │   │   └── page.tsx         # Category filtered listing
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── contact/
│   │   │   └── page.tsx         # Contact page
│   │   ├── api/
│   │   │   ├── keystatic/       # Keystatic CMS API routes
│   │   │   └── rss/             # RSS feed endpoint
│   │   └── keystatic/           # Keystatic admin UI
│   ├── components/
│   │   ├── Header.tsx           # Site header with nav & search
│   │   ├── Footer.tsx           # Site footer with newsletter
│   │   ├── PostCard.tsx         # Blog post card component
│   │   ├── AuthorCard.tsx       # Author bio (compact & full)
│   │   └── NewsletterCTA.tsx    # Newsletter signup section
│   ├── content/
│   │   ├── posts/               # Keystatic blog posts (MDX)
│   │   └── site-settings/       # Keystatic site settings
│   └── lib/
│       └── posts.ts             # Post data fetching utilities
└── public/                      # Static assets
```

## 🎨 Design System

### Color Palette
| Token     | Hex       | Usage                          |
|-----------|-----------|--------------------------------|
| Primary   | `#0EA5E9` | CTAs, links, interactive       |
| Secondary | `#0284C7` | Hover states, supporting       |
| Accent    | `#38BDF8` | Highlights, badges             |
| Background| `#F0F9FF` | Page background                |
| Foreground| `#0C4A6E` | Body text, headings            |

### Typography
- **Headings**: Georgia (classic serif)
- **Body**: Georgia (classic serif)
- **UI elements**: system-ui (sans-serif)

## ✍️ Content Management

Visit `/keystatic` to access the CMS dashboard. You can:

- **Create & edit blog posts** with rich MDX content
- **Set frontmatter**: title, excerpt, cover image, categories, reading time, key takeaways, table of contents
- **Manage site settings**: blog name, tagline, contact email

### Blog Categories
1. Smart Budgeting and Saving
2. Beginner Investing Tips
3. Debt Management
4. Side Hustles and Income Growth
5. Financial Wellness

## 📡 Features

- **SEO Optimized**: Full metadata, Open Graph, Twitter Cards, JSON-LD structured data
- **RSS Feed**: Auto-generated at `/api/rss`
- **Sitemap**: Auto-generated via `next-sitemap` after build
- **Accessibility**: WCAG 2.1 AA compliant with skip-to-content, aria labels, focus states, keyboard navigation
- **Performance**: Next.js Image optimization, lazy loading, minimal JS
- **Responsive**: Mobile-first design with sm/md/lg/xl breakpoints
- **Google Analytics**: Placeholder ready — set `NEXT_PUBLIC_GA_ID`

## 📦 Tech Stack

| Technology       | Purpose                        |
|------------------|--------------------------------|
| Next.js 14       | React framework (App Router)   |
| TypeScript       | Type safety                    |
| Tailwind CSS 3   | Utility-first styling          |
| Keystatic        | Git-based CMS                  |
| MDX              | Rich content with components   |
| next-sitemap     | SEO sitemap generation         |
| rss              | RSS feed generation            |

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Set environment variables:
   - `SITE_URL` = your production domain
   - `NEXT_PUBLIC_GA_ID` = your Google Analytics ID (optional)
4. Deploy!

### Build Locally
```bash
npm run build    # Builds the site + generates sitemap
npm run start    # Starts production server
```

## 📝 Environment Variables

| Variable              | Required | Description                    |
|-----------------------|----------|--------------------------------|
| `SITE_URL`            | Yes      | Production URL for SEO         |
| `NEXT_PUBLIC_GA_ID`   | No       | Google Analytics Measurement ID|
| `NEXT_PUBLIC_SITE_URL`| No       | Client-side site URL           |

## 📄 License

© Millions Pro. All rights reserved.

---

Built with ❤️ by Marine Lafitte for the Millions Pro community.
