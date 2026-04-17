"use client";

import NavBar from "@/components/layout/NavBar";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
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
          DUKA POS
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="w-full text-left hover:bg-gray-700 p-2 rounded block"
          >
            <button className="w-full text-left hover:bg-gray-700 p-2 rounded">
              Dashboard
            </button>
          </Link>
          <Link
            href="/users"
            className="w-full text-left hover:bg-gray-700 p-2 rounded block"
          >
            <button className="w-full text-left hover:bg-gray-700 p-2 rounded">
              Users
            </button>
          </Link>
          <Link
            href="/transactions"
            className="w-full text-left hover:bg-gray-700 p-2 rounded block"
          >
            <button className="w-full text-left hover:bg-gray-700 p-2 rounded">
              Transactions
            </button>
          </Link>
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
