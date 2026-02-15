"use client";

import NavBar from "@/components/layout/NavBar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, loading, handleLogOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left hover:bg-gray-700 p-2 rounded">
            Home
          </button>
          <button className="w-full text-left hover:bg-gray-700 p-2 rounded">
            Profile
          </button>
          <button className="w-full text-left hover:bg-gray-700 p-2 rounded">
            Settings
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
