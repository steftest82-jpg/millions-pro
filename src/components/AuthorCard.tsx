import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthorCardProps {
  variant?: 'compact' | 'full';
}

const AuthorCard: FC<AuthorCardProps> = ({ variant = 'compact' }) => {
  if (variant === 'full') {
    return (
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-primary/15 shadow-soft-lg">
            <Image
              src="http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg"
              alt="Marine Lafitte — Lead Author at Millions Pro"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-primary">
              About the Author
            </span>
            <span className="flex-1 h-px bg-primary/10" aria-hidden="true" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Marine Lafitte
          </h3>

          <div className="space-y-3 text-foreground/75 leading-relaxed mb-6">
            <p>
              Marine Lafitte is the lead financial commentator and founder of Millions Pro. With years of experience in personal finance education and financial consulting, she writes for the everyday professional who wants to take control of their money without the jargon.
            </p>
            <p>
              Her mission is simple: make personal finance accessible, actionable, and empowering. Whether she&apos;s breaking down the 50/30/20 budgeting rule, comparing index fund strategies, or profiling profitable side hustles, Marine brings a relatable, no-nonsense perspective to every article.
            </p>
            <p>
              When she&apos;s not writing, Marine mentors aspiring entrepreneurs, explores new investment strategies, and advocates for financial literacy in underserved communities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Full Bio
            </Link>
            <Link
              href="/contact"
              className="btn-secondary text-sm px-5 py-2.5"
            >
              Get in Touch
            </Link>
            <a
              href="mailto:info@millionspro.com"
              className="text-sm font-sans text-secondary hover:text-primary transition-colors duration-200"
            >
              info@millionspro.com
            </a>
          </div>

          {/* Expertise Tags */}
          <div className="mt-6 pt-6 border-t border-primary/10">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-foreground/35 mb-3">
              Areas of Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Personal Finance',
                'Budgeting Strategies',
                'Investing for Beginners',
                'Debt Payoff Methods',
                'Side Hustle Development',
                'Financial Wellness',
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-sans font-medium text-foreground/55 bg-primary/[0.05] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Compact Variant (for blog post footers) ---- */
  return (
    <div className="bg-background rounded-2xl p-6 md:p-8 border border-primary/10">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 ring-3 ring-primary/15 shadow-soft">
          <Image
            src="http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg"
            alt="Marine Lafitte — Lead Author at Millions Pro"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-primary mb-1">
            Written by
          </p>
          <h4 className="text-xl font-bold text-foreground mb-2">Marine Lafitte</h4>
          <p className="text-sm text-foreground/65 leading-relaxed mb-3">
            Lead financial commentator at Millions Pro. Marine writes about budgeting, investing, debt management, and income growth — making personal finance accessible for everyday professionals.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm font-sans font-semibold text-secondary hover:text-primary transition-colors duration-200"
            >
              Full bio →
            </Link>
            <a
              href="mailto:info@millionspro.com"
              className="text-sm font-sans text-foreground/45 hover:text-primary transition-colors duration-200"
            >
              info@millionspro.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
