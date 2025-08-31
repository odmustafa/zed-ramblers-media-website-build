import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Check if Clerk is properly configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    // If Clerk is not configured and trying to access protected routes, redirect to home
    if (isProtectedRoute(req)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    // For non-protected routes, continue normally
    return NextResponse.next()
  }

  // If Clerk is configured, use normal protection
  if (isProtectedRoute(req)) {
    try {
      await auth.protect()
    } catch (error) {
      // If auth fails, redirect to sign-in
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
