"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        { identifier, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;

      setCookie("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      window.location.href = "/";
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(
        err.response?.data?.message ||
          "Erro ao conectar com o servidor. Verifique o console para mais detalhes."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <div className="bg-red-900/50 text-red-300 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium mb-1"
          >
            Email ou Usuário
          </label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="text-center text-sm flex-col flex gap-2">
          <Link href="/register" className="text-blue-400 hover:underline">
            Criar nova conta
          </Link>

          <Link
            href="/home"
            className="text-sm text-gray-400 hover:underline text-center"
          >
            Voltar para o Catálogo
          </Link>
        </div>
      </form>
    </div>
  );
}
