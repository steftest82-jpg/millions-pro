"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface ToCItem {
  heading: string;
  anchor: string;
}

interface TableOfContentsProps {
  items: ToCItem[];
}

const TableOfContents: FC<TableOfContentsProps> = ({ items }) => {
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -75% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.anchor);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="bg-white rounded-2xl border border-primary/10 shadow-soft overflow-hidden"
    >
      {/* Header — collapsible on mobile, always open on desktop */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 lg:cursor-default"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/[0.08] flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <span className="text-sm font-sans font-bold text-foreground uppercase tracking-wider">
            In This Article
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-foreground/40 transition-transform duration-200 lg:hidden ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Links — always visible on desktop, toggled on mobile */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block border-t border-primary/[0.06]`}>
        <ol className="px-5 py-4 space-y-1">
          {items.map((item, index) => {
            const isActive = activeAnchor === item.anchor;
            return (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  onClick={() => setIsExpanded(false)}
                  className={`flex items-start gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary/[0.06] text-primary font-medium'
                      : 'text-foreground/55 hover:text-primary hover:bg-primary/[0.03]'
                  }`}
                >
                  <span
                    className={`text-[11px] font-sans font-bold min-w-[1.5rem] mt-0.5 transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-foreground/30 group-hover:text-primary/50'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{item.heading}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default TableOfContents;
