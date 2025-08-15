// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://theaethongroup.com', // Apna actual domain yaha daal
  generateRobotsTxt: true, // robots.txt generate karega
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/private/*'], // jo pages sitemap me nahi chahiye
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://theaethongroup.com/sitemap.xml',
    ],
  },
};
