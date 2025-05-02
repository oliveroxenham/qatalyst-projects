import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import Providers from '@/providers/providers';
import './globals.css';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie') || '';
  const languageCookie = cookieHeader.split('; ').find(row => row.startsWith('i18nextLng='));
  const language = languageCookie ? languageCookie.split('=')[1] : 'en';

  return (
    <ClerkProvider>
      <html lang={language} suppressHydrationWarning>
        <body className="w-full min-h-screen">
          <Providers
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <h1>oliver</h1>
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
