import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';

export const metadata: Metadata = {
  title: 'Lumina Stays | Premium Stay in Vizag',
  description: 'Book your comfortable stay at Lumina Stays, Vizag. Fast booking, modern rooms, and great location.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="pb-24 sm:pb-8">{children}</main>
        <StickyMobileCta />
      </body>
    </html>
  );
}
