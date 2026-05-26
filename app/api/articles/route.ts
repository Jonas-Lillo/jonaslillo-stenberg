import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, slug, content, description, thumbnail, category, tags, status } = body

  const article = await prisma.article.create({
    data: {
      title: title ?? '',
      slug: slug ?? `utkast-${Date.now()}`,
      content: content ?? '',
      description: description ?? '',
      thumbnail: thumbnail ?? '',
      category: category ?? 'strategi',
      tags: tags ?? '',
      status: status ?? 'draft',
      publishedAt: status === 'published' ? new Date() : null,
    },
  })

  return NextResponse.json(article)
}
