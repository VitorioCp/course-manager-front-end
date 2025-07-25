"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  id: string;
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: "ativo" | "inativo";
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:3001/courses/public"
        );
        setCourses(response.data);
      } catch (err) {
        setError("Erro ao carregar os cursos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const activeCourses = courses
    .filter((course) => course.status === "ativo")
    .filter(
      (course) =>
        course.titulo.toLowerCase().includes(search.toLowerCase()) ||
        course.desc.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Carregando cursos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Cursos</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
      </div>

      {activeCourses.length === 0 ? (
        <p className="text-center text-gray-400">
          Nenhum curso ativo disponível no momento.
        </p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activeCourses.map((course) => (
            <article
              key={course.id}
              className="bg-zinc-900 rounded shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <img
                src={course.img}
                alt={course.titulo}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.titulo}</h2>
                <p className="text-gray-300 mb-2 line-clamp-3">{course.desc}</p>
                <p className="text-sm text-gray-400">
                  Duração: {course.horas} horas
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
