import { getAllEssays } from '@/lib/essays'

const BASE_URL = 'https://jonaslillo-stenberg.no'

export function GET() {
  const essays = getAllEssays()

  const items = essays.map(e => `
    <item>
      <title><![CDATA[${e.title}]]></title>
      <description><![CDATA[${e.description}]]></description>
      <link>${BASE_URL}/essays/${e.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/essays/${e.slug}</guid>
      <pubDate>${new Date(e.publishDate).toUTCString()}</pubDate>
      <category>${e.category}</category>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jonas Lillo-Stenberg</title>
    <description>Essays om bygging, distribusjon og hva som faktisk fungerer digitalt.</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>nb</language>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
