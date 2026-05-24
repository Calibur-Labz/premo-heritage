import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface BlockedDate {
  id: string;
  date: string;
  reason: string;
  createdAt: Timestamp;
  createdBy: string;
}

export interface Booking {
  id: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: "pending" | "confirmed" | "cancelled";
  whatsappMessage: string;
  createdAt: Timestamp;
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  const snap = await getDocs(collection(db, "blockedDates"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlockedDate));
}

export async function addBlockedDate(
  date: string,
  reason: string,
  adminEmail: string,
): Promise<void> {
  await addDoc(collection(db, "blockedDates"), {
    date,
    reason,
    createdAt: Timestamp.now(),
    createdBy: adminEmail,
  });
}

export async function removeBlockedDate(id: string): Promise<void> {
  await deleteDoc(doc(db, "blockedDates", id));
}

export async function getBookings(): Promise<Booking[]> {
  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
}

export async function createPendingBooking(data: {
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  whatsappMessage: string;
}): Promise<void> {
  await addDoc(collection(db, "bookings"), {
    ...data,
    status: "pending",
    createdAt: Timestamp.now(),
  });
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled",
): Promise<void> {
  await updateDoc(doc(db, "bookings", id), { status });
}

export async function updateBooking(
  id: string,
  updates: Partial<Omit<Booking, "id" | "createdAt">>,
): Promise<void> {
  await updateDoc(doc(db, "bookings", id), updates);
}

export async function deleteBooking(id: string): Promise<void> {
  await deleteDoc(doc(db, "bookings", id));
}
