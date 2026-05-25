"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

interface Props {
  blockedDates: string[];
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

export default function BookingCalendar({ blockedDates, checkIn, checkOut, onChange }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const blocked = new Set(blockedDates);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  function handleDayClick(day: Date) {
    if (day < today || blocked.has(toKey(day))) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(day, null);
      return;
    }

    if (isSameDay(day, checkIn)) {
      onChange(null, null);
      return;
    }

    const start = day < checkIn ? day : checkIn;
    const end = day < checkIn ? checkIn : day;

    // Reject range if any blocked/past date falls within it
    let cur = new Date(start);
    cur.setDate(cur.getDate() + 1);
    while (cur < end) {
      if (blocked.has(toKey(cur))) {
        onChange(day, null);
        return;
      }
      cur.setDate(cur.getDate() + 1);
    }

    onChange(start, end);
  }

  function isInRange(day: Date) {
    if (!checkIn || !checkOut) return false;
    return day > checkIn && day < checkOut;
  }

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="w-full max-w-xl select-none rounded-2xl border border-[#eee4da]/60 bg-white p-6 shadow-[0_8px_30px_rgb(61,38,20,0.04)] backdrop-blur-sm sm:p-7">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-primary text-xl font-bold tracking-tight text-[#2f2520]">
          {MONTHS[viewMonth]} <span className="font-medium text-[#9c9188]">{viewYear}</span>
        </h2>
        
        <div className="flex gap-1.5">
          <button
            onClick={prevMonth}
            type="button"
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#eee4da]/40 text-[#433227] transition-all duration-200 hover:bg-[#f5f0e8] active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#eee4da]/40 text-[#433227] transition-all duration-200 hover:bg-[#f5f0e8] active:scale-95"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Day-of-week labels */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <div key={d} className="py-2 font-secondary text-xs font-bold uppercase tracking-widest text-[#9c9188]">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-5 isolation-auto">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="my-0.5 h-10 border border-transparent" />;

          const key = toKey(day);
          const isPast = day < today;
          const isBlocked = blocked.has(key);
          const disabled = isPast || isBlocked;

          const isStart = checkIn && isSameDay(day, checkIn);
          const isEnd = checkOut && isSameDay(day, checkOut);
          const inRange = isInRange(day);
          const isToday = isSameDay(day, today);

          // Range block wrapping styles
          let cellClass = "relative h-10 flex items-center justify-center my-0.5 ";
          if (inRange) cellClass += "bg-[#f5e8e8]";
          if (isStart && checkOut) cellClass += " bg-[#f5e8e8] rounded-l-xl";
          if (isEnd && checkIn) cellClass += " bg-[#f5e8e8] rounded-r-xl";

          // Core interactive button styles
          let dayClass = "relative flex h-12 w-12 items-center justify-center font-secondary text-sm font-semibold transition-all duration-200 z-10 rounded-xl border border-[#eee4da]/80 ";

          if (disabled) {
            // INCREASED OPACITY: Changed to dark brown base with full opacity, but used line-through and softer borders to denote availability.
            dayClass += "cursor-not-allowed text-[#433227]/40 line-through rounded-none border-[#eee4da]/20";
          } else if (isStart || isEnd) {
            dayClass += "cursor-pointer bg-[#8B1A1A] border-[#8B1A1A] font-bold text-white shadow-md shadow-[#8B1A1A]/20 scale-105";
          } else if (inRange) {
            dayClass += "cursor-pointer text-[#8B1A1A] font-bold border-[#e7c8c8]/40 hover:bg-[#8B1A1A]/10 rounded-none";
          } else if (isToday) {
            dayClass += "cursor-pointer text-[#2f2520] font-extrabold ring-2 ring-[#C9A84C] ring-offset-2 border-transparent";
          } else {
            // INCREASED OPACITY: Changed base text to a dark solid tone (#2f2520) instead of semi-muted brown
            dayClass += "cursor-pointer text-[#2f2520] hover:border-[#eee4da]/80 hover:bg-[#f5f0e8] active:scale-95";
          }

          return (
            <div key={key} className={cellClass}>
              <button
                disabled={disabled}
                onClick={() => handleDayClick(day)}
                aria-label={key}
                type="button"
                className={dayClass}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#eee4da]/60 pt-5">
        <LegendItem color="bg-[#8B1A1A] rounded-md" label="Selected" />
        <LegendItem color="bg-[#f5e8e8] border border-[#e7c8c8]/60 rounded-md" label="In range" />
        <LegendItem color="ring-2 ring-[#C9A84C] ring-offset-1 rounded-md" label="Today" />
        <LegendItem color="bg-[#433227]/40 line-through rounded-md" label="Unavailable" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3.5 w-3.5 shrink-0 ${color}`} />
      <span className="font-secondary text-xs font-semibold text-[#2f2520]">{label}</span>
    </div>
  );
}