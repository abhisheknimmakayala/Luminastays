/**
 * src/app/amenities/page.tsx
 * Amenities & Facilities page for Lumina Stays.
 *
 * Sections: Room Amenities → Facilities → Policies & Services
 * Sections alternate between sand-50 (light) and sand-200 (deeper) backgrounds.
 *
 * What IS offered (verified with owner):
 *   AC, premium bedding, Smart TV, Wi-Fi, attached bathroom,
 *   free parking, complimentary breakfast, 24/7 security, 24h front desk,
 *   UPI payments, concierge service.
 *
 * Intentionally removed: ocean views, in-room dining, fitness corner, rooftop terrace,
 * and room-type cards (all 12 rooms are the same type).
 */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Wifi,
  Wind,
  Coffee,
  Car,
  ShieldCheck,
  Tv,
  Bath,
  CreditCard,
  PhoneCall,
  Clock,
  BedDouble,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "Explore all amenities at Lumina Stays – comfortable rooms, high-speed Wi-Fi, complimentary breakfast, and more in Vizag.",
};

const AMENITY_SECTIONS = [
  {
    title: "Room Amenities",
    desc: "Every room is designed with your comfort in mind.",
    items: [
      { icon: Wind, label: "Air Conditioning", desc: "Inverter AC in all rooms" },
      { icon: BedDouble, label: "Premium Bedding", desc: "400-thread-count cotton linen" },
      { icon: Tv, label: "Smart TV", desc: '43" Android TV with OTT apps' },
      { icon: Wifi, label: "High-Speed Wi-Fi", desc: "200 Mbps fibre, dedicated per room" },
      { icon: Bath, label: "Attached Bathroom", desc: "Hot & cold shower, premium toiletries" },
    ],
  },
  {
    title: "Facilities",
    desc: "Everything you need for a comfortable, worry-free stay.",
    items: [
      { icon: Car, label: "Free Parking", desc: "Secure covered parking on-site" },
      { icon: Coffee, label: "Complimentary Breakfast", desc: "South Indian & continental spread, 7–10 AM" },
      { icon: ShieldCheck, label: "24/7 Security", desc: "CCTV surveillance & night staff" },
      { icon: Clock, label: "24-Hour Front Desk", desc: "Always here when you need us" },
    ],
  },
  {
    title: "Policies & Services",
    desc: "Transparent policies so you can plan with confidence.",
    items: [
      { icon: CreditCard, label: "UPI Payments", desc: "PhonePe & all UPI apps accepted" },
      { icon: PhoneCall, label: "Concierge Service", desc: "Tour arrangements, cab booking, etc." },
      { icon: Clock, label: "Check-in / Check-out", desc: "Check-in 1 PM · Check-out 11 AM" },
    ],
  },
];

export default function AmenitiesPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-24 pb-10 px-4 bg-sand-200 text-center">
        <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Everything Included
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Amenities & Facilities
        </h1>
        <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
          Thoughtfully curated for comfort, convenience, and the Vizag experience.
        </p>
      </div>

      {/* Amenity sections */}
      {AMENITY_SECTIONS.map((section, si) => (
        <section
          key={section.title}
          className={`py-14 px-4 ${si % 2 === 0 ? "bg-sand-50" : "bg-sand-200"}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="mt-1.5 text-gray-500 text-sm">{section.desc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-sand-50 border border-sand-300 shadow-sm hover:border-brand-200 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{label}</h3>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-14 px-4 bg-gradient-to-r from-brand-700 to-brand-500 text-white text-center">
        <h2 className="font-serif text-3xl font-bold">Ready to experience it?</h2>
        <p className="mt-2 text-brand-100">Check availability and book your room directly.</p>
        <Link
          href="/booking"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-brand-700 font-semibold hover:bg-gray-100 active:scale-95 transition-all shadow-md"
        >
          Book Now
        </Link>
      </section>

      <div className="md:hidden h-16" />
    </>
  );
}
