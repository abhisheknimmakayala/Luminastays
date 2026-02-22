export type AvailabilityDay = {
  date: string;
  remainingRooms: number;
};

export function AvailabilityGrid({ days }: { days: AvailabilityDay[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-4">
      {days.map((day) => (
        <div key={day.date} className="rounded-lg border border-slate-100 p-2 text-center">
          <p className="text-xs text-slate-500">{day.date}</p>
          <p className="text-sm font-semibold text-brand-900">{day.remainingRooms}/12</p>
        </div>
      ))}
    </div>
  );
}
