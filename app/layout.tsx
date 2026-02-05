import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
        {/* Page Transition Loader */}
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
