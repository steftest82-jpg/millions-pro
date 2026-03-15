import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Millions Pro — Content Manager',
  description: 'Keystatic CMS dashboard for managing Millions Pro blog content, posts, and site settings.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
