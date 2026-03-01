import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { CONTACT } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="mb-3">
            <Image src="/logo.png" alt="Lumina Stays" width={140} height={56} className="object-contain brightness-0 invert" />
          </div>
          <p className="text-brand-200 text-sm leading-relaxed">
            A boutique 12-room seaside retreat in the heart of Vizag.
            Wake up to the sound of waves and the warmth of hospitality.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-300 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/gallery", label: "Gallery" },
              { href: "/amenities", label: "Amenities" },
              { href: "/contact", label: "Contact" },
              { href: "/booking", label: "Book Now" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-200 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-300 mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-brand-200">
            <li className="flex gap-3">
              <MapPin size={16} className="shrink-0 mt-0.5 text-brand-400" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="shrink-0 text-brand-400" />
              <a href={`tel:${CONTACT.phone}`} className="hover:text-white transition-colors">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="shrink-0 text-brand-400" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 py-4 px-4 text-center text-xs text-brand-400">
        © {new Date().getFullYear()} Lumina Stays. All rights reserved. · Visakhapatnam, Andhra Pradesh, India
      </div>
    </footer>
  );
}
