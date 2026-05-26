import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Jonas Lillo-Stenberg',
    template: '%s — Jonas Lillo-Stenberg',
  },
  description: 'Teknolog og medeier i Datona. Skriver om bygging, distribusjon og hva som faktisk fungerer digitalt.',
  metadataBase: new URL('https://jonaslillo-stenberg.no'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    siteName: 'Jonas Lillo-Stenberg',
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
