"use client";

import { Eye, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    deleteCookie("token");
    router.push("/sign-in");
    router.refresh();
  }

  const isHomePage = pathname === "/home";

  return (
    <header className="flex items-center justify-between bg-black px-6 py-4 text-white border-b border-zinc-800 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-fuchsia-500 text-2xl">📖</span>
        <h1 className="text-xl font-semibold">Gestão de Cursos</h1>
      </div>

      <div className="flex items-center gap-6">
        <button
          className="flex items-center gap-2 border border-zinc-600 px-4 py-1.5 rounded hover:bg-zinc-800 transition"
          onClick={() => router.push(isHomePage ? "/" : "/home")}
        >
          {isHomePage ? (
            <>
              <LayoutDashboard size={16} />
              Dashboard
            </>
          ) : (
            <>
              <Eye size={16} />
              Ver Catálogo
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="text-sm hover:underline flex items-center gap-1 text-red-400 hover:text-red-300"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </header>
  );
}
