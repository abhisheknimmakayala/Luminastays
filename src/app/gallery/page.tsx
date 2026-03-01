/**
 * src/app/gallery/page.tsx
 * Full photo gallery for Lumina Stays.
 *
 * Layout: CSS columns (masonry-style) – 1 col mobile, 2 col sm, 3 col lg.
 * Images: All from Unsplash (placeholder). Replace with real property photos.
 *         First 3 images are eager-loaded; rest are lazy for performance.
 *
 * Filter tabs (All / Rooms / Views) are visual-only in this MVP.
 * Wire up filtering logic once real photos are categorised.
 *
 * GALLERY_ITEMS categories kept: Rooms, Views (Common Areas + Dining removed).
 */
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore photos of Lumina Stays – our rooms, sea views, rooftop, and surroundings in Vizag.",
};

const GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
    alt: "Ocean view from room balcony",
    category: "Rooms",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80",
    alt: "Cozy bedroom with warm lighting",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80",
    alt: "Modern bathroom interior",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
    alt: "Pool area at sunset",
    category: "Common Areas",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80",
    alt: "Aerial view of coastal property",
    category: "Views",
  },
  {
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&q=80",
    alt: "Rooftop terrace at golden hour",
    category: "Common Areas",
  },
  {
    src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=700&q=80",
    alt: "Premium suite with balcony",
    category: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1601565415267-724db0e1f4c2?w=700&q=80",
    alt: "Breakfast spread",
    category: "Dining",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    alt: "South Indian breakfast",
    category: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=700&q=80",
    alt: "Beach at sunrise from property",
    category: "Views",
  },
  {
    src: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=700&q=80",
    alt: "Garden and outdoor seating",
    category: "Common Areas",
  },
  {
    src: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=700&q=80",
    alt: "Lobby and reception area",
    category: "Common Areas",
  },
];

const CATEGORIES = ["All", "Rooms", "Views"];

export default function GalleryPage() {
  return (
    <>
      {/* Page header */}
      <div className="pt-24 pb-10 px-4 bg-sand-200 text-center">
        <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Our Property
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Photo Gallery
        </h1>
        <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
          A visual tour of Lumina Stays — from ocean-facing rooms to
          sun-drenched common areas.
        </p>
      </div>

      {/* Filter tabs (visual only for MVP) */}
      <div className="sticky top-16 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-300">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto scrollbar-hide py-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                cat === "All"
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-sand-100 text-gray-600 border-sand-300 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <section className="py-10 px-4 bg-sand-50">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.src}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-gray-100"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.wide ? 900 : 700}
                  height={item.wide ? 600 : 500}
                  loading={i < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs text-brand-200 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <p className="text-white text-sm font-medium mt-0.5">{item.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-sand-200 text-center">
        <p className="text-gray-600 text-base mb-4">
          Like what you see? Experience it in person.
        </p>
        <a
          href="/booking"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 active:scale-95 transition-all"
        >
          Book a Stay
        </a>
      </section>

      {/* Mobile sticky bar padding */}
      <div className="md:hidden h-16" />
    </>
  );
}
