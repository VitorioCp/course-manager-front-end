"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between bg-gray-950 px-6 py-4 text-gray-50 border-b border-gray-800 sticky top-0 z-10 gap-4 sm:gap-0">
      <div className="flex items-center gap-2">
        <span className="text-blue-500 text-2xl">📖</span>
        <h1 className="text-xl font-semibold whitespace-nowrap">Gestão de Cursos</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <button
          onClick={() => router.push("/sign-in")}
          className="w-full sm:w-auto px-4 py-2 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white rounded transition-colors duration-300 font-medium"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors duration-300 font-medium"
        >
          Registrar
        </button>
      </div>
    </header>
  );
}