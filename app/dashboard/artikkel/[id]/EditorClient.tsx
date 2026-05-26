'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import type { Article } from '@prisma/client'

interface Props {
  article: Article | null
  isNew: boolean
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[æ]/g, 'ae').replace(/[ø]/g, 'o').replace(/[å]/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function EditorClient({ article, isNew }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(article?.title ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [slugManual, setSlugManual] = useState(!isNew)
  const [description, setDescription] = useState(article?.description ?? '')
  const [thumbnail, setThumbnail] = useState(article?.thumbnail ?? '')
  const [category, setCategory] = useState(article?.category ?? 'strategi')
  const [tags, setTags] = useState(article?.tags ?? '')
  const [status, setStatus] = useState(article?.status ?? 'draft')
  const [saving, setSaving] = useState(false)
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [aiResults, setAiResults] = useState<Record<string, string[]>>({})
  const [copied, setCopied] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Skriv artikkelen her...' }),
    ],
    content: article?.content ?? '',
    editorProps: {
      attributes: {
        style: 'min-height: 400px; outline: none; font-family: var(--font-body); font-size: 1.1rem; line-height: 1.8;',
      },
    },
  })

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!slugManual) setSlug(slugify(val))
  }

  const getContent = useCallback(() => {
    return editor?.getHTML() ?? ''
  }, [editor])

  async function save(newStatus?: string) {
    setSaving(true)
    const payload = {
      title, slug, content: getContent(), description,
      thumbnail, category, tags, status: newStatus ?? status,
    }

    let res: Response
    if (isNew) {
      res = await fetch('/api/articles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else {
      res = await fetch(`/api/articles/${article!.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }

    const saved = await res.json()
    setSaving(false)
    if (newStatus) setStatus(newStatus)
    if (isNew && saved.id) router.replace(`/dashboard/artikkel/${saved.id}`)
  }

  async function callAi(action: string) {
    setAiLoading(action)
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, title, content: getContent(), description }),
    })
    const data = await res.json()
    setAiResults(prev => ({ ...prev, [action]: data.suggestions }))
    setAiLoading(null)
  }

  function copyLink() {
    const url = `${window.location.origin}/essays/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const publishedUrl = `/essays/${slug}`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Topbar */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '16px 0', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <a href="/dashboard" style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>← Dashboard</a>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {status === 'published' && (
              <>
                <button onClick={copyLink} className="link-arrow" style={{ fontSize: '0.8rem' }}>
                  {copied ? 'Kopiert!' : 'Kopier lenke'}
                </button>
                <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ fontSize: '0.8rem' }}>
                  Forhåndsvis ↗
                </a>
                <button onClick={() => save('draft')} className="link-arrow" style={{ fontSize: '0.8rem', color: 'var(--muted)' }} disabled={saving}>
                  Avpubliser
                </button>
              </>
            )}
            <button onClick={() => save('draft')} className="btn-primary" style={{ background: 'var(--muted)', padding: '10px 18px', fontSize: '0.8rem' }} disabled={saving}>
              {saving ? 'Lagrer...' : 'Lagre utkast'}
            </button>
            {status !== 'published' && (
              <button onClick={() => save('published')} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.8rem' }} disabled={saving}>
                Publiser
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '40px 32px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>

        {/* Editor */}
        <div>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Tittel"
            style={{ width: '100%', fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, border: 'none', background: 'transparent', outline: 'none', marginBottom: '8px', color: 'var(--text)', lineHeight: 1.1 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', color: 'var(--muted)' }}>/essays/</span>
            <input
              type="text"
              value={slug}
              onChange={e => { setSlug(e.target.value); setSlugManual(true) }}
              style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', color: 'var(--muted)', border: 'none', borderBottom: '1px solid var(--border)', background: 'transparent', outline: 'none', padding: '2px 4px', minWidth: '120px' }}
            />
          </div>

          <div style={{ border: '1px solid var(--border)', padding: '24px', borderRadius: 0 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'B', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
                { label: 'I', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
                { label: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
                { label: '""', action: () => editor?.chain().focus().toggleBlockquote().run(), active: editor?.isActive('blockquote') },
                { label: '—', action: () => editor?.chain().focus().setHorizontalRule().run(), active: false },
              ].map(btn => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  style={{
                    fontFamily: 'var(--font-head)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px',
                    border: '1px solid var(--border)', background: btn.active ? 'var(--text)' : 'transparent',
                    color: btn.active ? 'var(--bg)' : 'var(--text)', cursor: 'pointer',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <EditorContent editor={editor} />
          </div>

          {/* AI */}
          <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <p style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>AI-assistent</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { key: 'titles', label: 'Tittel-varianter' },
                { key: 'keywords', label: 'SEO-keywords' },
                { key: 'meta', label: 'Meta-beskrivelse' },
                { key: 'twitter', label: 'X-post' },
                { key: 'linkedin', label: 'LinkedIn-post' },
              ].map(btn => (
                <button
                  key={btn.key}
                  onClick={() => callAi(btn.key)}
                  disabled={aiLoading === btn.key}
                  style={{ fontFamily: 'var(--font-head)', fontSize: '0.78rem', fontWeight: 600, padding: '8px 16px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text)' }}
                >
                  {aiLoading === btn.key ? '...' : btn.label}
                </button>
              ))}
            </div>

            {Object.entries(aiResults).map(([key, suggestions]) => (
              <div key={key} style={{ marginTop: '16px' }}>
                <p style={{ fontFamily: 'var(--font-head)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>{key}</p>
                {suggestions.map((s, i) => (
                  <div key={i} style={{ padding: '10px 14px', border: '1px solid var(--border)', marginBottom: '6px', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, cursor: 'pointer' }}
                    onClick={() => navigator.clipboard.writeText(s)}
                    title="Klikk for å kopiere"
                  >
                    {s}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
          <div>
            <label style={labelStyle}>Status</label>
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem', fontWeight: 700, color: status === 'published' ? 'var(--accent)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {status === 'published' ? 'Publisert' : 'Utkast'}
            </span>
          </div>

          <div>
            <label style={labelStyle}>Meta-beskrivelse</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Kort beskrivelse (maks 160 tegn)"
              maxLength={160}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
            />
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', color: 'var(--muted)' }}>{description.length}/160</span>
          </div>

          <div>
            <label style={labelStyle}>Kategori</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              <option value="strategi">Strategi</option>
              <option value="bygging">Bygging</option>
              <option value="distribusjon">Distribusjon</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tags (kommaseparert)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="seo, vekst, data" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Thumbnail URL</label>
            <input type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="https://..." style={inputStyle} />
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-head)',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '8px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-head)',
  fontSize: '0.9rem',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text)',
  padding: '9px 12px',
  outline: 'none',
  borderRadius: 0,
}
