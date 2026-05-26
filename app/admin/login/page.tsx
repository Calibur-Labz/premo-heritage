"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Image from "next/image";
import { Loader2, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Image src="/logo2.png" alt="Premo Heritage" width={120} height={60} className="object-contain" />
        </div>

        <div className="rounded-sm border border-[#eee4da] bg-white p-8 shadow-[0_8px_30px_rgba(61,38,20,0.08)] sm:p-10">
          <h1 className="text-center font-poppins text-3xl font-black text-[#2f2520]">Admin Login</h1>
          <p className="text-center mt-1 font-poppins text-sm text-[#9c9188]">
            Premo Heritage · Dashboard Access
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="font-poppins text-[13px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
                Email
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@premovilla.com"
                className="mt-2 h-12 w-full border border-[#e7d1c8] bg-[#fbfaf7] px-4 font-poppins text-base text-gray-800 outline-none transition placeholder:text-[#c5b9b1] focus:border-[#8B1A1A]"
              />
            </label>

            <label className="block">
              <span className="font-poppins text-[13px] font-bold uppercase tracking-[0.22em] text-[#7c6d63]">
                Password
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 h-12 w-full border border-[#e7d1c8] bg-[#fbfaf7] px-4 font-poppins text-base text-gray-800 outline-none transition placeholder:text-[#c5b9b1] focus:border-[#8B1A1A]"
              />
            </label>

            {error && (
              <p className="font-poppins text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-sm bg-[#8B1A1A] px-8 py-4 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#6f1515] disabled:opacity-60"
            >
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              <span className="relative z-10">{loading ? "Signing in…" : "Sign In"}</span>
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-poppins text-xs text-[#c5b9b1]">
          © {new Date().getFullYear()} Premo Heritage. All rights reserved.
        </p>
      </div>
    </main>
  );
}
