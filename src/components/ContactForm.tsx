"use client";

import { useState } from 'react';
import type { FC, FormEvent } from 'react';

const ContactForm: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-primary/10 p-8 md:p-12 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h3>
        <p className="text-foreground/60 mb-6">Thank you for reaching out. We typically respond within 1-2 business days.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="text-sm font-sans font-medium text-primary hover:text-secondary transition-colors duration-200"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-primary/10 p-8 md:p-10 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-sans font-medium text-foreground mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg border border-primary/15 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-sans text-sm transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-sans font-medium text-foreground mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-primary/15 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-sans text-sm transition-all duration-200"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-sans font-medium text-foreground mb-1.5">
            Subject <span className="text-red-400">*</span>
          </label>
          <select
            id="contact-subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-primary/15 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-sans text-sm transition-all duration-200"
          >
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="collaboration">Collaboration / Partnership</option>
            <option value="content">Content Suggestion</option>
            <option value="feedback">Feedback</option>
            <option value="advertising">Advertising</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-sans font-medium text-foreground mb-1.5">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us what you have in mind..."
            className="w-full px-4 py-3 rounded-lg border border-primary/15 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-sans text-sm transition-all duration-200 resize-vertical"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-sans font-semibold rounded-lg hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
