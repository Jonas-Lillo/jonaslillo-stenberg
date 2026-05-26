import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EditorClient from './EditorClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: Props) {
  const session = await getSession()
  if (!session.isLoggedIn) redirect('/login')

  const { id } = await params
  const isNew = id === 'ny'

  const article = isNew ? null : await prisma.article.findUnique({ where: { id } })
  if (!isNew && !article) redirect('/dashboard')

  return <EditorClient article={article} isNew={isNew} />
}
