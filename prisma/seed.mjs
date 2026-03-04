import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const rooms = [
  "101", "102", "103", "104",
  "201", "202", "203", "204",
  "301", "302", "303", "304",
].map((num) => ({
  name: `Room ${num}`,
  type: "standard",
  maxGuests: 2,
  pricePerNight: 2500,
  description: "King bed with AC, TV, Wi-Fi",
}));

async function seed() {
  // Clear existing rooms (cascades to bookings via FK)
  await sql`DELETE FROM bookings`;
  await sql`DELETE FROM rooms`;
  await sql`ALTER SEQUENCE rooms_id_seq RESTART WITH 1`;

  for (const room of rooms) {
    await sql`
      INSERT INTO rooms (name, type, "maxGuests", "pricePerNight", description)
      VALUES (${room.name}, ${room.type}, ${room.maxGuests}, ${room.pricePerNight}, ${room.description})
    `;
  }

  console.log("✅ Seeded 12 rooms (101–104, 201–204, 301–304)");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
