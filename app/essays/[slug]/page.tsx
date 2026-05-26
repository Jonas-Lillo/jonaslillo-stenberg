import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayCard from '@/components/EssayCard'
import { getEssay, getAllEssays, getEssaySlugs } from '@/lib/essays'
import { prisma } from '@/lib/prisma'
import EmailSignup from './EmailSignup'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return getEssaySlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const dbArticle = await prisma.article.findUnique({ where: { slug, status: 'published' } })
  if (dbArticle) {
    return {
      title: dbArticle.title,
      description: dbArticle.description,
      openGraph: {
        title: dbArticle.title,
        description: dbArticle.description,
        type: 'article',
        publishedTime: dbArticle.publishedAt?.toISOString(),
        images: dbArticle.thumbnail ? [{ url: dbArticle.thumbnail }] : [],
      },
      twitter: { card: 'summary_large_image', title: dbArticle.title, description: dbArticle.description },
    }
  }

  try {
    const essay = getEssay(slug)
    return {
      title: essay.title,
      description: essay.description,
      openGraph: { title: essay.title, description: essay.description, type: 'article', publishedTime: essay.publishDate },
    }
  } catch {
    return {}
  }
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params

  // Check DB first (dashboard articles)
  const dbArticle = await prisma.article.findUnique({ where: { slug, status: 'published' } })

  if (dbArticle) {
    const related = await prisma.article.findMany({
      where: { status: 'published', slug: { not: slug } },
      orderBy: { publishedAt: 'desc' },
      take: 2,
      select: { id: true, title: true, slug: true, description: true, category: true, publishedAt: true },
    })

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: dbArticle.title,
      description: dbArticle.description,
      author: { '@type': 'Person', name: 'Jonas Lillo-Stenberg', url: 'https://jonaslillo-stenberg.no' },
      datePublished: dbArticle.publishedAt?.toISOString(),
      image: dbArticle.thumbnail || undefined,
      inLanguage: 'nb',
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header activePage="innhold" />
        <main>
          <div className="container">
            <div className="essay-header">
              <div className="essay-meta" style={{ marginBottom: '20px' }}>
                <span style={{ textTransform: 'capitalize' }}>{dbArticle.category}</span>
                <span>{dbArticle.publishedAt ? new Date(dbArticle.publishedAt).toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' }) : ''}</span>
              </div>
              <h1>{dbArticle.title}</h1>
            </div>
            {dbArticle.thumbnail && (
              <img src={dbArticle.thumbnail} alt={dbArticle.title} style={{ width: '100%', maxWidth: '680px', marginBottom: '40px', display: 'block' }} />
            )}
            <div className="essay-body" dangerouslySetInnerHTML={{ __html: dbArticle.content }} />
            <hr className="divider" />
            <EmailSignup />
            {related.length > 0 && (
              <div className="related-essays">
                <h3>Flere essays</h3>
                <div className="essay-list">
                  {related.map(e => (
                    <EssayCard key={e.slug} slug={e.slug} title={e.title} description={e.description} category={e.category}
                      readTime={0} publishDate={e.publishedAt ? new Date(e.publishedAt).toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' }) : ''} compact />
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

  // Fallback: MDX files
  let essay
  try {
    essay = getEssay(slug)
  } catch {
    notFound()
  }

  const related = getAllEssays().filter(e => e.slug !== slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.description,
    author: { '@type': 'Person', name: 'Jonas Lillo-Stenberg', url: 'https://jonaslillo-stenberg.no' },
    datePublished: essay.publishDate,
    inLanguage: 'nb',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
                {related.map(e => (<EssayCard key={e.slug} {...e} compact />))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
