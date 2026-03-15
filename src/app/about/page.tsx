import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Millions Pro & Marine Lafitte',
  description:
    'Learn about Millions Pro, a personal finance website founded by Marine Lafitte. We publish free guides on budgeting, investing for beginners, debt management, side hustles, and building wealth.',
  openGraph: {
    title: 'About Millions Pro & Marine Lafitte | Millions Pro',
    description:
      'Millions Pro is a personal finance resource founded by Marine Lafitte. Free, actionable guides on budgeting, investing, debt payoff, and income growth for everyday professionals.',
    images: [
      {
        url: 'http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg',
        width: 1200,
        height: 630,
        alt: 'Marine Lafitte — Founder and Lead Author at Millions Pro',
      },
    ],
  },
};

const faqItems = [
  {
    question: 'What is Millions Pro?',
    answer:
      'Millions Pro is a personal finance website that publishes free, in-depth articles on budgeting, investing for beginners, debt management, side hustles, and building long-term wealth. The site is designed to help everyday professionals make smarter money decisions through practical, actionable guidance rather than abstract financial theory.',
  },
  {
    question: 'Who writes the content on Millions Pro?',
    answer:
      'All content on Millions Pro is written and edited by Marine Lafitte, a personal finance writer and educator with a background in financial consulting. Marine specializes in translating complex financial concepts into clear, step-by-step advice that readers can apply immediately to their own finances.',
  },
  {
    question: 'Is the financial advice on Millions Pro free?',
    answer:
      'Yes, all articles, guides, and resources published on Millions Pro are completely free to read. There are no paywalls or premium memberships required. The goal is to make quality personal finance education accessible to everyone, regardless of income level or financial background.',
  },
  {
    question: 'What topics does Millions Pro cover?',
    answer:
      'Millions Pro covers five core personal finance topics: smart budgeting and saving strategies, beginner investing and wealth building, debt management and payoff methods, side hustles and income growth, and financial wellness. Articles range from introductory guides for financial beginners to more advanced strategies for experienced readers.',
  },
  {
    question: 'How often does Millions Pro publish new articles?',
    answer:
      'Millions Pro publishes new personal finance articles on a regular basis, typically multiple times per week. Topics rotate across the five core pillars to ensure comprehensive coverage of budgeting, investing, debt management, side hustles, and financial wellness throughout each month.',
  },
  {
    question: 'Can I trust the financial information on Millions Pro?',
    answer:
      'Millions Pro is committed to accuracy and transparency. All articles are thoroughly researched and based on established personal finance principles. However, the content is educational in nature and should not be treated as personalized financial advice. Readers are encouraged to consult a licensed financial advisor for decisions specific to their individual situation.',
  },
  {
    question: 'How can I contact Millions Pro?',
    answer:
      'You can reach the Millions Pro team by sending an email to info@millionspro.com or by using the contact form on the website. Whether you have a question about an article, a suggestion for a future topic, or a partnership inquiry, the team typically responds within one to two business days.',
  },
  {
    question: 'Does Millions Pro offer personalized financial advice?',
    answer:
      'No, Millions Pro does not provide personalized financial advice or individual financial planning services. The website publishes general personal finance education and commentary. For advice tailored to your specific financial situation, goals, and risk tolerance, we recommend consulting a certified financial planner or licensed financial advisor.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            About <span className="text-accent">Millions Pro</span> &<br />
            Marine Lafitte
          </h1>
          <p className="text-base sm:text-lg text-blue-100/75 max-w-2xl mx-auto leading-relaxed">
            Millions Pro is a personal finance website dedicated to helping everyday professionals take control of their money through free, actionable guides on budgeting, investing, debt management, and building wealth.
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
              Millions Pro exists to close the gap between complex financial knowledge and the everyday money decisions that determine your long-term financial health. Too many personal finance resources rely on jargon, abstract theory, and advice that only applies to people who are already wealthy. Millions Pro takes a different approach.
            </p>
            <p>
              Every article published on this site is written for <strong>real people with real financial goals</strong>. Whether you are building your first emergency fund, creating a monthly budget, learning how to invest with limited capital, developing a strategy to pay off student loans or credit card debt, or exploring side hustle ideas to increase your income, Millions Pro provides clear, step-by-step guidance you can act on immediately.
            </p>
            <p>
              The content on Millions Pro is organized around five core personal finance pillars that together address the full spectrum of money management for millennials, Gen Z, and working professionals:
            </p>
          </div>

          {/* Five Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              { name: 'Smart Budgeting & Saving', desc: 'Proven budgeting frameworks, saving strategies, and expense tracking methods to help you control spending and grow your savings consistently.' },
              { name: 'Beginner Investing', desc: 'Accessible investing guides covering index funds, ETFs, retirement accounts, and low-cost strategies to start building wealth from your first dollar.' },
              { name: 'Debt Management', desc: 'Effective debt payoff methods including the debt avalanche, debt snowball, and consolidation strategies for credit cards, student loans, and personal loans.' },
              { name: 'Side Hustles & Income Growth', desc: 'Practical ideas and strategies for earning additional income alongside your primary career, from freelancing to passive income streams.' },
              { name: 'Financial Wellness', desc: 'Guidance on aligning your money goals with your mental health, personal values, and long-term life plans for sustainable financial well-being.' },
            ].map((pillar) => (
              <div key={pillar.name} className="bg-background rounded-xl p-5 border border-primary/[0.06]">
                <h3 className="text-sm font-sans font-bold text-foreground mb-2">{pillar.name}</h3>
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
          <div className="text-center mb-10">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Meet the Author</span>
            <h2 className="text-display-sm font-bold text-foreground">Marine Lafitte</h2>
          </div>

          <div className="bg-background rounded-2xl overflow-hidden border border-primary/10 shadow-soft-lg">
            <div className="md:flex">
              {/* Photo */}
              <div className="md:w-2/5 relative">
                <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
                  <Image
                    src="http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg"
                    alt="Marine Lafitte — Founder and Lead Personal Finance Writer at Millions Pro"
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
                  Founder & Lead Personal Finance Writer
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
                  About Marine Lafitte
                </h3>
                <div className="space-y-4 text-foreground/75 leading-relaxed">
                  <p>
                    Marine Lafitte is a personal finance writer, educator, and the founder of Millions Pro. With a background in financial consulting and years of experience in personal finance education, Marine created Millions Pro to deliver the kind of clear, jargon-free financial guidance that she found missing from most online resources.
                  </p>
                  <p>
                    Before launching Millions Pro, Marine worked in financial consulting where she observed firsthand how a lack of accessible financial literacy prevented talented professionals from reaching their financial goals. That experience became the driving force behind building a platform where complex money topics like investing, budgeting, debt payoff, and retirement planning are explained in plain language with actionable next steps.
                  </p>
                  <p>
                    Marine specializes in <strong>personal finance commentary and education</strong>. Her writing covers market trends for beginner investors, comparative reviews of budgeting methods, in-depth debt payoff strategy guides, and evaluations of side hustle opportunities. Every article is grounded in research, established financial principles, and a genuine commitment to helping readers improve their financial lives.
                  </p>
                  <p>
                    Outside of writing, Marine mentors aspiring entrepreneurs, explores new investment strategies, and advocates for improved financial literacy education in underserved communities.
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
                      Contact Form
                    </Link>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="mt-6 pt-6 border-t border-primary/10">
                  <p className="text-[11px] font-sans font-bold text-foreground/35 uppercase tracking-[0.15em] mb-3">Areas of Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Personal Finance Education',
                      'Budgeting Strategies',
                      'Investing for Beginners',
                      'Debt Payoff Methods',
                      'Side Hustle Development',
                      'Financial Wellness',
                      'Income Growth Strategies',
                      'Money Management',
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
          <h2 className="text-display-sm font-bold text-foreground">What Millions Pro Stands For</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Actionable Financial Advice',
              desc: 'Every article on Millions Pro includes concrete steps you can implement today. No filler, no vague platitudes. Just practical personal finance strategies grounded in real-world results that help you budget better, invest smarter, and pay off debt faster.',
            },
            {
              title: 'Transparency and Honesty',
              desc: 'Building wealth is not a straight line. Millions Pro presents the full picture, including the challenges, trade-offs, and common mistakes. Readers deserve honest financial guidance that acknowledges the real obstacles on the path to financial independence.',
            },
            {
              title: 'Financial Literacy for Everyone',
              desc: 'Quality personal finance education should be accessible to all, regardless of income, background, or current financial knowledge. Millions Pro publishes all content for free and writes at a level that welcomes both beginners and experienced readers alike.',
            },
          ].map((value) => (
            <div key={value.title} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  {value.title.includes('Actionable') && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  )}
                  {value.title.includes('Transparency') && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  )}
                  {value.title.includes('Transparency') && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                  {value.title.includes('Everyone') && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FAQ SECTION
          ============================================================ */}
      <section className="bg-white border-y border-primary/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Common Questions</span>
            <h2 className="text-display-sm font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="mt-4 text-foreground/65 max-w-2xl mx-auto leading-relaxed">
              Answers to the most common questions about Millions Pro, our personal finance content, and how the site can help you manage your money more effectively.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 md:p-8 border border-primary/[0.06]"
              >
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.question}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-20 text-center">
        <div className="bg-gradient-to-br from-primary/[0.04] to-accent/[0.03] rounded-2xl p-10 md:p-14 border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start Making Smarter Money Decisions Today
          </h2>
          <p className="text-foreground/65 mb-8 max-w-xl mx-auto leading-relaxed">
            Browse the latest personal finance articles on Millions Pro and join thousands of professionals who are building better financial habits, growing their savings, and working toward financial independence.
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
