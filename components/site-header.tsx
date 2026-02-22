import Link from 'next/link';

const links = [
  ['Gallery', '/gallery'],
  ['Amenities', '/amenities'],
  ['Location', '/location-contact'],
  ['Book', '/booking']
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold text-brand-900">
          Lumina Stays
        </Link>
        <ul className="hidden items-center gap-5 text-sm font-medium text-slate-700 sm:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
