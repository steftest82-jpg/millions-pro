import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AuthorBio: FC = () => {
  return (
    <div className="bg-background rounded-xl p-6 md:p-8 border border-primary/10">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/20">
          <Image
            src="http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg"
            alt="Marine Lafitte, Lead Author at Millions Pro"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs font-sans text-primary uppercase tracking-wider mb-1">Written by</p>
          <h3 className="text-xl font-bold text-foreground mb-2">Marine Lafitte</h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-3">
            Marine is the lead author at Millions Pro, a personal finance writer and educator passionate about making financial literacy accessible to everyday professionals. She covers budgeting, investing, debt management, and income growth strategies.
          </p>
          <Link
            href="/about"
            className="text-sm font-sans font-medium text-secondary hover:text-primary transition-colors duration-200"
          >
            Read full bio →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
