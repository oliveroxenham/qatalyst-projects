import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/api/(.*)' // Added API routes as public
]);

export default clerkMiddleware(
  async (auth: { protect: () => any }, req: any) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (but they'll be marked as public in the isPublicRoute check)
    '/(api|trpc)(.*)',
  ],
};
