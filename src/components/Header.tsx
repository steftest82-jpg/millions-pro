"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { FC } from 'react';

const MAIN_NAV = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const CATEGORY_NAV = [
  { href: '/category/smart-budgeting-and-saving', label: 'Budgeting & Saving', icon: '' },
  { href: '/category/beginner-investing-tips', label: 'Investing Tips', icon: '' },
  { href: '/category/debt-management', label: 'Debt Management', icon: '' },
  { href: '/category/side-hustles-and-income-growth', label: 'Side Hustles', icon: '' },
  { href: '/category/financial-wellness', label: 'Financial Wellness', icon: '' },
];

const Header: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-primary/10'
          : 'bg-white border-b border-primary/8'
      }`}
    >
      {/* ---- Primary Nav Bar ---- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="Millions Pro Home">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-shadow duration-300">
              <span className="text-white font-bold font-sans text-sm leading-none">M</span>
            </div>
            <div className="hidden sm:flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-foreground tracking-tight">Millions</span>
              <span className="text-xl font-bold text-primary tracking-tight">Pro</span>
            </div>
          </Link>

          {/* Desktop Main Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-sans font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/[0.04] transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/[0.05] transition-all duration-200"
              aria-label="Toggle search"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* RSS */}
            <Link
              href="/api/rss"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/[0.05] transition-all duration-200"
              aria-label="RSS Feed"
              title="Subscribe via RSS"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
              </svg>
            </Link>

            {/* Subscribe CTA */}
            <Link
              href="#newsletter"
              className="ml-1 px-5 py-2 bg-primary text-white text-sm font-sans font-semibold rounded-lg hover:bg-secondary transition-all duration-300 shadow-soft hover:shadow-soft-lg"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-foreground/60 hover:text-primary transition-colors duration-200"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-foreground/60 hover:text-primary transition-colors duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---- Desktop Category Bar ---- */}
      <div className="hidden lg:block border-t border-primary/[0.06] bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-0.5 py-1.5 overflow-x-auto scrollbar-hide" aria-label="Category navigation">
            {CATEGORY_NAV.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-medium text-foreground/55 hover:text-primary rounded-lg hover:bg-primary/[0.04] transition-all duration-200 whitespace-nowrap"
              >
                <span className="text-sm" aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ---- Search Dropdown ---- */}
      {searchOpen && (
        <div className="border-t border-primary/10 bg-white shadow-soft-lg animate-fade-in-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative max-w-2xl mx-auto">
              <label htmlFor="header-search" className="sr-only">Search articles</label>
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/35 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                id="header-search"
                type="search"
                placeholder="Search articles on budgeting, investing, debt, side hustles…"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-primary/15 bg-background text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-sans text-sm transition-all duration-200"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* ---- Mobile Menu ---- */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={closeMobile}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
              <Link href="/" className="flex items-center gap-2" onClick={closeMobile}>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold font-sans text-xs">M</span>
                </div>
                <span className="text-lg font-bold text-foreground">Millions<span className="text-primary">Pro</span></span>
              </Link>
              <button
                type="button"
                onClick={closeMobile}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/[0.05] transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="px-4 py-6" aria-label="Mobile navigation">
              <div className="space-y-1 mb-8">
                {MAIN_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-base font-sans font-medium text-foreground/80 hover:text-primary hover:bg-primary/[0.04] rounded-xl transition-all duration-200"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-primary/10 pt-6 mb-8">
                <p className="px-4 mb-3 text-xs font-sans font-bold uppercase tracking-[0.15em] text-foreground/35">
                  Categories
                </p>
                <div className="space-y-1">
                  {CATEGORY_NAV.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-sans text-foreground/70 hover:text-primary hover:bg-primary/[0.04] rounded-xl transition-all duration-200"
                      onClick={closeMobile}
                    >
                      <span className="text-base" aria-hidden="true">{cat.icon}</span>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-4">
                <Link
                  href="#newsletter"
                  className="btn-primary w-full text-center"
                  onClick={closeMobile}
                >
                  Subscribe to Newsletter
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
