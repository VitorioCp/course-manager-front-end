"use client";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-black px-6 py-4 text-white border-b border-zinc-800 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-fuchsia-500 text-2xl">📖</span>
        <h1 className="text-xl font-semibold">Gestão de Cursos</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/sign-in")}
          className="px-4 py-2 border border-fuchsia-600 text-fuchsia-500 hover:bg-fuchsia-600 hover:text-white rounded transition font-medium"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black rounded transition font-medium"
        >
          Register
        </button>
      </div>
    </header>
  );
}
