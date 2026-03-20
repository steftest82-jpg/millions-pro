import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0EA5E9',
          50: '#E6F6FE',
          100: '#CCEDFD',
          200: '#99DBFB',
          300: '#66C9F9',
          400: '#33B7F7',
          500: '#0EA5E9',
          600: '#0B84BA',
          700: '#08638C',
          800: '#06425D',
          900: '#03212F',
        },
        secondary: {
          DEFAULT: '#0284C7',
          50: '#E0F3FD',
          100: '#B3E3FA',
          200: '#80D2F6',
          300: '#4DC1F3',
          400: '#1AB0EF',
          500: '#0284C7',
          600: '#026A9F',
          700: '#015077',
          800: '#013550',
          900: '#001B28',
        },
        accent: {
          DEFAULT: '#38BDF8',
          50: '#EBF8FE',
          100: '#D7F1FE',
          200: '#AFE3FC',
          300: '#87D5FB',
          400: '#5FC7F9',
          500: '#38BDF8',
          600: '#0BA5EC',
          700: '#0880B8',
          800: '#065C84',
          900: '#033750',
        },
        background: '#F0F9FF',
        foreground: '#0C4A6E',
      },
      fontFamily: {
        serif: [
          'var(--font-serif)',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        sans: [
          'var(--font-sans)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(14, 165, 233, 0.08), 0 4px 6px -4px rgba(14, 165, 233, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(14, 165, 233, 0.12), 0 4px 12px -4px rgba(14, 165, 233, 0.06)',
        'soft-xl': '0 20px 60px -15px rgba(14, 165, 233, 0.15), 0 8px 20px -6px rgba(14, 165, 233, 0.08)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(12, 74, 110, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 50%, #0EA5E9 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(14, 165, 233, 0.02) 0%, rgba(240, 249, 255, 0) 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#0C4A6E',
            '--tw-prose-headings': '#0C4A6E',
            '--tw-prose-lead': '#0C4A6E',
            '--tw-prose-links': '#0284C7',
            '--tw-prose-bold': '#0C4A6E',
            '--tw-prose-counters': '#0EA5E9',
            '--tw-prose-bullets': '#0EA5E9',
            '--tw-prose-hr': 'rgba(14, 165, 233, 0.15)',
            '--tw-prose-quotes': '#0C4A6E',
            '--tw-prose-quote-borders': '#0EA5E9',
            '--tw-prose-captions': '#0284C7',
            '--tw-prose-code': '#0284C7',
            '--tw-prose-pre-code': '#F0F9FF',
            '--tw-prose-pre-bg': '#0C4A6E',
            '--tw-prose-th-borders': 'rgba(14, 165, 233, 0.2)',
            '--tw-prose-td-borders': 'rgba(14, 165, 233, 0.1)',
            color: '#0C4A6E',
            maxWidth: 'none',
            a: {
              color: '#0284C7',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'rgba(2, 132, 199, 0.3)',
              fontWeight: '500',
              transition: 'color 0.2s ease, text-decoration-color 0.2s ease',
              '&:hover': {
                color: '#0EA5E9',
                textDecorationColor: '#0EA5E9',
              },
            },
            h1: {
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              color: '#0C4A6E',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              color: '#0C4A6E',
              fontWeight: '700',
            },
            h3: {
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              color: '#0C4A6E',
              fontWeight: '600',
            },
            h4: {
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              color: '#0C4A6E',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#0EA5E9',
              fontStyle: 'italic',
              color: 'rgba(12, 74, 110, 0.85)',
            },
            code: {
              color: '#0284C7',
              backgroundColor: 'rgba(14, 165, 233, 0.08)',
              borderRadius: '0.25rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#0C4A6E',
              color: '#F0F9FF',
              borderRadius: '0.75rem',
              border: '1px solid rgba(14, 165, 233, 0.15)',
            },
            strong: {
              color: '#0C4A6E',
              fontWeight: '700',
            },
            hr: {
              borderColor: 'rgba(14, 165, 233, 0.15)',
            },
            'thead th': {
              color: '#0C4A6E',
              fontWeight: '600',
              borderBottomColor: 'rgba(14, 165, 233, 0.2)',
            },
            'tbody td': {
              borderBottomColor: 'rgba(14, 165, 233, 0.08)',
            },
            img: {
              borderRadius: '0.75rem',
            },
            figure: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            figcaption: {
              color: '#0284C7',
              fontSize: '0.875rem',
              textAlign: 'center',
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
