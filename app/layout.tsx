import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import PageTransitionLoader from '@/components/PageTransitionLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PugArch - Innovative Technology Solutions',
  description: 'Strategic IT partnerships delivering cutting-edge technology solutions for Education, Government, and Industry sectors.',
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="5rd6192mi51zle6xvwumottcyjorqn" />
        {/* ✅ Preload Spline resources */}
        <link
          rel="preconnect"
          href="https://prod.spline.design"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://prod.spline.design"
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0MS3KJJS34"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-0MS3KJJS34");
          `}
        </Script>
        {/* Page Transition Loader */}
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
