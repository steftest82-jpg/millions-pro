import type { FC } from 'react';

interface KeyTakeawaysProps {
  items: string[];
}

const KeyTakeaways: FC<KeyTakeawaysProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary/[0.04] via-accent/[0.03] to-primary/[0.02] rounded-2xl border border-primary/12 p-6 sm:p-8 mb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground font-sans leading-tight">Key Takeaways</h2>
          <p className="text-xs text-foreground/45 font-sans">Quick summary of what you&apos;ll learn</p>
        </div>
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-[11px] font-bold font-sans mt-0.5 shadow-sm">
              {index + 1}
            </span>
            <span className="text-foreground/80 leading-relaxed text-[15px]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;
