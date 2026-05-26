import type { MetadataRoute } from 'next'
import { getEssaySlugs } from '@/lib/essays'

const BASE_URL = 'https://jonaslillo-stenberg.no'

export default function sitemap(): MetadataRoute.Sitemap {
  const essayUrls = getEssaySlugs().map(slug => ({
    url: `${BASE_URL}/essays/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/innhold`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/om`, changeFrequency: 'monthly', priority: 0.7 },
    ...essayUrls,
  ]
}
