import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayCard from '@/components/EssayCard'
import { getEssay, getAllEssays, getEssaySlugs } from '@/lib/essays'
import EmailSignup from './EmailSignup'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getEssaySlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const essay = getEssay(slug)
    return {
      title: essay.title,
      description: essay.description,
      openGraph: {
        title: essay.title,
        description: essay.description,
        type: 'article',
        publishedTime: essay.publishDate,
      },
    }
  } catch {
    return {}
  }
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  let essay
  try {
    essay = getEssay(slug)
  } catch {
    notFound()
  }

  const related = getAllEssays()
    .filter(e => e.slug !== slug)
    .slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.description,
    author: {
      '@type': 'Person',
      name: 'Jonas Lillo-Stenberg',
      url: 'https://jonaslillo-stenberg.no',
    },
    datePublished: essay.publishDate,
    inLanguage: 'nb',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header activePage="innhold" />
      <main>
        <div className="container">

          <div className="essay-header">
            <div className="essay-meta" style={{ marginBottom: '20px' }}>
              <span style={{ textTransform: 'capitalize' }}>{essay.category}</span>
              <span>{essay.readTime} min lesetid</span>
              <span>{essay.publishDate}</span>
            </div>
            <h1>{essay.title}</h1>
          </div>

          <div className="essay-body">
            <MDXRemote source={essay.content} />
          </div>

          <hr className="divider" />

          <EmailSignup />

          {related.length > 0 && (
            <div className="related-essays">
              <h3>Flere essays</h3>
              <div className="essay-list">
                {related.map(e => (
                  <EssayCard key={e.slug} {...e} compact />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
