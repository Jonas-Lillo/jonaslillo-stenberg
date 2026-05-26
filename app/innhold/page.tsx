import { getAllEssays } from '@/lib/essays'
import InnholdClient from './InnholdClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Innhold',
  description: 'Essays om bygging, distribusjon og hva som faktisk fungerer digitalt.',
}

export default function InnholdPage() {
  const essays = getAllEssays()
  return <InnholdClient essays={essays} />
}
