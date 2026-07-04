"use client";

import { useState, useEffect } from "react";
import type { BlockedDate } from "../../lib/firestore";
import { addBlockedDate, removeBlockedDate } from "../../lib/firestore";
import { Trash2, Plus, Loader2, CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import AdminDatePicker from "./AdminDatePicker";

interface Props {
  blockedDates: BlockedDate[];
  adminEmail: string;
  onRefresh: () => void;
}

interface RangeRecord {
  ids: string[];
  from: string;
  to: string;
  reason: string;
  count: number;
}

function eachDayBetween(from: string, to: string): string[] {
  const dates: string[] = [];
  const [fy, fm, fd] = from.split("-").map(Number);
  const [ty, tm, td] = to.split("-").map(Number);
  const cur = new Date(fy, fm - 1, fd);
  const end = new Date(ty, tm - 1, td);
  while (cur <= end) {
    dates.push(`${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function isNextDay(a: string, b: string): boolean {
  const [ay, am, ad] = a.split("-").map(Number);
  const d = new Date(ay, am - 1, ad);
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` === b;
}

function groupIntoRanges(dates: BlockedDate[]): RangeRecord[] {
  if (dates.length === 0) return [];
  const sorted = [...dates].sort((a, b) => a.date.localeCompare(b.date));
  const groups: RangeRecord[] = [];
  let cur: RangeRecord = {
    ids: [sorted[0].id],
    from: sorted[0].date,
    to: sorted[0].date,
    reason: sorted[0].reason,
    count: 1,
  };
  for (let i = 1; i < sorted.length; i++) {
    const d = sorted[i];
    if (isNextDay(cur.to, d.date) && d.reason === cur.reason) {
      cur.ids.push(d.id);
      cur.to = d.date;
      cur.count++;
    } else {
      groups.push(cur);
      cur = { ids: [d.id], from: d.date, to: d.date, reason: d.reason, count: 1 };
    }
  }
  groups.push(cur);
  return groups;
}

const PAGE_SIZE = 10;

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function BlockedDatesManager({ blockedDates, adminEmail, onRefresh }: Props) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [addError, setAddError] = useState("");

  const [page, setPage] = useState(1);

  const datesToBlock = fromDate ? eachDayBetween(fromDate, toDate || fromDate) : [];
  const rangeRecords = groupIntoRanges(blockedDates);

  useEffect(() => { setPage(1); }, [rangeRecords.length]);

  const totalPages = Math.ceil(rangeRecords.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const pagedRecords = rangeRecords.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = rangeRecords.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, rangeRecords.length);

  async function handleAdd() {
    if (!fromDate) return;
    setAddError("");
    setAdding(true);
    try {
      await Promise.all(
        datesToBlock.map((date) => addBlockedDate(date, reason.trim() || "Blocked", adminEmail)),
      );
      setFromDate(""); setToDate(""); setReason("");
      onRefresh();
    } catch {
      setAddError("Failed to block dates. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemoveRange(record: RangeRecord) {
    setRemoving(record.from);
    try {
      await Promise.all(record.ids.map((id) => removeBlockedDate(id)));
      onRefresh();
    } finally {
      setRemoving(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-sm border border-[#eee4da] bg-[#fff] p-6">
        <h3 className="font-poppins text-lg font-bold text-[#2f2520]">Block Dates</h3>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-4 items-start">
          <div className="lg:col-span-3">
            <AdminDatePicker
              blockedDates={blockedDates.map((d) => d.date)}
              fromDate={fromDate}
              toDate={toDate}
              onChange={(from, to) => { setFromDate(from); setToDate(to); }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="font-poppins text-[14px] font-bold uppercase text-[#7c6d63]">
                Reason <span className="normal-case tracking-normal text-[#c5b9b1]">(optional)</span>
              </span>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Maintenance, Private event"
                rows={5}
                className="mt-2 w-full resize-none border border-[#e7d1c8] bg-white px-4 py-3 font-poppins text-[14px] text-gray-800 outline-none transition placeholder:text-[#c5b9b1] focus:border-[#8B1A1A]"
              />
            </label>

            <div className="flex flex-col gap-1">
              {datesToBlock.length > 1 && (
                <p className="font-poppins text-xs text-[#C9A84C]">
                  Blocks {datesToBlock.length} dates
                </p>
              )}
              <button
                onClick={handleAdd}
                disabled={!fromDate || adding}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#8B1A1A] px-6 font-poppins text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#6f1515] disabled:opacity-50"
              >
                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {adding ? "Blocking…" : "Block"}
              </button>
            </div>
          </div>
        </div>
        {addError && <p className="mt-2 font-poppins text-[14px] text-red-600">{addError}</p>}
      </div>

      <div>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 className="font-poppins text-lg font-bold text-[#2f2520]">
            Blocked Periods{" "}
            <span className="font-poppins text-[14px] font-normal text-[#9c9188]">
              ({rangeRecords.length} record{rangeRecords.length !== 1 ? "s" : ""} · {blockedDates.length} day{blockedDates.length !== 1 ? "s" : ""} total)
            </span>
          </h3>
          {totalPages > 1 && (
            <p className="shrink-0 font-poppins text-[13px] text-[#9c9188]">
              {rangeStart}–{rangeEnd} of {rangeRecords.length}
            </p>
          )}
        </div>

        {rangeRecords.length === 0 ? (
          <p className="font-poppins text-[14px] text-[#c5b9b1]">No dates blocked yet.</p>
        ) : (
          <div className="overflow-hidden rounded-sm border border-[#eee4da] bg-white">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#f5f0e8] bg-[#fbfaf7] px-5 py-2.5 sm:grid-cols-[1.4fr_1fr_auto_auto]">
              <span className="font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">Period</span>
              <span className="hidden font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188] sm:block">Reason</span>
              <span className="font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">Days</span>
              <span />
            </div>

            <div className="divide-y divide-[#f5f0e8]">
              {pagedRecords.map((record) => {
                const isRemoving = removing === record.from;
                return (
                  <div
                    key={`${record.from}-${record.to}`}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 transition hover:bg-[#fdfcfa] sm:grid-cols-[1.4fr_1fr_auto_auto]"
                  >
                    <div className="flex items-center gap-2.5">
                      <CalendarRange className="h-4 w-4 shrink-0 text-[#C9A84C]" strokeWidth={1.7} />
                      <div>
                        {record.count === 1 ? (
                          <p className="font-poppins text-[14px] font-semibold text-[#2f2520]">
                            {formatDate(record.from)}
                          </p>
                        ) : (
                          <>
                            <p className="font-poppins text-[14px] font-semibold text-[#2f2520]">
                              {formatDate(record.from)}
                            </p>
                            <p className="font-poppins text-xs text-[#9c9188]">
                              → {formatDate(record.to)}
                            </p>
                          </>
                        )}
                        <p className="mt-0.5 font-poppins text-xs text-[#9c9188] sm:hidden">
                          {record.reason}
                        </p>
                      </div>
                    </div>

                    <p className="hidden font-poppins text-[14px] text-[#7c6d63] sm:block">
                      {record.reason}
                    </p>

                    <span className={`inline-block rounded-full px-2.5 py-0.5 font-poppins text-xs font-semibold ${record.count > 1 ? "bg-[#fdf4e3] text-[#C9A84C]" : "bg-[#f5f0e8] text-[#9c9188]"}`}>
                      {record.count}d
                    </span>

                    <button
                      onClick={() => handleRemoveRange(record)}
                      disabled={isRemoving}
                      aria-label="Remove blocked period"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#c5b9b1] transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                    >
                      {isRemoving
                        ? <Loader2 className="h-4 w-4 animate-spin" />
                        : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="flex h-8 w-8 items-center justify-center rounded border border-[#eee4da] bg-white text-[#7c6d63] transition hover:border-[#8B1A1A] hover:text-[#8B1A1A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {getPageNumbers(safePage, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="px-1 font-poppins text-[13px] text-[#9c9188]">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 min-w-[2rem] items-center justify-center rounded border px-2 font-poppins text-[13px] transition ${
                    safePage === p
                      ? "border-[#8B1A1A] bg-[#8B1A1A] font-semibold text-white"
                      : "border-[#eee4da] bg-white text-[#433227] hover:border-[#8B1A1A] hover:text-[#8B1A1A]"
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Next page"
              className="flex h-8 w-8 items-center justify-center rounded border border-[#eee4da] bg-white text-[#7c6d63] transition hover:border-[#8B1A1A] hover:text-[#8B1A1A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
