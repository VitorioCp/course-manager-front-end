"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/layout/header";
import { getCookie } from "cookies-next";
import CourseCard from "@/components/CourseCard";
import { NewCourseModal } from "@/components/NewCourseModal";

interface Course {
  id: string;
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: "ativo" | "inativo";
}

export default function Dashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchCourses = async () => {
      const token = getCookie("token");

      if (!token) {
        router.push("/sign-in");
        return;
      }

      try {
        // Valida o token no back end
        await axios.get("http://localhost:3001/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        // Busca os cursos
        const response = await axios.get("http://localhost:3001/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setCourses(response.data);
        setAuthenticated(true);
      } catch (error) {
        console.error("Falha na autenticação ou no carregamento", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchCourses();
  }, [router]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.titulo.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? course.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="animate-pulse">Verificando autenticação...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  async function handleDelete(id: string) {
    try {
      const token = getCookie("token");
      await axios.delete(`http://localhost:3001/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Erro ao deletar curso", error);
      alert("Não foi possível deletar o curso.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📖 Gestão de Cursos</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 text-white outline-none w-64"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 text-white outline-none"
            >
              <option value="">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
            <button
              className="bg-fuchsia-700 hover:bg-fuchsia-800 px-4 py-2 rounded text-white font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              + Novo Curso
            </button>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            Nenhum curso encontrado
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((curso) => (
              <CourseCard key={curso.id} course={curso} onDelete={handleDelete}/>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <NewCourseModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            const token = getCookie("token");
            try {
              await axios.post("http://localhost:3001/courses", data, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
              setIsModalOpen(false);
              // Atualize lista de cursos
              const response = await axios.get(
                "http://localhost:3001/courses",
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                }
              );
              setCourses(response.data);
            } catch (error) {
              alert("Erro ao criar curso");
            }
          }}
          
        />
      )}
    </div>
  );
}
