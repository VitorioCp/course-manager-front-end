"use client";

import { useEffect, useState } from "react";
import api from "@/api/api";

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
        const response = await api.get<Course[]>(
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
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-50">
        <p>Carregando cursos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Catálogo de Cursos
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded bg-gray-800 text-gray-50 outline-none border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <img
                  src={course.img}
                  alt={course.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-3 text-gray-50">
                    {course.titulo}
                  </h2>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {course.desc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {course.horas} horas
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
