/**
 * src/components/Navbar.tsx  (Client Component)
 * Sticky navigation bar with two display modes:
 *
 * 1. Transparent + white text  – when on the Home page (/) AND user hasn't scrolled
 *    (overlays the full-screen hero image for a premium look)
 * 2. Sand-50 background + dark text – on all other pages OR once the user scrolls
 *
 * Mobile: hamburger icon opens a slide-in drawer from the right.
 * The drawer closes automatically on route change (useEffect on pathname).
 *
 * Logo uses CSS filters to switch between white (on hero) and dark (on light bg).
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/amenities", label: "Amenities" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book Now" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-sand-50/95 backdrop-blur-md shadow-sm";

  const textColor = isHome && !scrolled
    ? "text-white"
    : "text-gray-800";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          navBg
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className={cn(
              "font-serif text-xl font-bold tracking-[0.08em] transition-colors duration-300",
              isHome && !scrolled ? "text-white" : "text-gray-900"
            )}>
              LUMINA
            </span>
            <span className={cn(
              "text-[10px] font-medium tracking-[0.35em] uppercase transition-colors duration-300",
              isHome && !scrolled ? "text-gold-300" : "text-brand-600"
            )}>
              Stays
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isBooking = link.href === "/booking";
              const isActive = pathname === link.href;
              if (isBooking) {
                return (
                  <li key={link.href}>
          <Link
                  href={link.href}
                  className="ml-3 px-5 py-2 rounded-full bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  Book Now
                </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-brand-600"
                        : cn(textColor, "hover:text-brand-500")
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={cn("md:hidden p-2 rounded-md transition-colors", textColor)}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-64 bg-sand-50 shadow-2xl transition-transform duration-300 flex flex-col pt-20 pb-8 px-6",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-6">
            <div className="flex flex-col items-start leading-none">
            <span className="font-serif text-xl font-bold tracking-[0.08em] text-gray-900">LUMINA</span>
            <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-brand-600">Stays</span>
          </div>
          </div>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isBooking = link.href === "/booking";
              const isActive = pathname === link.href;
              if (isBooking) {
                return (
                  <li key={link.href} className="mt-4">
                    <Link
                      href={link.href}
                      className="block text-center px-5 py-3 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "text-brand-600 bg-brand-50"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto text-xs text-gray-400 text-center">
            luminastays.in
          </div>
        </div>
      </div>
    </>
  );
}
