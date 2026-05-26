import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const session = await getSession()
  if (!session.isLoggedIn) redirect('/login')

  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, title: true, slug: true, status: true, publishedAt: true, updatedAt: true },
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.875rem', fontWeight: 600 }}>Dashboard</span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem', color: 'var(--muted)' }}>← Nettside</Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '48px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Artikler</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>{articles.length} totalt</p>
          </div>
          <Link href="/dashboard/artikkel/ny" className="btn-primary">+ Ny artikkel</Link>
        </div>

        {articles.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-head)', fontSize: '0.9rem' }}>Ingen artikler ennå.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {articles.map(a => (
              <Link
                key={a.id}
                href={`/dashboard/artikkel/${a.id}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, marginBottom: '4px' }}>{a.title || 'Uten tittel'}</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
                    /essays/{a.slug}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: a.status === 'published' ? 'var(--accent)' : 'var(--muted)',
                  }}>
                    {a.status === 'published' ? 'Publisert' : 'Utkast'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {new Date(a.updatedAt).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
