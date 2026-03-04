/**
 * src/lib/utils.ts
 * Shared utilities and site-wide constants for Lumina Stays.
 *
 * CONTACT  – Business contact details. Update phone/WhatsApp numbers in .env.local
 *            (NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_PHONE_NUMBER).
 *            Email and address are hardcoded here as they don't change often.
 *
 * PRICE_PER_NIGHT – Base nightly rate in INR (MVP: single price config).
 *                   Replace with DB lookup once Neon Postgres + Prisma are wired up.
 *
 * TOTAL_ROOMS     – Maximum bookable rooms (12). Used for availability checks later.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_OWNER ?? "917799771916",
  phone: "+91 77997 71916",
  email: "luminastaysvizag@gmail.com",
  address: "Plot No. 121/B, Opp Children's Park, PF Office Road, Marripalem, VUDA Layout, Visakhapatnam – 530009",
  addressLines: [
    "Lumina Stays, Plot No. 121/B,",
    "Opp Children's Park, PF Office Road,",
    "Marripalem, VUDA Layout,",
    "Visakhapatnam – 530009",
  ],
  mapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d952.8693185!2d83.2439395!3d17.7456678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a396711d138942b%3A0xee53a48b9ffbe34e!2sLumina%20Stays!5e0!3m2!1sen!2sin!4v1709000000000",
  mapsDirectionsUrl:
    "https://www.google.com/maps/place/Lumina+Stays/@17.7456678,83.2439395,19z/data=!3m1!4b1!4m6!3m5!1s0x3a396711d138942b:0xee53a48b9ffbe34e!8m2!3d17.7456665!4d83.2445832!16s%2Fg%2F11z0p8jc64",
};

export const PRICE_PER_NIGHT = 2500; // INR — Standard room
export const TOTAL_ROOMS = 12;
