// Force dynamic so Next.js never evaluates this route at build time
export const dynamic = 'force-dynamic'

import type { NextRequest } from 'next/server'

type Handler = { GET: (req: NextRequest) => Promise<Response>; POST: (req: NextRequest) => Promise<Response> }

let _handler: Handler | null = null

async function getHandler(): Promise<Handler> {
  if (_handler) return _handler
  const { makeRouteHandler } = await import('@keystatic/next/route-handler')
  const { default: keystaticConfig } = await import('../../../../../keystatic.config')
  _handler = makeRouteHandler({ config: keystaticConfig }) as unknown as Handler
  return _handler
}

export async function GET(req: NextRequest) {
  try {
    const { GET: handler } = await getHandler()
    return handler(req)
  } catch {
    return new Response(
      JSON.stringify({ error: 'CMS not configured. Set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET and KEYSTATIC_SECRET in Vercel.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { POST: handler } = await getHandler()
    return handler(req)
  } catch {
    return new Response(
      JSON.stringify({ error: 'CMS not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
