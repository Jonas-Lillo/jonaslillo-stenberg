import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const essaysDir = path.join(process.cwd(), 'content/essays')

export interface EssayMeta {
  slug: string
  title: string
  description: string
  category: 'strategi' | 'bygging' | 'distribusjon'
  readTime: number
  publishDate: string
}

export interface Essay extends EssayMeta {
  content: string
}

export function getAllEssays(): EssayMeta[] {
  const files = fs.readdirSync(essaysDir).filter(f => f.endsWith('.mdx') && !f.startsWith('_'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(essaysDir, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug, ...data } as EssayMeta
    })
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export function getEssay(slug: string): Essay {
  const raw = fs.readFileSync(path.join(essaysDir, `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as Essay
}

export function getEssaySlugs(): string[] {
  return fs
    .readdirSync(essaysDir)
    .filter(f => f.endsWith('.mdx') && !f.startsWith('_'))
    .map(f => f.replace(/\.mdx$/, ''))
}
