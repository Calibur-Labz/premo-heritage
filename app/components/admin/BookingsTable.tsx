"use client";

import { useState, useEffect } from "react";
import type { Booking, BlockedDate } from "../../lib/firestore";
import {
  updateBookingStatus,
  updateBooking,
  deleteBooking,
  addBlockedDate,
  removeBlockedDate,
} from "../../lib/firestore";
import { RefreshCw, Pencil, Trash2, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

const STATUS_STYLES: Record<Booking["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

interface Props {
  bookings: Booking[];
  onRefresh: () => void;
  onBookingChanged: (updated: Booking) => void;
  onBookingDeleted: (id: string) => void;
  onBlockedDatesRemoved: (ids: string[]) => void;
  adminEmail: string;
  blockedDates: BlockedDate[];
}

function calcNights(checkIn: string, checkOut: string): number {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
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

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function BookingsTable({ bookings, onRefresh, onBookingChanged, onBookingDeleted, onBlockedDatesRemoved, adminEmail, blockedDates }: Props) {
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState<Partial<Booking>>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [bookings.length]);

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paged = bookings.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = bookings.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, bookings.length);

  const blockedDateSet = new Set(blockedDates.map((d) => d.date));

  function getDatesToUnblock(checkIn: string, checkOut: string): BlockedDate[] {
    const range = new Set(eachDayBetween(checkIn, checkOut));
    return blockedDates.filter((bd) => range.has(bd.date) && bd.reason.startsWith("Booking: "));
  }

  async function changeStatus(id: string, status: Booking["status"]) {
    setUpdating(id);
    try {
      await updateBookingStatus(id, status);
      const booking = bookings.find((b) => b.id === id);
      if (booking) {
        onBookingChanged({ ...booking, status });
        if (status === "confirmed" && booking.status !== "confirmed") {
          const days = eachDayBetween(booking.checkIn, booking.checkOut).filter((d) => !blockedDateSet.has(d));
          await Promise.all(days.map((d) => addBlockedDate(d, `Booking: ${booking.guestName}`, adminEmail)));
          onRefresh();
        } else if (booking.status === "confirmed" && status !== "confirmed") {
          const toRemove = getDatesToUnblock(booking.checkIn, booking.checkOut);
          if (toRemove.length > 0) {
            await Promise.all(toRemove.map((bd) => removeBlockedDate(bd.id)));
            onBlockedDatesRemoved(toRemove.map((bd) => bd.id));
          }
        }
      }
    } finally {
      setUpdating(null);
    }
  }

  function openEdit(b: Booking) {
    setEditingBooking(b);
    setEditForm({
      guestName: b.guestName,
      guestEmail: b.guestEmail,
      guestPhone: b.guestPhone,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      nights: b.nights,
      status: b.status,
    });
    setEditError("");
  }

  function handleEditField(field: keyof typeof editForm, value: string) {
    setEditForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "checkIn" || field === "checkOut") {
        const cin = field === "checkIn" ? value : (prev.checkIn ?? "");
        const cout = field === "checkOut" ? value : (prev.checkOut ?? "");
        if (cin && cout) next.nights = calcNights(cin, cout);
      }
      return next;
    });
  }

  async function saveEdit() {
    if (!editingBooking) return;
    setEditLoading(true);
    setEditError("");
    try {
      const updates = {
        guestName: editForm.guestName,
        guestEmail: editForm.guestEmail,
        guestPhone: editForm.guestPhone,
        checkIn: editForm.checkIn,
        checkOut: editForm.checkOut,
        nights: editForm.nights,
        status: editForm.status as Booking["status"],
      };
      await updateBooking(editingBooking.id, updates);
      onBookingChanged({ ...editingBooking, ...updates } as Booking);
      const wasConfirmed = editingBooking.status === "confirmed";
      const nowConfirmed = editForm.status === "confirmed";
      if (!wasConfirmed && nowConfirmed) {
        const cin = editForm.checkIn ?? editingBooking.checkIn;
        const cout = editForm.checkOut ?? editingBooking.checkOut;
        const days = eachDayBetween(cin, cout).filter((d) => !blockedDateSet.has(d));
        await Promise.all(
          days.map((d) =>
            addBlockedDate(d, `Booking: ${editForm.guestName ?? editingBooking.guestName}`, adminEmail),
          ),
        );
        onRefresh();
      } else if (wasConfirmed && !nowConfirmed) {
        const cin = editForm.checkIn ?? editingBooking.checkIn;
        const cout = editForm.checkOut ?? editingBooking.checkOut;
        const toRemove = getDatesToUnblock(cin, cout);
        if (toRemove.length > 0) {
          await Promise.all(toRemove.map((bd) => removeBlockedDate(bd.id)));
          onBlockedDatesRemoved(toRemove.map((bd) => bd.id));
        }
      }
      setEditingBooking(null);
    } catch {
      setEditError("Failed to save changes. Please try again.");
    } finally {
      setEditLoading(false);
    }
  }

  function openDelete(b: Booking) {
    setDeletingBooking(b);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!deletingBooking) return;
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await deleteBooking(deletingBooking.id);
      onBookingDeleted(deletingBooking.id);
      setDeletingBooking(null);
    } catch {
      setDeleteError("Failed to delete booking. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="font-primary text-xl text-[#9c9188]">No bookings yet</p>
        <p className="font-poppins text-[14px] text-[#c5b9b1]">
          Guest bookings submitted via WhatsApp will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-poppins text-[14px] text-[#7c6d63]">
          {bookings.length === 0 ? "No bookings" : `Showing ${rangeStart}–${rangeEnd} of ${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
        </p>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 font-poppins text-xs text-[#8B1A1A] hover:underline"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <div className="md:hidden space-y-3">
        {paged.map((b) => (
          <div key={b.id} className="rounded-sm border border-[#eee4da] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-poppins text-[15px] font-semibold text-[#2f2520]">{b.guestName}</p>
                <p className="font-poppins text-xs text-[#9c9188]">
                  {b.createdAt?.toDate().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
              <span className={`inline-block shrink-0 rounded-full border px-3 py-0.5 font-poppins text-[12px] capitalize ${STATUS_STYLES[b.status]}`}>
                {b.status}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 font-poppins text-[14px] text-[#433227]">
              <span>{b.checkIn}</span>
              <span className="text-[#9c9188]">→</span>
              <span>{b.checkOut}</span>
              <span className="ml-auto font-poppins text-xs text-[#9c9188]">{b.nights} night{b.nights !== 1 ? "s" : ""}</span>
            </div>

            <div className="mt-2 flex flex-col gap-0.5">
              <a href={`tel:${b.guestPhone}`} className="font-poppins text-[14px] text-[#8B1A1A] hover:underline">{b.guestPhone}</a>
              <a href={`mailto:${b.guestEmail}`} className="font-poppins text-xs text-[#9c9188] hover:underline">{b.guestEmail}</a>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-[#f5f0e8] pt-3">
              <select
                value={b.status}
                title="Update booking status"
                aria-label="Update booking status"
                disabled={updating === b.id}
                onChange={(e) => changeStatus(b.id, e.target.value as Booking["status"])}
                className="flex-1 rounded border border-[#e7d1c8] bg-white px-2 py-1.5 font-poppins text-[14px] text-[#433227] outline-none transition focus:border-[#8B1A1A] disabled:opacity-50"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => openEdit(b)}
                title="Edit booking"
                className="flex h-8 w-8 items-center justify-center rounded border border-[#e7d1c8] bg-white text-[#7c6d63] transition hover:border-[#8B1A1A] hover:text-[#8B1A1A]"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => openDelete(b)}
                title="Delete booking"
                className="flex h-8 w-8 items-center justify-center rounded border border-[#e7d1c8] bg-white text-[#7c6d63] transition hover:border-red-400 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-sm border border-[#eee4da]">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-[#eee4da] bg-[#fbfaf7]">
            <tr>
              {["Guest", "Dates", "Nights", "Contact", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f0e8]">
            {paged.map((b) => (
              <tr key={b.id} className="bg-white hover:bg-[#fdfcfa]">
                <td className="px-4 py-4">
                  <p className="font-poppins text-[15px] font-semibold text-[#2f2520]">
                    {b.guestName}
                  </p>
                  <p className="font-poppins text-xs text-[#9c9188]">
                    {b.createdAt?.toDate().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </td>
                <td className="px-4 py-4 font-poppins text-[14px] text-[#433227]">
                  <span className="block">{b.checkIn}</span>
                  <span className="block text-[#9c9188]">→ {b.checkOut}</span>
                </td>
                <td className="px-4 py-4 font-poppins text-[14px] text-[#433227]">
                  {b.nights}
                </td>
                <td className="px-4 py-4">
                  <a
                    href={`tel:${b.guestPhone}`}
                    className="block font-poppins text-[14px] text-[#8B1A1A] hover:underline"
                  >
                    {b.guestPhone}
                  </a>
                  <a
                    href={`mailto:${b.guestEmail}`}
                    className="block font-poppins text-[12px] text-[#9c9188] hover:underline"
                  >
                    {b.guestEmail}
                  </a>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded-full border px-3 py-0.5 font-poppins text-[12px] capitalize ${STATUS_STYLES[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={b.status}
                      title="Update booking status"
                      aria-label="Update booking status"
                      disabled={updating === b.id}
                      onChange={(e) =>
                        changeStatus(b.id, e.target.value as Booking["status"])
                      }
                      className="rounded border border-[#e7d1c8] bg-white px-2 py-1.5 font-poppins text-[14px] text-[#433227] outline-none transition focus:border-[#8B1A1A] disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => openEdit(b)}
                      title="Edit booking"
                      className="flex h-7 w-7 items-center justify-center rounded border border-[#e7d1c8] bg-white text-[#7c6d63] transition hover:border-[#8B1A1A] hover:text-[#8B1A1A]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => openDelete(b)}
                      title="Delete booking"
                      className="flex h-7 w-7 items-center justify-center rounded border border-[#e7d1c8] bg-white text-[#7c6d63] transition hover:border-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded border border-[#eee4da] bg-white font-poppins text-[#7c6d63] transition hover:border-[#8B1A1A] hover:text-[#8B1A1A] disabled:cursor-not-allowed disabled:opacity-40"
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
            className="flex h-8 w-8 items-center justify-center rounded border border-[#eee4da] bg-white font-poppins text-[#7c6d63] transition hover:border-[#8B1A1A] hover:text-[#8B1A1A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#eee4da] px-6 py-4">
              <h2 className="font-primary text-xl font-bold text-[#2f2520]">
                Edit Booking
              </h2>
              <button
                onClick={() => setEditingBooking(null)}
                type="button"
                title="Close edit modal"
                aria-label="Close edit modal"
                className="flex h-7 w-7 items-center justify-center rounded text-[#9c9188] hover:text-[#433227]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="edit-booking-guest-name"
                    className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]"
                  >
                    Guest Name
                  </label>
                  <input
                    id="edit-booking-guest-name"
                    type="text"
                    value={editForm.guestName ?? ""}
                    onChange={(e) =>
                      handleEditField("guestName", e.target.value)
                    }
                    className="w-full rounded border border-[#eee4da] px-3 py-2 font-poppins text-[14px] text-[#433227] outline-none focus:border-[#8B1A1A]"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">
                    Status
                  </label>
                  <select
                    value={editForm.status ?? "pending"}
                    onChange={(e) => handleEditField("status", e.target.value)}
                    title="Booking status"
                    aria-label="Booking status"
                    className="w-full rounded border border-[#eee4da] px-3 py-2 font-poppins text-[14px] text-[#433227] outline-none focus:border-[#8B1A1A]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.guestEmail ?? ""}
                    onChange={(e) =>
                      handleEditField("guestEmail", e.target.value)
                    }
                    title="Guest email"
                    aria-label="Guest email"
                    className="w-full rounded border border-[#eee4da] px-3 py-2 font-poppins text-[14px] text-[#433227] outline-none focus:border-[#8B1A1A]"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editForm.guestPhone ?? ""}
                    onChange={(e) =>
                      handleEditField("guestPhone", e.target.value)
                    }
                    title="Guest phone"
                    aria-label="Guest phone"
                    className="w-full rounded border border-[#eee4da] px-3 py-2 font-poppins text-[14px] text-[#433227] outline-none focus:border-[#8B1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={editForm.checkIn ?? ""}
                    onChange={(e) => handleEditField("checkIn", e.target.value)}
                    title="Check-in date"
                    aria-label="Check-in date"
                    className="w-full rounded border border-[#eee4da] px-3 py-2 font-poppins text-[14px] text-[#433227] outline-none focus:border-[#8B1A1A]"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={editForm.checkOut ?? ""}
                    onChange={(e) =>
                      handleEditField("checkOut", e.target.value)
                    }
                    title="Check-out date"
                    aria-label="Check-out date"
                    className="w-full rounded border border-[#eee4da] px-3 py-2 font-poppins text-[14px] text-[#433227] outline-none focus:border-[#8B1A1A]"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]">
                    Nights
                  </label>
                  <input
                    type="number"
                    value={editForm.nights ?? 0}
                    readOnly
                    title="Nights"
                    aria-label="Nights"
                    className="w-full rounded border border-[#eee4da] bg-[#fbfaf7] px-3 py-2 font-poppins text-[14px] text-[#9c9188] outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-whatsapp-message"
                  className="mb-1 block font-poppins text-[11px] font-semibold uppercase tracking-widest text-[#9c9188]"
                >
                  WhatsApp Message (read-only)
                </label>
                <textarea
                  id="edit-whatsapp-message"
                  value={editingBooking.whatsappMessage}
                  readOnly
                  rows={3}
                  className="w-full rounded border border-[#eee4da] bg-[#fbfaf7] px-3 py-2 font-poppins text-xs text-[#9c9188] outline-none"
                />
              </div>

              {editError && (
                <p className="font-poppins text-xs text-red-600">
                  {editError}
                </p>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 border-t border-[#eee4da] px-6 py-4">
              <button
                onClick={() => setEditingBooking(null)}
                disabled={editLoading}
                className="rounded border border-[#eee4da] px-4 py-2 font-poppins text-[14px] text-[#7c6d63] transition hover:bg-[#fbfaf7] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={editLoading}
                className="flex items-center gap-2 rounded bg-[#8B1A1A] px-4 py-2 font-poppins text-[14px] text-white transition hover:bg-[#6f1515] disabled:opacity-50"
              >
                {editLoading && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eee4da] px-6 py-4">
              <h2 className="font-primary text-lg font-bold text-[#2f2520]">
                Delete Booking
              </h2>
              <button
                type="button"
                onClick={() => setDeletingBooking(null)}
                aria-label="Close delete dialog"
                title="Close"
                className="flex h-7 w-7 items-center justify-center rounded text-[#9c9188] hover:text-[#433227]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="font-poppins text-[14px] text-[#433227]">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {deletingBooking.guestName}
                </span>
                &apos;s booking? This action cannot be undone.
              </p>
              {deleteError && (
                <p className="mt-3 font-poppins text-[14px] text-red-600">
                  {deleteError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-[#eee4da] px-6 py-4">
              <button
                onClick={() => setDeletingBooking(null)}
                disabled={deleteLoading}
                className="rounded border border-[#eee4da] px-4 py-2 font-poppins text-[14px] text-[#7c6d63] transition hover:bg-[#fbfaf7] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-poppins text-[14px] text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
