'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EssayCard from '@/components/EssayCard'
import type { EssayMeta } from '@/lib/essays'

const CATEGORIES = ['alle', 'strategi', 'bygging', 'distribusjon']

export default function InnholdClient({ essays }: { essays: EssayMeta[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('alle')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return essays.filter(e => {
      const matchCat = activeCategory === 'alle' || e.category === activeCategory
      const matchText = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      return matchCat && matchText
    })
  }, [essays, query, activeCategory])

  return (
    <>
      <Header activePage="innhold" />
      <main>
        <div className="content-header">
          <div className="container">
            <h1>Innhold</h1>
            <p className="page-sub">Essays om bygging, distribusjon, og hva som faktisk fungerer digitalt.</p>
            <input
              type="search"
              className="search-input"
              placeholder="Søk i essays"
              autoComplete="off"
              aria-label="Søk i essays"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="filter-tabs" role="tablist" aria-label="Filtrer essays">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section style={{ padding: '0 0 80px' }}>
          <div className="container">
            <div className="essay-list">
              {filtered.map(essay => (
                <EssayCard key={essay.slug} {...essay} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="no-results" style={{ display: 'block' }}>Ingen essays funnet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
