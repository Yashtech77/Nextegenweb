import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
    ],
    sitemap: 'https://nextgenwebworks.com/sitemap.xml',
    host: 'https://nextgenwebworks.com',
  };
}
