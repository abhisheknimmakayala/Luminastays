import { amenities } from '@/data/site-content';

export default function AmenitiesPage() {
  return (
    <section className="section-shell">
      <h1 className="mb-4 text-3xl font-bold">Amenities</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {amenities.map((item) => (
          <div key={item} className="rounded-xl border border-slate-200 bg-white p-4">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
