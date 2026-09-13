import { site } from '@/data/site';

export default function robots() {
  const baseUrl = site.canonicalUrl || 'https://decormoment.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
