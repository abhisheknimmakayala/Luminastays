import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/bookings
 *
 * Books N rooms of the requested type for the given date range.
 * Finds N available rooms, creates one Booking record per room,
 * and returns all booking IDs grouped under a reference number.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { roomType, checkIn, checkOut, rooms, guests, guestName, guestPhone, guestEmail } = body;

  if (!roomType || !checkIn || !checkOut || !rooms || !guests || !guestName || !guestPhone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const roomCount = Number(rooms);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }
  if (checkOutDate <= checkInDate) {
    return NextResponse.json({ error: "checkOut must be after checkIn" }, { status: 400 });
  }
  if (roomCount < 1 || roomCount > 12) {
    return NextResponse.json({ error: "rooms must be between 1 and 12" }, { status: 400 });
  }

  // Only confirmed bookings hold rooms — pending requests don't block availability
  const availableRooms = await prisma.room.findMany({
    where: {
      type: roomType,
      bookings: {
        none: {
          status: "confirmed",
          checkIn: { lt: checkOutDate },
          checkOut: { gt: checkInDate },
        },
      },
    },
    take: roomCount,
    orderBy: { id: "asc" },
  });

  if (availableRooms.length < roomCount) {
    return NextResponse.json(
      {
        error: `Only ${availableRooms.length} room${availableRooms.length !== 1 ? "s" : ""} available for those dates. Please reduce your room count.`,
      },
      { status: 409 }
    );
  }

  // Create one booking record per room
  const bookings = await prisma.$transaction(
    availableRooms.map((room) =>
      prisma.booking.create({
        data: {
          roomId: room.id,
          guestName,
          guestPhone,
          guestEmail: guestEmail ?? null,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests: Math.ceil(Number(guests) / roomCount),
          status: "pending",
        },
        select: { id: true, roomId: true, room: { select: { name: true } } },
      })
    )
  );

  return NextResponse.json(
    {
      bookings,
      primaryId: bookings[0].id,
      roomCount: bookings.length,
    },
    { status: 201 }
  );
}
