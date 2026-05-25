"use client";

import { useState } from "react";
import type { Booking } from "../../lib/firestore";
import {
  updateBookingStatus,
  updateBooking,
  deleteBooking,
} from "../../lib/firestore";
import { RefreshCw, Pencil, Trash2, Loader2, X } from "lucide-react";

const STATUS_STYLES: Record<Booking["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

interface Props {
  bookings: Booking[];
  onRefresh: () => void;
}

function calcNights(checkIn: string, checkOut: string): number {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

export default function BookingsTable({ bookings, onRefresh }: Props) {
  const [updating, setUpdating] = useState<string | null>(null);

  // Edit modal state
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState<Partial<Booking>>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete confirm state
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function changeStatus(id: string, status: Booking["status"]) {
    setUpdating(id);
    try {
      await updateBookingStatus(id, status);
      onRefresh();
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
      await updateBooking(editingBooking.id, {
        guestName: editForm.guestName,
        guestEmail: editForm.guestEmail,
        guestPhone: editForm.guestPhone,
        checkIn: editForm.checkIn,
        checkOut: editForm.checkOut,
        nights: editForm.nights,
        status: editForm.status as Booking["status"],
      });
      setEditingBooking(null);
      onRefresh();
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
      setDeletingBooking(null);
      onRefresh();
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
      {/* ── Header bar ── */}
      <div className="mb-4 flex items-center justify-between">
        <p className="font-poppins text-[14px] text-[#7c6d63]">
          {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
        </p>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 font-poppins text-xs text-[#8B1A1A] hover:underline"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto rounded-sm border border-[#eee4da]">
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
            {bookings.map((b) => (
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
                      className="border border-[#e7d1c8] bg-white px-2 py-1.5 font-poppins text-[14px] text-[#433227] outline-none transition focus:border-[#8B1A1A] disabled:opacity-50 rounded border"
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

      {/* ── Edit Modal ── */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            {/* Modal header */}
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

            {/* Modal body */}
            <div className="space-y-4 px-6 py-5">
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

      {/* ── Delete Confirm Dialog ── */}
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
