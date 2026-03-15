import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'About Millions Pro & Marine Lafitte — Personal Finance Expertise',
  description:
    'Meet Marine Lafitte, lead financial commentator at Millions Pro. Learn about our mission to make personal finance accessible, actionable, and empowering for everyday professionals.',
  openGraph: {
    title: 'About Millions Pro & Marine Lafitte',
    description:
      'The story behind Millions Pro and the mission to help everyday professionals make smarter money moves.',
    images: [
      {
        url: 'http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg',
        width: 1200,
        height: 630,
        alt: 'Marine Lafitte — Lead Author at Millions Pro',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ============================================================
          PAGE HEADER
          ============================================================ */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] rounded-full bg-primary/12 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent text-xs font-sans font-semibold uppercase tracking-[0.2em] mb-6">
            About Us
          </span>
          <h1 className="text-display-sm sm:text-display-md lg:text-display-lg font-bold text-white mb-5 leading-tight">
            The Story Behind<br />
            <span className="text-accent">Millions Pro</span>
          </h1>
          <p className="text-base sm:text-lg text-blue-100/75 max-w-2xl mx-auto leading-relaxed">
            Making personal finance accessible, actionable, and genuinely empowering for everyday professionals who want to take control of their money.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================================
          MISSION SECTION
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft-lg border border-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Mission</h2>
          </div>

          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Millions Pro was founded with a clear, unwavering purpose: to bridge the gap between complex financial knowledge and the everyday decisions that shape your financial future. We believe that managing your money well shouldn&apos;t require a finance degree, a Wall Street connection, or a six-figure salary to get started.
            </p>
            <p>
              Too many personal finance resources are filled with jargon, theoretical concepts, and advice that only works for people who are already wealthy. We built Millions Pro to be different. Every article, guide, and strategy we publish is designed for <strong>real people with real financial goals</strong> — whether you&apos;re trying to build your first emergency fund, pay off student loans, start investing with your first $100, or launch a profitable side hustle alongside your day job.
            </p>
            <p>
              Our content is organized around five core pillars that together address the full spectrum of personal finance for millennials and young professionals:
            </p>
          </div>

          {/* Five Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '', name: 'Smart Budgeting & Saving', desc: 'Proven frameworks to control spending and grow savings automatically.' },
              { icon: '', name: 'Beginner Investing', desc: 'Low-cost strategies to build wealth from your very first dollar.' },
              { icon: '', name: 'Debt Management', desc: 'Battle-tested payoff methods for credit cards, loans, and more.' },
              { icon: '', name: 'Side Hustles & Income', desc: 'Creative ways to earn more money alongside your career.' },
              { icon: '', name: 'Financial Wellness', desc: 'Balance money goals with mental health and personal values.' },
            ].map((pillar) => (
              <div key={pillar.name} className="bg-background rounded-xl p-5 border border-primary/[0.06]">
                <span className="text-2xl mb-3 block" aria-hidden="true">{pillar.icon}</span>
                <h3 className="text-sm font-sans font-bold text-foreground mb-1">{pillar.name}</h3>
                <p className="text-xs text-foreground/55 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          AUTHOR SECTION
          ============================================================ */}
      <section className="bg-white border-y border-primary/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-background rounded-2xl overflow-hidden border border-primary/10 shadow-soft-lg">
            <div className="md:flex">
              {/* Photo */}
              <div className="md:w-2/5 relative">
                <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
                  <Image
                    src="http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg"
                    alt="Marine Lafitte — Lead Financial Commentator at Millions Pro"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="md:w-3/5 p-8 md:p-10">
                <span className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-primary mb-2 block">
                  Lead Financial Commentator
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
                  Marine Lafitte
                </h2>
                <div className="space-y-4 text-foreground/75 leading-relaxed">
                  <p>
                    Marine Lafitte is a personal finance writer, educator, and the founding voice behind Millions Pro. With years of experience in financial consulting and personal finance education, she writes with a clear mission: cut through the jargon and deliver actionable advice that everyday professionals can implement immediately.
                  </p>
                  <p>
                    Before launching Millions Pro, Marine worked in financial consulting where she saw firsthand how a lack of accessible financial education held talented professionals back from achieving their goals. That experience fueled her determination to create a platform where complex financial concepts are broken down into clear, practical steps.
                  </p>
                  <p>
                    Marine specializes in bridging the gap between <strong>financial commentary</strong> and real-world application. Whether she&apos;s analyzing market trends for beginners, profiling the most effective debt payoff strategies, or reviewing side hustle opportunities, her writing is always grounded in research, personal experience, and genuine care for her readers&apos; success.
                  </p>
                  <p>
                    When she&apos;s not writing, Marine mentors aspiring entrepreneurs, explores new investment strategies, and advocates for financial literacy in underserved communities.
                  </p>
                </div>

                {/* Contact */}
                <div className="mt-6 pt-6 border-t border-primary/10">
                  <p className="text-xs font-sans font-bold text-foreground/40 uppercase tracking-wider mb-2">Get in Touch</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="mailto:info@millionspro.com"
                      className="text-sm font-sans font-semibold text-secondary hover:text-primary transition-colors duration-200"
                    >
                      info@millionspro.com
                    </a>
                    <Link
                      href="/contact"
                      className="text-sm font-sans font-semibold text-secondary hover:text-primary transition-colors duration-200"
                    >
                      Contact Form →
                    </Link>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="mt-6 pt-6 border-t border-primary/10">
                  <p className="text-[11px] font-sans font-bold text-foreground/35 uppercase tracking-[0.15em] mb-3">Areas of Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Personal Finance Commentary',
                      'Budgeting Strategies',
                      'Beginner Investing',
                      'Debt Payoff Methods',
                      'Side Hustle Development',
                      'Financial Wellness',
                      'Income Growth',
                    ].map((tag) => (
                      <span key={tag} className="text-xs font-sans font-medium text-foreground/55 bg-white px-3 py-1.5 rounded-full border border-primary/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          VALUES
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Our Principles</span>
          <h2 className="text-display-sm font-bold text-foreground">What We Stand For</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '',
              title: 'Actionable Advice',
              desc: 'Every article includes concrete steps you can implement today. No fluff, no filler, no empty theory — just practical strategies grounded in real-world results.',
            },
            {
              icon: '',
              title: 'Radical Honesty',
              desc: 'We share the full picture, including the challenges and setbacks. Building wealth is a journey with real obstacles, and we keep it transparently real.',
            },
            {
              icon: '',
              title: 'Financial Literacy for All',
              desc: 'We believe everyone deserves access to quality financial education, regardless of their income, background, or starting point on the financial journey.',
            },
          ].map((value) => (
            <div key={value.title} className="text-center">
              <span className="text-4xl mb-5 block" aria-hidden="true">{value.icon}</span>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <div className="bg-gradient-to-br from-primary/[0.04] to-accent/[0.03] rounded-2xl p-10 md:p-14 border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-foreground/65 mb-8 max-w-xl mx-auto leading-relaxed">
            Start reading our latest articles and join thousands of professionals making smarter money decisions every single day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="btn-primary text-base px-8 py-4">
              Explore the Blog
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-4">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
