import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSession } from '@/lib/session'

const client = new Anthropic()

const PROMPTS: Record<string, (title: string, content: string, description: string) => string> = {
  titles: (title, content) =>
    `Du er en norsk innholdsstrateg. Basert på denne artikkelen, foreslå 5 alternative titler som er engasjerende, tydelige og SEO-vennlige. Tittelen bør være på norsk og maks 70 tegn.\n\nNåværende tittel: ${title}\n\nInnhold:\n${content}\n\nReturner kun tittelforslagene som en nummerert liste, ingen forklaring.`,

  keywords: (title, content) =>
    `Du er en SEO-ekspert. Analyser denne norske artikkelen og foreslå 8 relevante SEO-keywords eller keyphrases.\n\nTittel: ${title}\nInnhold:\n${content}\n\nReturner kun keywordsene som en kommaseparert liste.`,

  meta: (title, content, description) =>
    `Du er en norsk SEO-copywriter. Skriv 3 ulike meta-beskrivelser for denne artikkelen. Hver beskrivelse skal være maks 160 tegn, engasjerende og inkludere nøkkelord naturlig.\n\nTittel: ${title}\nNåværende beskrivelse: ${description}\nInnhold:\n${content}\n\nReturner kun de 3 forslagene, én per linje, nummerert.`,

  twitter: (title, content) =>
    `Du er en norsk social media-strateg. Skriv 3 X/Twitter-poster (maks 280 tegn) som promoterer denne artikkelen. Inkluder en hook og avslutt med lenke-placeholder [lenke].\n\nTittel: ${title}\nInnhold:\n${content}\n\nReturner kun de 3 forslagene, nummerert.`,

  linkedin: (title, content) =>
    `Du er en norsk LinkedIn-strateg. Skriv 2 LinkedIn-poster som promoterer denne artikkelen. Lengre format (200-300 ord), engasjerende åpning, verdi for leseren, call to action med lenke-placeholder [lenke].\n\nTittel: ${title}\nInnhold:\n${content}\n\nReturner kun de 2 forslagene, nummerert.`,
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { action, title, content, description } = await req.json()

  const promptFn = PROMPTS[action]
  if (!promptFn) return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: promptFn(title ?? '', content ?? '', description ?? '') }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const suggestions = text.split('\n').filter(Boolean)

  return NextResponse.json({ suggestions })
}
