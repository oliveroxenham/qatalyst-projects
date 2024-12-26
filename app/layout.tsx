import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import './globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="w-full min-h-screen">
          <SignedOut>
            <div className="flex items-center justify-center w-full min-h-screen">
              {children}
            </div>
          </SignedOut>
          <SignedIn>
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
