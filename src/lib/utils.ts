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
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+91 90000 00000",
  email: "luminastaysvizag@gmail.com",
  address: "Plot No. 121/B, Opp Children's Park, PF Office Road, Marripalem, VUDA Layout, Visakhapatnam – 530009",
  addressLines: [
    "Lumina Stays, Plot No. 121/B,",
    "Opp Children's Park, PF Office Road,",
    "Marripalem, VUDA Layout,",
    "Visakhapatnam – 530009",
  ],
  mapsUrl:
    "https://maps.google.com/maps?q=Marripalem+VUDA+Layout+Visakhapatnam+530009&output=embed&z=16",
  mapsDirectionsUrl:
    "https://maps.app.goo.gl/EDS19VCqSfnDqVeH9",
};

export const PRICE_PER_NIGHT = 4500; // INR
export const TOTAL_ROOMS = 12;
