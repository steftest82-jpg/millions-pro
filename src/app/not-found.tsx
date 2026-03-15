import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="text-6xl mb-6">🔍</p>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Page Not Found</h1>
      <p className="text-foreground/60 mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-sans font-semibold rounded-lg hover:bg-secondary transition-all duration-300 shadow-lg"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-primary/20 text-foreground font-sans font-semibold rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
        >
          Browse Articles
        </Link>
      </div>
    </section>
  );
}
