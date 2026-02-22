export default function LocationContactPage() {
  return (
    <section className="section-shell space-y-4">
      <h1 className="text-3xl font-bold">Location & Contact</h1>
      <p className="text-sm text-slate-600">Near Beach Road, Visakhapatnam, Andhra Pradesh</p>
      <div className="grid gap-2 text-sm sm:grid-cols-3">
        <a className="rounded-lg border border-slate-200 bg-white p-3" href="https://wa.me/919999999999">
          WhatsApp: +91 99999 99999
        </a>
        <a className="rounded-lg border border-slate-200 bg-white p-3" href="tel:+919999999999">
          Phone: +91 99999 99999
        </a>
        <a className="rounded-lg border border-slate-200 bg-white p-3" href="mailto:hello@luminastays.in">
          Email: hello@luminastays.in
        </a>
      </div>
      <iframe
        title="Lumina Stays Map"
        src="https://maps.google.com/maps?q=visakhapatnam&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="h-80 w-full rounded-xl border border-slate-200"
        loading="lazy"
      />
    </section>
  );
}
