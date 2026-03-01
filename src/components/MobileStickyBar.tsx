/**
 * src/components/MobileStickyBar.tsx  (Client Component)
 * Fixed bottom action bar shown ONLY on mobile (hidden md+).
 *
 * Three actions:
 *  1. Book Now  – links to /booking
 *  2. WhatsApp  – opens wa.me with a pre-filled message (number from CONTACT util)
 *  3. Call Us   – tel: link
 *
 * Each page must add `<div className="md:hidden h-16" />` before </> to prevent
 * the last content section from being obscured by this bar.
 */
"use client";

import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { CONTACT } from "@/lib/utils";

export default function MobileStickyBar() {
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=Hi!%20I'd%20like%20to%20book%20a%20stay%20at%20Lumina%20Stays.`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sand-50 border-t border-sand-300 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] safe-area-pb">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        {/* Book Now */}
        <Link
          href="/booking"
          className="flex flex-col items-center gap-1 py-3 bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 transition-colors"
        >
          <CalendarCheck size={20} />
          <span className="text-xs font-semibold">Book Now</span>
        </Link>

        {/* WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-green-700 hover:bg-green-50 active:bg-green-100 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${CONTACT.phone}`}
          className="flex flex-col items-center gap-1 py-3 text-brand-700 hover:bg-brand-50 active:bg-brand-100 transition-colors"
        >
          <Phone size={20} />
          <span className="text-xs font-medium">Call Us</span>
        </a>
      </div>
    </div>
  );
}
