import type { Metadata } from 'next';
import { config } from './config';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Qatalyst',
  manifest: '/manifest.json',
  title: 'Qatalyst',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="datadog-rum">
        {`
          (function(h,o,u,n,d) {
            h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
            d=o.createElement(u);d.async=1;d.src=n
            n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
          })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
          window.DD_RUM.onReady(function() {
            window.DD_RUM.init({
              clientToken: 'pub2e2335981654bd5dcbc87e3e7dade595',
              applicationId: '76034c30-7bb7-4403-ac31-802c61001f05',
              site: 'datadoghq.eu',
              service: 'qatalyst-platform-app',
              env: '${config.environment}',
              // Specify a version number to identify the deployed version of your application in Datadog
              version: '${config.version}',
              sessionSampleRate: 100,
              sessionReplaySampleRate: 100,
              trackUserInteractions: true,
              trackResources: true,
              trackLongTasks: true,
            });

            // Add custom context to DataDog
            if (window.DD_RUM.addRumGlobalContext) {
              window.DD_RUM.addRumGlobalContext('api_url', '${config.apiUrl}');
            }

            // Safely check for user info in localStorage and add to DataDog context
            try {
              const userInfoString = localStorage.getItem('CURRENT_USER_INFO');
              if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                if (userInfo && typeof userInfo === 'object') {
                  const { cognitoSub, email, name, userType } = userInfo;
                  if (cognitoSub) window.DD_RUM.addRumGlobalContext('user_cognito_sub', cognitoSub);
                  if (userType) window.DD_RUM.addRumGlobalContext('user_type', userType);
                  // TODO: TO ASSIST DEBUGGING ONLY REMOVE THIS BEFORE ENTERING BETA WITH REAL USERS
                  if (email && '${config.environment}' !== 'production') window.DD_RUM.addRumGlobalContext('user_email', email);
                }
              }
            } catch (ignore) {}
          })
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
