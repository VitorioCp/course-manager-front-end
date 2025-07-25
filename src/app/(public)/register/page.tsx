"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email,
        login,
        password,
      });

      alert("Cadastro realizado com sucesso!");
      response.data;
      router.push("/sign-in");
    } catch (err: unknown) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        typeof err.response.data.error === "string"
      ) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao se cadastrar");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center">Cadastro</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-semibold"
        >
          Cadastrar
        </button>

        <Link
          href="/sign-in"
          className="text-sm text-blue-400 hover:underline text-center"
        >
          Já tem uma conta? Voltar para login
        </Link>

        <Link
          href="/home"
          className="text-sm text-gray-400 hover:underline text-center"
        >
          Voltar para o Catálogo
        </Link>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
