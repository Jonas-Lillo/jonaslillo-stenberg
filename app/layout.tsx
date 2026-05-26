import type { Metadata } from 'next'
import { Instrument_Serif, Crimson_Pro } from 'next/font/google'
import '../styles/globals.css'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const crimsonPro = Crimson_Pro({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
})

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
    <html lang="no" className={`${instrumentSerif.variable} ${crimsonPro.variable}`}>
      <body>{children}</body>
    </html>
  )
}
