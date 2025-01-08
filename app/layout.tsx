import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import Providers from '@/providers/providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="w-full min-h-screen">
          <Providers
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SignedOut>
              <div className="flex items-center justify-center w-full min-h-screen">
                {children}
              </div>
            </SignedOut>
            <SignedIn>{children}</SignedIn>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
