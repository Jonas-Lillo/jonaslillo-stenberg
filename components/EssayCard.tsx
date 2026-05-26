import Link from 'next/link'

interface EssayCardProps {
  slug: string
  title: string
  description: string
  category: string
  readTime: number
  publishDate: string
  compact?: boolean
}

export default function EssayCard({ slug, title, description, category, readTime, publishDate, compact }: EssayCardProps) {
  return (
    <Link
      href={`/essays/${slug}`}
      className="essay-item"
      data-cat={category}
      data-title={title.toLowerCase()}
      data-desc={description.toLowerCase()}
      style={compact ? { padding: '24px 0' } : undefined}
    >
      <div className="essay-meta">
        <span style={{ textTransform: 'capitalize' }}>{category}</span>
        <span>{readTime} min lesetid</span>
        <span>{publishDate}</span>
      </div>
      <div className="essay-title">{title}</div>
      <p className="essay-desc">{description}</p>
    </Link>
  )
}
