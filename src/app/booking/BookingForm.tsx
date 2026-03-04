"use client";

import { useState, useEffect, useCallback } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInCalendarDays, addDays, startOfToday } from "date-fns";
import {
  CalendarDays,
  User,
  Phone,
  Users,
  BedDouble,
  CheckCircle2,
  Info,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { cn, CONTACT } from "@/lib/utils";

const SITE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL ?? "https://luminastays.in";

import "react-day-picker/dist/style.css";

const PRICE_PER_NIGHT = 2500;
const GUESTS_PER_ROOM = 2;
const TOTAL_ROOMS = 12;

const today = startOfToday();

type AvailabilityResult = {
  available: number;
  total: number;
} | null;

export default function BookingForm() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availability, setAvailability] = useState<AvailabilityResult>(null);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [bookedRoomCount, setBookedRoomCount] = useState<number>(1);

  const maxRooms = availability ? Math.min(availability.available, TOTAL_ROOMS) : TOTAL_ROOMS;
  const maxGuests = rooms * GUESTS_PER_ROOM;

  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  const subtotal = nights * PRICE_PER_NIGHT * rooms;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const confirmLink = `${SITE_URL}/api/bookings/${bookingId}/confirm?secret=lumina-confirm-2026`;
  const waOwnerUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `🏨 New Booking Request — Lumina Stays\n\n` +
    `Booking ID: #${bookingId}\n` +
    `Rooms: ${bookedRoomCount}\n` +
    `Check-in: ${range?.from ? format(range.from, "dd MMM yyyy") : "TBD"}\n` +
    `Check-out: ${range?.to ? format(range.to, "dd MMM yyyy") : "TBD"}\n` +
    `Nights: ${nights}\n` +
    `Guests: ${guests}\n` +
    `Guest Name: ${name}\n` +
    `Guest Phone: ${phone}\n` +
    `Total: ₹${total.toLocaleString("en-IN")}\n\n` +
    `✅ Tap to confirm this booking:\n${confirmLink}`
  )}`;

  const checkAvailability = useCallback(async (from: Date, to: Date) => {
    setCheckingAvailability(true);
    setAvailability(null);
    setAvailabilityError(false);
    try {
      const res = await fetch(
        `/api/availability?checkIn=${format(from, "yyyy-MM-dd")}&checkOut=${format(to, "yyyy-MM-dd")}`
      );
      const data = await res.json();
      if (res.ok && data.availability?.length > 0) {
        const roomType = data.availability[0];
        setAvailability({ available: roomType.available, total: roomType.total });
      } else if (res.ok) {
        setAvailability({ available: 0, total: TOTAL_ROOMS });
      } else {
        setAvailabilityError(true);
      }
    } catch {
      setAvailabilityError(true);
    } finally {
      setCheckingAvailability(false);
    }
  }, []);

  useEffect(() => {
    if (range?.from && range?.to) {
      checkAvailability(range.from, range.to);
    } else {
      setAvailability(null);
      setAvailabilityError(false);
    }
  }, [range, checkAvailability]);

  // Clamp rooms & guests when availability changes
  useEffect(() => {
    if (availability) {
      const clampedRooms = Math.max(1, Math.min(rooms, availability.available));
      setRooms(clampedRooms);
      setGuests((g) => Math.max(1, Math.min(g, clampedRooms * GUESTS_PER_ROOM)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availability]);

  function validate() {
    const e: Record<string, string> = {};
    if (!range?.from || !range?.to) e.dates = "Please select check-in and check-out dates.";
    else if (nights < 1) e.dates = "Minimum stay is 1 night.";
    if (availability !== null && availability.available === 0)
      e.dates = "No rooms available for the selected dates. Please choose different dates.";
    if (availability !== null && rooms > availability.available)
      e.rooms = `Only ${availability.available} rooms available. Please reduce your selection.`;
    if (!name.trim()) e.name = "Please enter your full name.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a valid 10-digit phone number.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType: "standard",
          checkIn: format(range!.from!, "yyyy-MM-dd"),
          checkOut: format(range!.to!, "yyyy-MM-dd"),
          rooms,
          guests,
          guestName: name,
          guestPhone: phone,
          guestEmail: email || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setBookingId(data.primaryId);
      setBookedRoomCount(data.roomCount);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-16 px-4 bg-sand-50">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-amber-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-1">
            Hi <strong>{name}</strong>, your request{" "}
            <strong className="text-brand-700">#{bookingId}</strong> is saved as{" "}
            <span className="font-semibold text-amber-600">Pending</span>.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Tap below to send your booking details to the owner on WhatsApp.
            Once they confirm, you&apos;ll get a WhatsApp reply and the status will change to{" "}
            <span className="font-semibold text-green-600">Confirmed</span>.
          </p>

          {/* Booking summary */}
          <div className="bg-sand-200 rounded-2xl p-5 text-left space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-medium text-brand-700">#{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Rooms</span>
              <span className="font-medium">{bookedRoomCount} Standard room{bookedRoomCount !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dates</span>
              <span className="font-medium">
                {range?.from && format(range.from, "dd MMM")} – {range?.to && format(range.to, "dd MMM yyyy")}
              </span>
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

          {/* Single WhatsApp button → sends to owner */}
          <a
            href={waOwnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-green-600 text-white font-semibold text-base hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send Booking Request to Owner
          </a>
          <p className="mt-3 text-xs text-gray-400 leading-relaxed">
            This opens WhatsApp with your booking details pre-filled. Just tap Send.
            The owner will confirm and reply to you directly.
          </p>

          <div className="mt-5">
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

            {/* Check-in selected, waiting for check-out */}
            {range?.from && !range?.to && (
              <div className="mt-3 flex flex-wrap gap-3 text-sm items-center">
                <div className="flex items-center gap-2 px-3 py-2 bg-brand-50 border border-brand-200 rounded-lg">
                  <CheckCircle2 size={14} className="text-brand-600" />
                  <span className="text-brand-900 font-medium">
                    Check-in: {format(range.from, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
                  <CalendarDays size={14} />
                  <span>Now select your check-out date</span>
                </div>
              </div>
            )}

            {/* Both dates selected */}
            {range?.from && range?.to && (
              <div className="mt-3 flex flex-wrap gap-3 text-sm items-center">
                <div className="flex items-center gap-2 px-3 py-2 bg-brand-50 rounded-lg">
                  <CalendarDays size={14} className="text-brand-600" />
                  <span className="text-brand-900 font-medium">
                    {format(range.from, "dd MMM")} → {format(range.to, "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-brand-50 rounded-lg">
                  <span className="text-brand-900 font-medium">{nights} night{nights !== 1 ? "s" : ""}</span>
                </div>

                {/* Availability badge */}
                {checkingAvailability && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 rounded-lg text-gray-500">
                    <Loader2 size={13} className="animate-spin" />
                    <span>Checking availability…</span>
                  </div>
                )}
                {!checkingAvailability && availability !== null && (
                  <div className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs",
                    availability.available > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  )}>
                    {availability.available > 0 ? (
                      <><CheckCircle2 size={13} /> {availability.available} of {availability.total} rooms available</>
                    ) : (
                      <><AlertCircle size={13} /> Fully booked for these dates</>
                    )}
                  </div>
                )}
                {!checkingAvailability && availabilityError && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-xs">
                    <AlertCircle size={13} /> Could not check availability — try again
                  </div>
                )}
              </div>
            )}

            {errors.dates && (
              <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                <Info size={12} /> {errors.dates}
              </p>
            )}
          </div>

          {/* Step 2: Number of Rooms */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Number of Rooms
            </h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setRooms((r) => Math.max(1, r - 1));
                  setGuests((g) => Math.min(g, (rooms - 1) * GUESTS_PER_ROOM || 1));
                }}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg font-bold"
              >
                −
              </button>
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <BedDouble size={18} className="text-brand-600" />
                <span>{rooms}</span>
                <span className="text-sm font-normal text-gray-400">room{rooms !== 1 ? "s" : ""}</span>
              </div>
              <button
                type="button"
                onClick={() => setRooms((r) => Math.min(maxRooms, r + 1))}
                disabled={rooms >= maxRooms}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
              <span className="text-xs text-gray-400 ml-1">
                max {maxRooms} available
              </span>
            </div>
            {errors.rooms && (
              <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                <Info size={12} /> {errors.rooms}
              </p>
            )}
          </div>

          {/* Step 3: Room info */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Room Type
            </h2>
            <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-brand-600 bg-brand-50">
              <BedDouble size={20} className="text-brand-600 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Standard Room</p>
                <p className="text-gray-500 text-xs mt-0.5">King bed · AC · TV · Wi-Fi · {GUESTS_PER_ROOM} guests per room</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-brand-700 font-bold">₹{PRICE_PER_NIGHT.toLocaleString("en-IN")}</p>
                <p className="text-gray-400 text-xs">/ room / night</p>
              </div>
            </div>
          </div>

          {/* Step 4: Guests */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">4</span>
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
                onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                disabled={guests >= maxGuests}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
              <span className="text-xs text-gray-400 ml-1">
                max {maxGuests} ({rooms} room{rooms !== 1 ? "s" : ""} × {GUESTS_PER_ROOM})
              </span>
            </div>
          </div>

          {/* Step 5: Guest details */}
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg mb-4">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">5</span>
              Your Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
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
              <div className="flex items-center gap-3">
                <BedDouble size={16} className="text-brand-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Standard Room × {rooms}</p>
                  <p className="text-xs text-gray-400">₹{PRICE_PER_NIGHT.toLocaleString("en-IN")} / room / night</p>
                </div>
              </div>

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
              ) : range?.from ? (
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} className="text-brand-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Check-in: {format(range.from, "dd MMM yyyy")}
                    </p>
                    <p className="text-xs text-amber-600 italic">Select check-out date</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} className="text-gray-300" />
                  <p className="text-sm text-gray-400 italic">No dates selected</p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Users size={16} className="text-brand-600" />
                <p className="text-sm text-gray-800">{guests} guest{guests !== 1 ? "s" : ""}</p>
              </div>

              {nights > 0 && (
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>₹{PRICE_PER_NIGHT.toLocaleString("en-IN")} × {rooms} room{rooms !== 1 ? "s" : ""} × {nights} night{nights !== 1 ? "s" : ""}</span>
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

              {submitError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-xs">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || checkingAvailability}
                className="w-full py-3.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 active:scale-95 transition-all shadow-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving booking…</>
                ) : "Request Booking"}
              </button>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                No payment now. We&apos;ll confirm via WhatsApp and send a UPI payment link.
              </p>
            </div>
          </div>

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
