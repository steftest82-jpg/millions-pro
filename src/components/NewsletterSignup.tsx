"use client";

import { useState } from 'react';
import type { FC, FormEvent } from 'react';

const NewsletterSignup: FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-gradient-to-br from-foreground via-secondary to-primary py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Stay Ahead of Your Finances</h2>
        <p className="text-blue-100 mb-8 leading-relaxed">
          Join thousands of professionals getting weekly personal finance tips, investing insights, and money management strategies delivered to their inbox.
        </p>

        {submitted ? (
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 animate-fade-in">
            <p className="text-accent font-semibold font-sans text-lg mb-1">You&apos;re in!</p>
            <p className="text-blue-100 text-sm">Thank you for subscribing. Check your inbox for a welcome email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-sans text-sm transition-all duration-200"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-accent text-foreground font-sans font-semibold rounded-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <p className="text-xs text-blue-200/40 mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
