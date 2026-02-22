import Link from 'next/link';

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-soft sm:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 text-xs font-semibold">
        <Link href="/booking" className="rounded-lg bg-brand-700 px-2 py-3 text-center text-white">
          Book Now
        </Link>
        <a href="https://wa.me/919999999999" className="rounded-lg bg-emerald-600 px-2 py-3 text-center text-white">
          WhatsApp
        </a>
        <a href="tel:+919999999999" className="rounded-lg bg-slate-900 px-2 py-3 text-center text-white">
          Call
        </a>
      </div>
    </div>
  );
}
