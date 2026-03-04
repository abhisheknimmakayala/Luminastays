import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/bookings/[id]/confirm?secret=XXXX
 *
 * Owner taps this link from WhatsApp to confirm a booking.
 * - Verifies the shared secret (BOOKING_CONFIRM_SECRET)
 * - Updates booking status: "pending" → "confirmed"
 * - Returns an HTML page with a "Notify Customer on WhatsApp" button
 *   so the owner can send the guest their confirmation in one tap.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.BOOKING_CONFIRM_SECRET) {
    return html(errorPage("Invalid or missing confirmation link."), 401);
  }

  const bookingId = parseInt(id);
  if (isNaN(bookingId)) {
    return html(errorPage("Invalid booking ID."), 400);
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { room: true },
  });

  if (!booking) {
    return html(errorPage(`Booking #${bookingId} not found.`), 404);
  }

  if (booking.status === "confirmed") {
    return html(successPage(booking, true));
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "confirmed" },
  });

  return html(successPage({ ...booking, status: "confirmed" }, false));
}

function html(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/html" },
  });
}

type Booking = {
  id: number;
  guestName: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: string;
  room: { name: string };
};

function successPage(b: Booking, wasAlready: boolean) {
  const checkIn = new Date(b.checkIn).toDateString();
  const checkOut = new Date(b.checkOut).toDateString();

  // Clean phone number for wa.me — strip everything except digits
  const cleanPhone = b.guestPhone.replace(/\D/g, "");

  const customerMsg = encodeURIComponent(
    `Hi ${b.guestName}! 🎉 Your booking at Lumina Stays has been CONFIRMED!\n\n` +
    `Booking ID: #${b.id}\n` +
    `Room: ${b.room.name}\n` +
    `Check-in: ${checkIn}\n` +
    `Check-out: ${checkOut}\n` +
    `Guests: ${b.guests}\n\n` +
    `We look forward to hosting you. See you soon! 🏨`
  );
  const waCustomerUrl = `https://wa.me/${cleanPhone}?text=${customerMsg}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Booking Confirmed — Lumina Stays</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f3f0ea;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px}
    .card{background:#fff;border-radius:20px;padding:36px 28px;max-width:440px;width:100%;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .icon{width:64px;height:64px;border-radius:50%;background:#d1fae5;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 20px}
    h1{font-size:22px;font-weight:700;color:#111;margin-bottom:6px}
    .sub{color:#6b7280;font-size:14px;margin-bottom:20px}
    .details{background:#f9fafb;border-radius:12px;padding:16px;text-align:left;font-size:14px;line-height:2;margin-bottom:24px}
    .details strong{color:#111}
    .badge{display:inline-block;background:#d1fae5;color:#065f46;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;margin-bottom:16px}
    .wa-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;background:#25d366;color:#fff;font-size:15px;font-weight:600;text-decoration:none;transition:background .2s}
    .wa-btn:hover{background:#1ebe5d}
    .wa-icon{width:20px;height:20px;fill:#fff;flex-shrink:0}
    .already{color:#059669;font-size:13px;margin-top:12px}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>Booking ${wasAlready ? "Already " : ""}Confirmed!</h1>
    <p class="sub">${wasAlready ? "This booking was already confirmed." : "Great — the booking is now confirmed in the system."}</p>
    <span class="badge">✓ Confirmed</span>
    <div class="details">
      <div><strong>Booking ID:</strong> #${b.id}</div>
      <div><strong>Guest:</strong> ${b.guestName}</div>
      <div><strong>Phone:</strong> ${b.guestPhone}</div>
      <div><strong>Room:</strong> ${b.room.name}</div>
      <div><strong>Check-in:</strong> ${checkIn}</div>
      <div><strong>Check-out:</strong> ${checkOut}</div>
      <div><strong>Guests:</strong> ${b.guests}</div>
    </div>
    <a href="${waCustomerUrl}" class="wa-btn">
      <svg class="wa-icon" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Notify ${b.guestName} on WhatsApp
    </a>
    ${wasAlready ? "" : '<p class="already">The calendar is now updated — these dates are marked as booked.</p>'}
  </div>
</body>
</html>`;
}

function errorPage(message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Error — Lumina Stays</title>
  <style>
    body{font-family:-apple-system,sans-serif;background:#f3f0ea;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px}
    .card{background:#fff;border-radius:20px;padding:36px 28px;max-width:400px;width:100%;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .icon{width:64px;height:64px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 20px}
    h1{font-size:20px;font-weight:700;color:#111;margin-bottom:8px}
    p{color:#6b7280;font-size:14px}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✗</div>
    <h1>Confirmation Failed</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
