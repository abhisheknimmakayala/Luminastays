/**
 * src/app/contact/page.tsx
 * Contact & Location page for Lumina Stays.
 *
 * Layout: Two-column on md+ (contact methods left, map right), single column on mobile.
 *
 * Contact methods (priority order):
 *  1. WhatsApp  – primary channel, pre-filled message via wa.me
 *  2. Phone call
 *  3. Email     – luminastaysvizag@gmail.com
 *
 * Map: Google Maps embed iframe pointing to Marripalem, VUDA Layout, Vizag.
 *      "Open in Google Maps" links to the owner's pinned location:
 *      https://maps.app.goo.gl/EDS19VCqSfnDqVeH9
 *
 * Nearby landmarks are based on the actual location (Marripalem, Vizag 530009).
 * FAQ: 5 common questions hardcoded – update as needed.
 */
import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock, Instagram, Facebook } from "lucide-react";
import { CONTACT } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Get in touch with Lumina Stays in Vizag. Call, WhatsApp, or email us. Find our location on the map.",
};

const FAQ = [
  {
    q: "What are your check-in and check-out times?",
    a: "Check-in is from 1:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged subject to availability.",
  },
  {
    q: "Is parking available?",
    a: "Yes, we offer complimentary secure on-site parking for all guests.",
  },
  {
    q: "Do you accept group bookings?",
    a: "Absolutely! We have 12 rooms and can accommodate groups. Please WhatsApp or call us for group rates.",
  },
  {
    q: "Is breakfast included?",
    a: "Complimentary breakfast is included with all room types, served daily from 7:00 AM to 10:00 AM.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI payments (PhonePe, Google Pay, Paytm, etc.). Full payment is required at the time of booking.",
  },
];

export default function ContactPage() {
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=Hi!%20I'd%20like%20to%20enquire%20about%20Lumina%20Stays.`;

  return (
    <>
      {/* Header */}
      <div className="pt-24 pb-10 px-4 bg-sand-200 text-center">
        <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          We&apos;re Here to Help
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Contact & Location
        </h1>
        <p className="mt-3 text-gray-500 text-base max-w-lg mx-auto">
          Have questions or want to book? Reach us instantly via WhatsApp — we typically reply in minutes.
        </p>
      </div>

      <section className="py-12 px-4 bg-sand-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* Contact methods */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Get in Touch</h2>

            {/* WhatsApp — primary */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-green-700 text-sm">{CONTACT.phone}</p>
                <p className="text-gray-400 text-xs mt-0.5">Fastest response · Usually within minutes</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-brand-50 border border-brand-100 hover:bg-brand-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-700 transition-colors">
                <Phone size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Call Us</p>
                <p className="text-brand-700 text-sm">{CONTACT.phone}</p>
                <p className="text-gray-400 text-xs mt-0.5">Available 8 AM – 10 PM daily</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center shrink-0">
                <Mail size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-700 text-sm">{CONTACT.email}</p>
                <p className="text-gray-400 text-xs mt-0.5">We reply within a few hours</p>
              </div>
            </a>

            {/* Address + hours */}
            <div className="p-5 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Address</p>
                  <div className="text-gray-500 text-sm mt-0.5 space-y-0.5">
                    {CONTACT.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Front Desk Hours</p>
                  <p className="text-gray-500 text-sm mt-0.5">Open 24 hours · 7 days a week</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-pink-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Map + directions */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5">Find Us</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md h-72 sm:h-96 bg-gray-100">
              <iframe
                src={CONTACT.mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lumina Stays on Google Maps"
              />
            </div>
            <a
              href={CONTACT.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-brand-600 text-sm font-medium hover:underline"
            >
              <MapPin size={14} /> Open in Google Maps →
            </a>

            {/* Nearby landmarks */}
            <div className="mt-6 p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Nearby Landmarks</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  ["Marripalem Children's Park", "2 min walk"],
                  ["VUDA Layout Market", "5 min walk"],
                  ["MVP Colony", "10 min drive"],
                  ["RK Beach", "20 min drive"],
                  ["Vizag Railway Station", "20 min drive"],
                  ["Visakhapatnam Airport", "30 min drive"],
                ].map(([place, time]) => (
                  <li key={place} className="flex items-center justify-between">
                    <span>{place}</span>
                    <span className="text-xs text-brand-600 font-medium bg-brand-50 px-2 py-0.5 rounded-full">
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-sand-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div
                key={q}
                className="p-5 rounded-2xl bg-sand-50 border border-sand-300"
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{q}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="md:hidden h-16" />
    </>
  );
}
