import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Millions Pro',
  description: 'Get in touch with the Millions Pro team. Questions about personal finance tips, collaboration inquiries, or feedback — we would love to hear from you.',
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-foreground to-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent font-sans text-sm uppercase tracking-[0.25em] mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Have a question about personal finance, want to collaborate, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Reach Out Directly</h2>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Whether it&apos;s a partnership opportunity, a story pitch, or feedback on our content, we respond to every message.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-sans text-sm uppercase tracking-wider mb-2">Email</h3>
              <a href="mailto:info@millionspro.com" className="text-secondary hover:text-primary transition-colors duration-200">
                info@millionspro.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-sans text-sm uppercase tracking-wider mb-2">Follow Along</h3>
              <p className="text-foreground/70 text-sm">Stay updated with our latest personal finance tips and insights on social media.</p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-primary/10">
              <p className="text-sm text-foreground/70 leading-relaxed">
                <strong className="text-foreground">Note:</strong> Millions Pro provides educational financial content. We do not offer personalized financial advice. For investment decisions, please consult a licensed financial advisor.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
