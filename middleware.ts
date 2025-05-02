import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  publicRoutes: ['/sign-in(.*)', '/sign-up(.*)'],
  ignoredRoutes: ['/api/(.*)'],
  // afterAuth(auth, req) {
  //   // If user is not authenticated and trying to access a private route, redirect to sign-in
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     const signInUrl = new URL('/sign-in', req.url);
  //     return Response.redirect(signInUrl);
  //   }
  // }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}