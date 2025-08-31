import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware without Clerk for now
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect protected routes to home page for now
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Allow all other routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
