# Lumina Stays — luminastays.in

A production-ready, mobile-first booking website for a 12-room boutique stay in Visakhapatnam, Andhra Pradesh.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS** — mobile-first design
- **react-day-picker** — date range picker for bookings
- **Lucide React** — icons

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, intro, amenities, gallery, location, CTA |
| `/gallery` | Full photo gallery with lazy-loaded, optimized images |
| `/amenities` | Room types and full amenities list |
| `/contact` | WhatsApp, phone, email, embedded Google Map, FAQ |
| `/booking` | Date picker, room selector, guest form → WhatsApp confirmation |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer, MobileStickyBar)
│   ├── page.tsx            # Home page
│   ├── gallery/page.tsx    # Gallery page
│   ├── amenities/page.tsx  # Amenities page
│   ├── contact/page.tsx    # Contact & Location page
│   └── booking/
│       ├── page.tsx        # Booking page (server)
│       └── BookingForm.tsx # Date picker + form (client)
├── components/
│   ├── Navbar.tsx          # Sticky nav, transparent on hero, mobile drawer
│   ├── Footer.tsx          # Footer with links + contact
│   └── MobileStickyBar.tsx # Fixed bottom bar: Book Now / WhatsApp / Call
└── lib/
    └── utils.ts            # cn(), CONTACT constants, PRICE_PER_NIGHT
```

## Environment Variables

Copy `.env.local` and fill in:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER="919XXXXXXXXX"   # Without +, with country code
NEXT_PUBLIC_PHONE_NUMBER="+91 9XXXXXXXXX"
NEXT_PUBLIC_EMAIL="hello@luminastays.in"
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?..."
```

## Next Steps

- [ ] Add Neon Postgres + Prisma for real availability tracking
- [ ] Integrate PhonePe payment gateway
- [ ] Real-time room availability API
- [ ] Admin dashboard for managing bookings
