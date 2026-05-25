"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import AdminDashboard from "../components/admin/AdminDashboard";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white ">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8B1A1A] border-t-transparent" />
      </div>
    );
  }

  return <AdminDashboard />;
}
