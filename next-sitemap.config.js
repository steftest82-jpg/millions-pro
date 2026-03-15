/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://millionspro.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/keystatic', '/keystatic/**', '/api/**'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/keystatic', '/api'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://millionspro.com'}/sitemap.xml`,
    ],
  },
};
