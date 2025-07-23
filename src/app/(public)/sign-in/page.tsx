"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface LoginResponse {
  token: string;
  error?: string;
}

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3001/auth/login",
        {
          identifier,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;

      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
      alert("Login realizado com sucesso!");
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro de conexão com o servidor");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="Login ou Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-semibold"
        >
          Entrar
        </button>

        <Link
          href="/register"
          className="text-sm text-blue-400 hover:underline text-center"
        >
          Não tem uma conta? Cadastre-se
        </Link>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
