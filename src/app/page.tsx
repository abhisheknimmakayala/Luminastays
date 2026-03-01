/**
 * src/app/page.tsx
 * Home page for Lumina Stays – 12-room boutique stay in Visakhapatnam.
 *
 * Sections (in order):
 *  1. Hero        – Full-viewport image with logo, headline, CTA buttons, scroll indicator
 *  2. Intro       – Welcome copy, 3 key stats (rooms, distance to beach, rating)
 *  3. Amenities   – 5-card icon grid linking to /amenities
 *  4. Gallery     – Desktop: CSS grid preview; Mobile: horizontal scroll strip
 *  5. Reviews     – 3 hardcoded guest testimonials (dark teal section)
 *  6. Location    – Google Maps embed + Get Directions CTA
 *  7. CTA Banner  – Full-width gradient call to action → /booking
 *
 * All placeholder images are from Unsplash (free tier).
 * Replace with real property photos before launch.
 *
 * GALLERY_IMAGES – first image is eager-loaded (priority); rest are lazy.
 * AMENITIES      – reflects what is actually offered (no ocean view / rooftop / dining).
 * REVIEWS        – hardcoded for MVP; replace with DB-backed reviews post-launch.
 */
import Image from "next/image";
import Link from "next/link";
import {
  Wifi,
  Wind,
  Coffee,
  Car,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Star,
} from "lucide-react";
import { CONTACT } from "@/lib/utils";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    alt: "Lumina Stays ocean view room",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    alt: "Cozy bedroom interior",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Bathroom with natural light",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    alt: "Pool area at sunset",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    alt: "Rooftop view Vizag",
    span: "",
  },
];

const AMENITIES = [
  { icon: Wifi, label: "High-Speed Wi-Fi", desc: "Fibre broadband in every room" },
  { icon: Wind, label: "AC Rooms", desc: "Climate control in all 12 rooms" },
  { icon: Coffee, label: "Complimentary Breakfast", desc: "South Indian & continental options" },
  { icon: Car, label: "Free Parking", desc: "Secure on-site parking" },
  { icon: ShieldCheck, label: "24/7 Security", desc: "CCTV & round-the-clock staff" },
];

const REVIEWS = [
  {
    name: "Priya R.",
    location: "Hyderabad",
    rating: 5,
    text: "Absolutely stunning property! The sea-facing room was worth every rupee. Breakfast was delicious and staff were so warm.",
  },
  {
    name: "Karthik M.",
    location: "Bangalore",
    rating: 5,
    text: "Perfect getaway from the city rush. Clean, modern rooms with an unbeatable view. Will definitely be back!",
  },
  {
    name: "Ananya S.",
    location: "Chennai",
    rating: 5,
    text: "The rooftop at sunset is magical. Lumina Stays is our go-to whenever we visit Vizag — highly recommended!",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[580px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=85"
          alt="Lumina Stays – beachside view, Vizag"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero-gradient" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          {/* Logo on hero */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <Image
              src="/logo.png"
              alt="Lumina Stays"
              width={200}
              height={80}
              className="object-contain brightness-0 invert drop-shadow-lg"
              priority
            />
          </div>
          <p className="text-gold-300 text-sm font-medium tracking-[0.2em] uppercase mb-3 animate-fade-in">
            Visakhapatnam · Andhra Pradesh
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight text-balance animate-fade-up">
            Your Escape to the
            <br />
            <span className="text-gold-300 italic">Bay of Bengal</span>
          </h1>
          <p className="mt-4 text-white/85 text-base sm:text-lg leading-relaxed animate-fade-up animate-delay-100">
            A boutique 12-room retreat where the ocean is your neighbour
            and every morning begins with a sunrise.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up animate-delay-200">
            <Link
              href="/booking"
              className="px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold text-base hover:bg-brand-700 active:scale-95 transition-all shadow-lg"
            >
              Book Your Stay
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-3.5 rounded-full bg-white/15 backdrop-blur text-white font-medium text-base border border-white/30 hover:bg-white/25 active:scale-95 transition-all"
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-sand-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Welcome to Lumina Stays
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 text-balance leading-snug">
            Where Coastal Calm Meets<br className="hidden sm:block" /> Modern Comfort
          </h2>
          <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Nestled along the pristine shoreline of Rushikonda Beach, Lumina Stays
            is a handcrafted 12-room boutique property designed for travellers who
            value peace, privacy, and personality. Every room is thoughtfully
            furnished with locally sourced materials and modern amenities — all
            just steps away from the ocean.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-brand-600 font-medium">
            <MapPin size={15} />
            <span>Marripalem, VUDA Layout, Visakhapatnam – 530009</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 max-w-3xl mx-auto grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { value: "12", label: "Boutique Rooms" },
            { value: "100m", label: "From the Beach" },
            { value: "4.9★", label: "Guest Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-brand-700">{value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AMENITIES ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-sand-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Amenities & Facilities
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {AMENITIES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group p-5 rounded-2xl bg-sand-100 hover:bg-brand-50 border border-sand-300 hover:border-brand-100 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center mb-3 transition-colors">
                  <Icon size={20} className="text-brand-700" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{label}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-1.5 text-brand-600 font-medium text-sm hover:gap-2.5 transition-all"
            >
              View all amenities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ──────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-sand-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Take a Look Around
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Photo Gallery
            </h2>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-3 h-[420px]">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-2xl ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="flex sm:hidden gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="relative shrink-0 w-64 h-44 rounded-2xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-brand-600 text-brand-600 font-medium text-sm hover:bg-brand-50 transition-colors"
            >
              View Full Gallery <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-brand-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Guest Stories
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              What Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-brand-800/60 backdrop-blur border border-brand-700 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-brand-100 text-sm leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{r.name}</p>
                    <p className="text-brand-400 text-xs">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 bg-sand-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Find Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Our Location
            </h2>
            <p className="mt-3 text-gray-500 text-sm">Marripalem, VUDA Layout, Visakhapatnam – 530009</p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-64 sm:h-96 bg-gray-100">
            <iframe
              src={CONTACT.mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lumina Stays location on Google Maps"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://maps.app.goo.gl/EDS19VCqSfnDqVeH9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors"
            >
              <MapPin size={15} /> Get Directions
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-700 to-brand-500 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-balance">
            Ready for your Vizag retreat?
          </h2>
          <p className="mt-3 text-brand-100 text-base">
            Book directly and get the best rate — no booking fees.
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-brand-700 font-semibold text-base hover:bg-gray-100 active:scale-95 transition-all shadow-md"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Bottom padding for mobile sticky bar */}
      <div className="md:hidden h-16" />
    </>
  );
}
