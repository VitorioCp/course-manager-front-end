"use client";

import { Eye, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    deleteCookie("token");
    window.location.href = "/home";
  }

  const isHomePage = pathname === "/home";

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between bg-gray-950 px-6 py-4 text-gray-50 border-b border-gray-800 sticky top-0 z-10 gap-4 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-[1400px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-2xl">📖</span>
          <h1 className="text-xl font-semibold">Gestão de Cursos</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            className="flex items-center justify-center gap-2 border border-gray-700 px-4 py-2 rounded hover:bg-gray-800 hover:border-blue-500 text-gray-300 hover:text-gray-50 transition-colors duration-300 w-full sm:w-auto"
            onClick={() => router.push(isHomePage ? "/" : "/home")}
          >
            {isHomePage ? (
              <>
                <LayoutDashboard size={16} className="text-blue-400" />
                Dashboard
              </>
            ) : (
              <>
                <Eye size={16} className="text-blue-400" />
                Ver Catálogo
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1 text-red-400 hover:text-red-300 transition-colors duration-300 w-full sm:w-auto px-3 py-1 rounded hover:bg-gray-800"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
