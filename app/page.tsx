import Link from 'next/link';
import { amenities } from '@/data/site-content';
import { PhotoGallery } from '@/components/photo-gallery';

export default function HomePage() {
  return (
    <div>
      <section className="section-shell space-y-6">
        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">12-room boutique stay • Vizag</span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Stay bright at Lumina Stays</h1>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Experience a calm and modern stay in Andhra Pradesh&apos;s coastal city. Perfect for families, business travelers, and short city breaks.
        </p>
        <Link href="/booking" className="inline-flex rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-soft">
          Book Now
        </Link>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {amenities.map((amenity) => (
            <article key={amenity} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium">
              {amenity}
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-xl font-semibold">Gallery</h2>
        <PhotoGallery />
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-3 text-xl font-semibold">Location</h2>
        <p className="mb-3 text-sm text-slate-600">Near Beach Road, Visakhapatnam, Andhra Pradesh.</p>
        <iframe
          title="Lumina Stays location"
          src="https://maps.google.com/maps?q=visakhapatnam&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-72 w-full rounded-xl border border-slate-200"
          loading="lazy"
        />
      </section>
    </div>
  );
}
