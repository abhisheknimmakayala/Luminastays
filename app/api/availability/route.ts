import { NextRequest, NextResponse } from 'next/server';

function enumerateDates(from: Date, to: Date) {
  const dates: Date[] = [];
  const cursor = new Date(from);

  while (cursor <= to) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return NextResponse.json({ error: 'from and to are required' }, { status: 400 });
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const days = enumerateDates(fromDate, toDate).map((date, index) => ({
    date: date.toISOString().slice(0, 10),
    remainingRooms: Math.max(0, 12 - ((index * 3) % 9))
  }));

  return NextResponse.json({ days });
}
