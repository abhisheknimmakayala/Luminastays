/**
 * src/app/layout.tsx
 * Root layout for Lumina Stays (Next.js App Router).
 *
 * Structure:
 *   <html>
 *     <body>
 *       <Navbar />          – Sticky top nav; transparent on hero, solid on scroll
 *       <main>{children}</main>
 *       <Footer />          – Three-column footer with links, contact, social
 *       <MobileStickyBar /> – Fixed bottom bar (mobile only): Book Now / WhatsApp / Call
 *     </body>
 *   </html>
 *
 * MobileStickyBar is hidden on md+ screens via `md:hidden`.
 * Each page adds `<div className="md:hidden h-16" />` at the bottom to prevent
 * content from being hidden behind the sticky bar on mobile.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export const metadata: Metadata = {
  title: {
    default: "Lumina Stays – Boutique Stay in Vizag",
    template: "%s | Lumina Stays",
  },
  description:
    "A premium 12-room boutique stay in Visakhapatnam (Vizag), Andhra Pradesh. Ocean-facing rooms, curated amenities, and warm hospitality.",
  keywords: ["Vizag stay", "Visakhapatnam hotel", "boutique stay Vizag", "Lumina Stays", "beach stay Vizag"],
  authors: [{ name: "Lumina Stays" }],
  openGraph: {
    title: "Lumina Stays – Boutique Stay in Vizag",
    description: "A premium boutique stay in Visakhapatnam. Wake up to the sound of waves.",
    url: "https://luminastays.in",
    siteName: "Lumina Stays",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina Stays – Boutique Stay in Vizag",
    description: "A premium boutique stay in Visakhapatnam. Wake up to the sound of waves.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d7070",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
