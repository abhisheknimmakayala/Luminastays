import type { Metadata } from "next";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Book a room at Lumina Stays, Vizag. Check availability, choose your dates, and pay securely via UPI.",
};

export default function BookingPage() {
  return (
    <>
      <div className="pt-24 pb-10 px-4 bg-sand-200 text-center">
        <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Direct Booking · Best Rate
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Book Your Stay
        </h1>
        <p className="mt-3 text-gray-500 text-base max-w-lg mx-auto">
          Reserve your room at Lumina Stays directly — no booking fees, instant confirmation.
        </p>
      </div>

      <BookingForm />

      <div className="md:hidden h-16" />
    </>
  );
}
