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
  fromDate: string;
  toDate: string;
  onChange: (from: string, to: string) => void;
}

export default function AdminDatePicker({ blockedDates, fromDate, toDate, onChange }: Props) {
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
    const key = toKey(day);

    if (!fromDate || (fromDate && toDate)) {
      onChange(key, "");
      return;
    }

    if (key === fromDate) {
      onChange("", "");
      return;
    }

    const start = key < fromDate ? key : fromDate;
    const end   = key < fromDate ? fromDate : key;
    onChange(start, end);
  }

  function isInRange(key: string): boolean {
    if (!fromDate || !toDate) return false;
    return key > fromDate && key < toDate;
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="w-full select-none rounded-xl border border-[#eee4da]/60 bg-white p-4 shadow-[0_8px_30px_rgb(61,38,20,0.04)] backdrop-blur-sm">

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-poppins text-base font-bold tracking-tight text-[#2f2520]">
          {MONTHS[viewMonth]} <span className="font-medium text-[#9c9188]">{viewYear}</span>
        </h2>

        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            type="button"
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#eee4da]/40 text-[#433227] transition-all duration-200 hover:bg-[#f5f0e8] active:scale-95"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#eee4da]/40 text-[#433227] transition-all duration-200 hover:bg-[#f5f0e8] active:scale-95"
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <div key={d} className="py-1 font-poppins text-[10px] font-bold uppercase tracking-widest text-[#9c9188]">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 isolation-auto">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="h-12 border border-transparent" />;

          const key = toKey(day);
          const isBlocked = blocked.has(key);
          const isStart = fromDate !== "" && key === fromDate;
          const isEnd = toDate !== "" && key === toDate;
          const inRange = isInRange(key);
          const isToday = isSameDay(day, today);

          let cellClass = "relative h-12 flex items-center justify-center ";
          if (isStart && isEnd) {
            cellClass += "";
          } else if (isStart && toDate) {
            cellClass += "bg-[#f5e8e8] rounded-l-lg";
          } else if (isEnd && fromDate) {
            cellClass += "bg-[#f5e8e8] rounded-r-lg";
          } else if (inRange) {
            cellClass += "bg-[#f5e8e8]";
          }

          let dayClass = "relative flex h-12 w-12 items-center justify-center font-poppins text-sm font-semibold transition-all duration-200 z-10 rounded-lg border border-[#eee4da]/80 ";

          if (isStart || isEnd) {
            dayClass += "cursor-pointer bg-[#8B1A1A] border-[#8B1A1A] font-bold text-white shadow-md shadow-[#8B1A1A]/20 scale-105";
          } else if (inRange) {
            dayClass += "cursor-pointer text-[#8B1A1A] font-bold border-[#e7c8c8]/40 hover:bg-[#8B1A1A]/10 rounded-none";
          } else if (isBlocked) {
            dayClass += "cursor-pointer text-[#433227]/40 line-through hover:border-[#eee4da]/80 hover:bg-[#fef3f3]";
          } else if (isToday) {
            dayClass += "cursor-pointer text-[#2f2520] font-extrabold ring-2 ring-[#C9A84C] ring-offset-1 border-transparent";
          } else {
            dayClass += "cursor-pointer text-[#2f2520] hover:border-[#eee4da]/80 hover:bg-[#f5f0e8] active:scale-95";
          }

          return (
            <div key={key} className={cellClass}>
              <button
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

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[#eee4da]/60 pt-3">
        <LegendItem color="bg-[#8B1A1A] rounded" label="Selected" />
        <LegendItem color="bg-[#f5e8e8] border border-[#e7c8c8]/60 rounded" label="Range" />
        <LegendItem color="ring-2 ring-[#C9A84C] ring-offset-1 rounded" label="Today" />
        <LegendItem color="bg-[#433227]/40 line-through rounded" label="Already blocked" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3.5 w-3.5 shrink-0 ${color}`} />
      <span className="font-poppins text-xs font-semibold text-[#2f2520]">{label}</span>
    </div>
  );
}
