/**
 * src/app/booking/BookingForm.tsx  (Client Component)
 * Multi-step booking form for Lumina Stays.
 *
 * Flow:
 *  1. Date selection  – react-day-picker DateRange; disables past dates
 *  2. Room type       – radio group with 3 options (Standard / Sea View / Suite)
 *  3. Guest count     – stepper (1–4 guests)
 *  4. Guest details   – name + phone (validated on submit)
 *  5. Submission      – no payment taken here; shows a summary and opens WhatsApp
 *                       with a pre-filled booking request message for the host to confirm
 *
 * Price breakdown:
 *  - Subtotal = nights × room nightly rate
 *  - Tax      = 12% GST
 *  - Total    = subtotal + tax
 *
 * Payment integration (PhonePe UPI) is planned for a future sprint.
 * For now the booking request is confirmed manually via WhatsApp by the property owner.
 *
 * ROOM_TYPES – defined inline; prices in INR. Sync with DB once Prisma is set up.
 */
"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInCalendarDays, addDays, isBefore, startOfToday } from "date-fns";
import {
  CalendarDays,
  User,
  Phone,
  Users,
  BedDouble,
  ChevronDown,
  CheckCircle2,
  Info,
} from "lucide-react";
import Link from "next/link";
import { cn, PRICE_PER_NIGHT, CONTACT } from "@/lib/utils";

import "react-day-picker/dist/style.css";

const ROOM_TYPES = [
  { id: "standard", label: "Standard Room", price: 3500, desc: "Double bed · AC · TV · Wi-Fi" },
  { id: "seaview", label: "Sea View Room", price: 4500, desc: "King bed · Sea-facing balcony · Premium", badge: "Popular" },
  { id: "suite", label: "Suite", price: 6500, desc: "King bed · Living area · Bathtub · Sea view" },
];

const today = startOfToday();

export default function BookingForm() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [roomType, setRoomType] = useState(ROOM_TYPES[1]);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  const subtotal = nights * roomType.price;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const waBookingUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hi! I'd like to book a stay at Lumina Stays.\n\nDetails:\n- Room: ${roomType.label}\n- Check-in: ${range?.from ? format(range.from, "dd MMM yyyy") : "TBD"}\n- Check-out: ${range?.to ? format(range.to, "dd MMM yyyy") : "TBD"}\n- Nights: ${nights}\n- Guests: ${guests}\n- Name: ${name}\n- Phone: ${phone}\n- Total: ₹${total.toLocaleString("en-IN")}\n\nPlease confirm availability.`
  )}`;

  function validate() {
    const e: Record<string, string> = {};
    if (!range?.from || !range?.to) e.dates = "Please select check-in and check-out dates.";
    if (nights < 1) e.dates = "Minimum stay is 1 night.";
    if (!name.trim()) e.name = "Please enter your name.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a valid 10-digit phone number.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="py-16 px-4 bg-sand-50">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Booking Request Received!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            Thank you, <strong>{name}</strong>! We&apos;ve received your booking request for{" "}
            <strong>{range?.from && format(range.from, "dd MMM")}</strong> –{" "}
            <strong>{range?.to && format(range.to, "dd MMM yyyy")}</strong>.<br />
            We&apos;ll confirm via WhatsApp or call within a few minutes.
          </p>
          <div className="bg-sand-200 rounded-2xl p-5 text-left space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Room</span>
              <span className="font-medium">{roomType.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nights</span>
              <span className="font-medium">{nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Guests</span>
              <span className="font-medium">{guests}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-bold text-brand-700">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <a
            href={waBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow"
          >
            Confirm on WhatsApp
          </a>
          <div className="mt-4">
            <Link href="/" className="text-brand-600 text-sm hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 bg-sand-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8"
      >
        {/* Left: inputs */}
        <div className="space-y-8">

          {/* Step 1: Dates */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Select Dates
            </h2>
            <div className="rounded-2xl border border-gray-200 overflow-hidden p-4 bg-sand-50">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 2}
                disabled={{ before: addDays(today, 0) }}
                className="!font-sans text-sm"
                classNames={{
                  day_selected: "bg-brand-600 text-white rounded-full",
                  day_range_middle: "bg-brand-100 text-brand-900",
                  day_range_end: "bg-brand-600 text-white rounded-full",
                  day_today: "font-bold text-brand-600",
                  day: "rounded-full hover:bg-brand-50 transition-colors",
                }}
              />
            </div>
            {range?.from && range?.to && (
              <div className="mt-3 flex gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 bg-brand-50 rounded-lg">
                  <CalendarDays size={14} className="text-brand-600" />
                  <span className="text-brand-900 font-medium">
                    {format(range.from, "dd MMM")} → {format(range.to, "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-brand-50 rounded-lg">
                  <span className="text-brand-900 font-medium">{nights} night{nights !== 1 ? "s" : ""}</span>
                </div>
              </div>
            )}
            {errors.dates && (
              <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                <Info size={12} /> {errors.dates}
              </p>
            )}
          </div>

          {/* Step 2: Room type */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Choose Room Type
            </h2>
            <div className="space-y-3">
              {ROOM_TYPES.map((rt) => (
                <label
                  key={rt.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    roomType.id === rt.id
                      ? "border-brand-600 bg-brand-50"
                      : "border-sand-300 bg-sand-50 hover:border-brand-200"
                  )}
                >
                  <input
                    type="radio"
                    name="roomType"
                    value={rt.id}
                    checked={roomType.id === rt.id}
                    onChange={() => setRoomType(rt)}
                    className="sr-only"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <BedDouble size={16} className="text-brand-600 shrink-0" />
                      <span className="font-semibold text-gray-900 text-sm">{rt.label}</span>
                      {rt.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-gold-400 text-white text-[10px] font-semibold">
                          {rt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 pl-6">{rt.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-brand-700 font-bold text-sm">₹{rt.price.toLocaleString("en-IN")}</p>
                    <p className="text-gray-400 text-xs">/ night</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Guests */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Number of Guests
            </h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg font-bold"
              >
                −
              </button>
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Users size={18} className="text-brand-600" />
                <span>{guests}</span>
                <span className="text-sm font-normal text-gray-400">guest{guests !== 1 ? "s" : ""}</span>
              </div>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(4, g + 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Step 4: Guest details */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              Your Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-400",
                      errors.name ? "border-red-400" : "border-gray-300"
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={cn(
                      "w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-400",
                      errors.phone ? "border-red-400" : "border-gray-300"
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Price summary sticky card */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-brand-700 px-5 py-4 text-white">
              <h3 className="font-serif text-lg font-semibold">Booking Summary</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Room */}
              <div className="flex items-center gap-3">
                <BedDouble size={16} className="text-brand-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{roomType.label}</p>
                  <p className="text-xs text-gray-400">₹{roomType.price.toLocaleString("en-IN")} / night</p>
                </div>
              </div>

              {/* Dates */}
              {range?.from && range?.to ? (
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} className="text-brand-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {format(range.from, "dd MMM")} – {format(range.to, "dd MMM yyyy")}
                    </p>
                    <p className="text-xs text-gray-400">{nights} night{nights !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} className="text-gray-300" />
                  <p className="text-sm text-gray-400 italic">No dates selected</p>
                </div>
              )}

              {/* Guests */}
              <div className="flex items-center gap-3">
                <Users size={16} className="text-brand-600" />
                <p className="text-sm text-gray-800">{guests} guest{guests !== 1 ? "s" : ""}</p>
              </div>

              {/* Price breakdown */}
              {nights > 0 && (
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      ₹{roomType.price.toLocaleString("en-IN")} × {nights} night{nights !== 1 ? "s" : ""}
                    </span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & fees (12%)</span>
                    <span>₹{taxes.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-brand-700">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 active:scale-95 transition-all shadow-sm mt-2"
              >
                Request Booking
              </button>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                No payment now. We&apos;ll confirm via WhatsApp and send a UPI payment link.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              "Best price guarantee",
              "Instant WhatsApp confirmation",
              "Free cancellation 48h prior",
              "UPI payment – safe & easy",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-1.5 text-xs text-gray-600 bg-sand-50 rounded-lg px-3 py-2"
              >
                <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
}
