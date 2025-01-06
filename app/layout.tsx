import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { CSPostHogProvider } from '@/providers/ph-provider';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="w-full min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SignedOut>
              <div className="flex items-center justify-center w-full min-h-screen">
                {children}
              </div>
            </SignedOut>
            <SignedIn>
              <CSPostHogProvider>{children}</CSPostHogProvider>
            </SignedIn>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
