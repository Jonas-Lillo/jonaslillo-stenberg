import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  const hash = process.env.DASHBOARD_PASSWORD_HASH
  if (!hash) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  const valid = await bcrypt.compare(password, hash)
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const session = await getSession()
  session.isLoggedIn = true
  await session.save()

  return NextResponse.json({ ok: true })
}
