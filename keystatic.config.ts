import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'steftest82-jpg/millions-pro',
  },
  ui: {
    brand: {
      name: 'Millions Pro CMS',
    },
    navigation: {
      Content: ['posts'],
      Settings: ['siteSettings', 'navigationSettings'],
    },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'The headline of the blog post. Should be compelling and include your focus keyword naturally.',
            validation: { isRequired: true, length: { min: 10, max: 120 } },
          },
          slug: {
            label: 'URL Slug',
            description: 'Auto-generated from the title. You can customize it for SEO purposes.',
          },
        }),
        publishedAt: fields.date({
          label: 'Published Date',
          description: 'The publication date displayed on the article and used for RSS feed ordering.',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          description: 'Full name of the article author.',
          defaultValue: 'Marine Lafitte',
          validation: { isRequired: true, length: { min: 2, max: 80 } },
        }),
        focusKeyword: fields.text({
          label: 'Focus Keyword',
          description: 'The primary SEO keyword this article targets. Used in meta tags, schema markup, and as a display tag on the article page.',
          defaultValue: 'personal finance tips',
          validation: { isRequired: true, length: { min: 3, max: 80 } },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'A compelling 1-3 sentence summary of the article. Used in meta descriptions, social sharing previews, RSS feeds, and post cards on the blog listing page. Aim for 120-160 characters for optimal SEO.',
          multiline: true,
          validation: { isRequired: true, length: { min: 50, max: 320 } },
        }),
        coverImage: fields.text({
          label: 'Cover Image URL',
          description: 'Full URL to the cover image. Recommended dimensions: 1200×630px (16:9 ratio). Supports external URLs from any allowed image host.',
          validation: { isRequired: true },
        }),
        coverImageAlt: fields.text({
          label: 'Cover Image Alt Text',
          description: 'Descriptive alt text for the cover image. Important for accessibility (screen readers) and SEO image search ranking.',
          validation: { isRequired: true, length: { min: 10, max: 200 } },
        }),
        categories: fields.multiselect({
          label: 'Categories',
          description: 'Select one or more categories. The first selected category is used as the primary category displayed on post cards.',
          options: [
            { label: 'Smart Budgeting and Saving', value: 'smart-budgeting-and-saving' },
            { label: 'Beginner Investing Tips', value: 'beginner-investing-tips' },
            { label: 'Debt Management', value: 'debt-management' },
            { label: 'Side Hustles and Income Growth', value: 'side-hustles-and-income-growth' },
            { label: 'Financial Wellness', value: 'financial-wellness' },
          ],
        }),
        readingTime: fields.integer({
          label: 'Reading Time (minutes)',
          description: 'Estimated reading time in minutes. Displayed on post cards and the article header. If left empty, it will be auto-calculated from content length at ~230 words per minute.',
          defaultValue: 7,
          validation: { isRequired: false, min: 1, max: 60 },
        }),
        keyTakeaways: fields.array(
          fields.text({
            label: 'Takeaway',
            description: 'A single key insight or actionable point from the article.',
            validation: { isRequired: true, length: { min: 10, max: 300 } },
          }),
          {
            label: 'Key Takeaways',
            description: 'A list of 3-7 key insights displayed in a highlighted callout box at the top of the article. These help readers quickly understand the value of the article and improve engagement metrics.',
            itemLabel: (props) => props.value || 'New Takeaway',
            slugField: undefined,
          }
        ),
        tableOfContents: fields.array(
          fields.object({
            heading: fields.text({
              label: 'Section Heading',
              description: 'The display text for this table of contents entry.',
              validation: { isRequired: true, length: { min: 3, max: 120 } },
            }),
            anchor: fields.text({
              label: 'Anchor ID',
              description: 'The HTML id attribute used for in-page linking (e.g., "budgeting-basics"). Must match the id on the corresponding h2/h3 in the article content. Use lowercase with hyphens, no spaces.',
              validation: { isRequired: true, length: { min: 2, max: 80 } },
            }),
          }),
          {
            label: 'Table of Contents',
            description: 'Define the sections shown in the sidebar table of contents. Each entry links to an anchor ID in your article content. The ToC is displayed on desktop as a sticky sidebar and on mobile as a collapsible accordion.',
            itemLabel: (props) => props.fields.heading.value || 'New Section',
            slugField: undefined,
          }
        ),
        seoTitle: fields.text({
          label: 'SEO Title Override',
          description: 'Optional. If provided, this overrides the post title in the HTML <title> tag and Open Graph title. Leave empty to use the post title. Aim for 50-60 characters.',
          validation: { isRequired: false, length: { max: 70 } },
        }),
        seoDescription: fields.text({
          label: 'SEO Description Override',
          description: 'Optional. If provided, this overrides the excerpt in the HTML meta description and Open Graph description. Leave empty to use the excerpt. Aim for 120-160 characters.',
          multiline: true,
          validation: { isRequired: false, length: { max: 320 } },
        }),
        isDraft: fields.checkbox({
          label: 'Draft',
          description: 'When checked, this post will not appear on the public site. Use this for work-in-progress articles.',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Content',
          description: 'The full article body in MDX format. Use h2 headings with id attributes matching your Table of Contents anchors (e.g., <h2 id="budgeting-basics">). You can use bold, italic, links, lists, blockquotes, code blocks, and images.',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/settings/site',
      format: 'json',
      schema: {
        blogName: fields.text({
          label: 'Blog Name',
          description: 'The primary name of the blog, displayed in the header, footer, and browser tab.',
          defaultValue: 'Millions Pro',
          validation: { isRequired: true, length: { min: 1, max: 60 } },
        }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'A short phrase describing the blog, used in the site header and meta descriptions.',
          defaultValue: 'Your Daily Finance Magazine for Smart Money Moves',
          validation: { isRequired: true, length: { min: 10, max: 120 } },
        }),
        siteDescription: fields.text({
          label: 'Site Description',
          description: 'A longer description of the blog used as the default meta description for the homepage and fallback for pages without their own description.',
          defaultValue: 'Millions Pro is your trusted source for personal finance tips, smart budgeting strategies, beginner investing guides, debt management advice, and side hustle ideas to help everyday professionals build lasting wealth.',
          multiline: true,
          validation: { isRequired: true, length: { min: 50, max: 500 } },
        }),
        contactEmail: fields.text({
          label: 'Contact Email',
          description: 'Primary contact email displayed on the site and in the footer.',
          defaultValue: 'info@millionspro.com',
          validation: { isRequired: true },
        }),
        authorName: fields.text({
          label: 'Lead Author Name',
          description: 'Name of the primary author, used in schema markup, RSS feed metadata, and fallback author attribution.',
          defaultValue: 'Marine Lafitte',
          validation: { isRequired: true },
        }),
        authorBio: fields.text({
          label: 'Lead Author Bio',
          description: 'Short biography of the lead author displayed on the About page, article footers, and author cards.',
          defaultValue: 'Marine Lafitte is the lead financial commentator at Millions Pro. With years of experience in personal finance education and financial consulting, she writes for everyday professionals who want to take control of their money without the jargon.',
          multiline: true,
          validation: { isRequired: true, length: { min: 50, max: 600 } },
        }),
        authorImage: fields.text({
          label: 'Lead Author Image URL',
          description: 'URL to the lead author headshot photo. Recommended: square crop, minimum 200×200px.',
          defaultValue: 'http://img.b2bpic.net/premium-photo/business-woman-meeting-portrait-office-with-collaboration-teamwork-career-confidence-professional-financial-consultant-consulting-staff-with-smile-happy-from-finance-advice-job_590464-408953.jpg',
        }),
        socialTwitter: fields.text({
          label: 'Twitter / X URL',
          description: 'Full URL to the Twitter/X profile (e.g., https://twitter.com/millionspro).',
          defaultValue: '',
        }),
        socialLinkedin: fields.text({
          label: 'LinkedIn URL',
          description: 'Full URL to the LinkedIn profile or company page.',
          defaultValue: '',
        }),
        socialFacebook: fields.text({
          label: 'Facebook URL',
          description: 'Full URL to the Facebook page.',
          defaultValue: '',
        }),
        socialInstagram: fields.text({
          label: 'Instagram URL',
          description: 'Full URL to the Instagram profile.',
          defaultValue: '',
        }),
        googleAnalyticsId: fields.text({
          label: 'Google Analytics ID',
          description: 'Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX). Leave empty to disable tracking.',
          defaultValue: '',
        }),
        footerDisclaimer: fields.text({
          label: 'Footer Disclaimer',
          description: 'Legal disclaimer text displayed at the bottom of every page.',
          defaultValue: 'Millions Pro provides educational financial content and is not a substitute for professional financial advice.',
          multiline: true,
          validation: { isRequired: true, length: { min: 20, max: 500 } },
        }),
      },
    }),
    navigationSettings: singleton({
      label: 'Navigation Settings',
      path: 'content/settings/navigation',
      format: 'json',
      schema: {
        mainNavItems: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              description: 'The visible text for this navigation link.',
              validation: { isRequired: true, length: { min: 1, max: 40 } },
            }),
            href: fields.text({
              label: 'URL Path',
              description: 'The URL path (e.g., /blog, /about, /contact). Use relative paths for internal links.',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Main Navigation Items',
            description: 'Links displayed in the primary header navigation bar.',
            itemLabel: (props) => props.fields.label.value || 'New Nav Item',
            slugField: undefined,
          }
        ),
        showCategoryBar: fields.checkbox({
          label: 'Show Category Bar',
          description: 'Display the horizontal category navigation bar below the main header on desktop.',
          defaultValue: true,
        }),
        ctaButtonLabel: fields.text({
          label: 'Header CTA Button Label',
          description: 'Text for the call-to-action button in the header (e.g., "Subscribe"). Leave empty to hide.',
          defaultValue: 'Subscribe',
        }),
        ctaButtonHref: fields.text({
          label: 'Header CTA Button URL',
          description: 'URL the header CTA button links to.',
          defaultValue: '#newsletter',
        }),
      },
    }),
  },
});
