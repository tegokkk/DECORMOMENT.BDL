import { site } from '@/data/site';

export default function sitemap() {
  const baseUrl = site.canonicalUrl || 'https://decormoment.id';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
