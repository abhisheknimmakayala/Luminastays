'use client';

import { useEffect, useState } from 'react';
import { AvailabilityDay, AvailabilityGrid } from '@/components/availability-grid';

export default function BookingPage() {
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);

  useEffect(() => {
    const from = new Date().toISOString().slice(0, 10);
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 7);
    const to = toDate.toISOString().slice(0, 10);

    fetch(`/api/availability?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((data: { days: AvailabilityDay[] }) => setAvailability(data.days))
      .catch(() => setAvailability([]));
  }, []);

  return (
    <section className="section-shell space-y-5">
      <h1 className="text-3xl font-bold">Book your stay</h1>
      <form className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input type="date" className="rounded-lg border border-slate-300 p-3 text-sm" aria-label="Check-in" required />
          <input type="date" className="rounded-lg border border-slate-300 p-3 text-sm" aria-label="Check-out" required />
          <input type="text" placeholder="Guest Name" className="rounded-lg border border-slate-300 p-3 text-sm" required />
          <input type="tel" placeholder="Phone Number" className="rounded-lg border border-slate-300 p-3 text-sm" required />
        </div>
        <article className="rounded-lg bg-slate-50 p-3 text-sm">
          <p>Nightly Price: ₹2,500</p>
          <p>Total (est.): ₹5,000</p>
        </article>
        <button type="button" className="w-full rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white">
          Proceed to Pay (UPI)
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Availability (remaining rooms)</h2>
        <AvailabilityGrid days={availability} />
      </div>
    </section>
  );
}
