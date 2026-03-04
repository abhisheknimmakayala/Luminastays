import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
 *
 * Returns each room type with total rooms and how many are available
 * for the requested date range. Only CONFIRMED bookings block availability —
 * pending requests do not hold rooms.
 *
 * Overlap condition: existing booking overlaps [checkIn, checkOut) if:
 *   booking.checkIn < checkOut AND booking.checkOut > checkIn
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const checkInStr = searchParams.get("checkIn");
  const checkOutStr = searchParams.get("checkOut");

  if (!checkInStr || !checkOutStr) {
    return NextResponse.json(
      { error: "checkIn and checkOut query params are required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }
  if (checkOut <= checkIn) {
    return NextResponse.json(
      { error: "checkOut must be after checkIn" },
      { status: 400 }
    );
  }

  const rooms = await prisma.room.findMany({
    include: {
      bookings: {
        where: {
          status: "confirmed",
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
        select: { id: true },
      },
    },
    orderBy: { id: "asc" },
  });

  // Group by type and report available count
  const byType: Record<
    string,
    { type: string; total: number; booked: number; available: number; pricePerNight: number }
  > = {};

  for (const room of rooms) {
    if (!byType[room.type]) {
      byType[room.type] = {
        type: room.type,
        total: 0,
        booked: 0,
        available: 0,
        pricePerNight: room.pricePerNight,
      };
    }
    byType[room.type].total++;
    byType[room.type].booked += room.bookings.length > 0 ? 1 : 0;
    byType[room.type].available =
      byType[room.type].total - byType[room.type].booked;
  }

  return NextResponse.json({ availability: Object.values(byType) });
}
