"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, CalendarOff, BookOpen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import BookingsTable from "./BookingsTable";
import BlockedDatesManager from "./BlockedDatesManager";
import { getBookings, getBlockedDates } from "../../lib/firestore";
import type { Booking, BlockedDate } from "../../lib/firestore";

type Tab = "bookings" | "blocked";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  async function fetchData() {
    try {
      const [b, d] = await Promise.all([getBookings(), getBlockedDates()]);
      setBookings(b);
      setBlockedDates(d);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  function handleBookingChanged(updated: Booking) {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  function handleBookingDeleted(id: string) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  function handleBlockedDatesRemoved(ids: string[]) {
    setBlockedDates((prev) => prev.filter((d) => !ids.includes(d.id)));
  }

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      <header className="border-b border-[#eee4da] bg-white px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo2.png" alt="Premo Heritage" width={80} height={40} className="object-contain" />
            <span className="hidden font-poppins font-bold text-[18px] uppercase tracking-widest text-[#000] sm:block">
              Hi, Preminda!
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block max-w-[200px] truncate font-poppins text-[14px] text-[#9c9188]">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 font-poppins text-[14px] text-[#8B1A1A] hover:underline"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard label="Total Bookings" value={bookings.length} />
          <StatCard label="Pending" value={pendingCount} highlight={pendingCount > 0} />
          <StatCard label="Blocked Dates" value={blockedDates.length} />
        </div>

        <div className="mb-6 flex gap-1 border-b border-[#eee4da]">
          <TabButton
            active={tab === "bookings"}
            onClick={() => setTab("bookings")}
            icon={<BookOpen className="h-4 w-4" />}
            label="Bookings"
          />
          <TabButton
            active={tab === "blocked"}
            onClick={() => setTab("blocked")}
            icon={<CalendarOff className="h-4 w-4" />}
            label="Blocked Dates"
          />
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8B1A1A] border-t-transparent" />
          </div>
        ) : tab === "bookings" ? (
          <BookingsTable
            bookings={bookings}
            onRefresh={fetchData}
            onBookingChanged={handleBookingChanged}
            onBookingDeleted={handleBookingDeleted}
            onBlockedDatesRemoved={handleBlockedDatesRemoved}
            adminEmail={user?.email ?? ""}
            blockedDates={blockedDates}
          />
        ) : (
          <BlockedDatesManager
            blockedDates={blockedDates}
            adminEmail={user?.email ?? ""}
            onRefresh={fetchData}
          />
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="rounded-sm border border-[#eee4da] bg-white p-3 shadow-[0_2px_10px_rgba(61,38,20,0.04)] sm:p-5">
      <p className="font-poppins text-[10px] uppercase tracking-widest text-[#9c9188] sm:text-[13px]">{label}</p>
      <p className={`font-poppins mt-1 text-2xl font-black sm:mt-2 sm:text-4xl ${highlight ? "text-[#8B1A1A]" : "text-[#2f2520]"}`}>
        {value}
      </p>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 pb-3 font-poppins text-[14px] transition ${
        active
          ? "border-[#8B1A1A] text-[#8B1A1A]"
          : "border-transparent text-[#9c9188] hover:text-[#433227]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
