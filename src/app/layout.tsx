import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://millionspro.com'),
  title: {
    default: 'Millions Pro — Your Daily Finance Magazine for Smart Money Moves',
    template: '%s | Millions Pro',
  },
  description:
    'Millions Pro is your trusted source for personal finance tips, smart budgeting strategies, beginner investing guides, debt management advice, and side hustle ideas to help everyday professionals build lasting wealth.',
  keywords: [
    'personal finance tips',
    'budgeting strategies',
    'investing for beginners',
    'debt management',
    'side hustles',
    'financial wellness',
    'money management',
    'build wealth',
    'passive income',
    'financial independence',
  ],
  authors: [{ name: 'Marine Lafitte', url: 'https://millionspro.com/about' }],
  creator: 'Marine Lafitte',
  publisher: 'Millions Pro',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Millions Pro',
    title: 'Millions Pro — Your Daily Finance Magazine for Smart Money Moves',
    description:
      'Practical personal finance tips for everyday professionals. Smart budgeting, investing, debt management, and income growth strategies by Marine Lafitte.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Millions Pro — Personal Finance Magazine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Millions Pro — Smart Money Moves',
    description:
      'Your Daily Finance Magazine. Practical budgeting, investing, and wealth-building tips for everyday professionals.',
    images: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics Placeholder — replace GA_MEASUREMENT_ID with your real ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* Preconnect to image host */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* RSS Autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Millions Pro RSS Feed"
          href="/api/rss"
        />
        {/* JSON-LD Organization + WebSite schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.millionspro.com/#organization',
                  name: 'Millions Pro',
                  url: 'https://www.millionspro.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.millionspro.com/icon.png',
                  },
                  sameAs: [],
                  description: 'Your Daily Finance Magazine for Smart Money Moves. Practical personal finance tips, investing guides, and wealth-building strategies.',
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.millionspro.com/#website',
                  url: 'https://www.millionspro.com',
                  name: 'Millions Pro',
                  publisher: { '@id': 'https://www.millionspro.com/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://www.millionspro.com/blog?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-serif antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Dynamic import of Header and Footer keeps them in the layout */}
        {/* Header */}
        <HeaderWrapper />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <FooterWrapper />
      </body>
    </html>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline Server Component wrappers so we don't need "use client"     */
/*  on the layout itself.                                              */
/* ------------------------------------------------------------------ */
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function HeaderWrapper() {
  return <Header />;
}

function FooterWrapper() {
  return <Footer />;
}
