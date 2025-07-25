"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/layout/headerAuth";
import CourseCard from "@/components/CourseCard";
import NewCourseModal from "@/components/NewCourseModal";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export interface Course {
  id: string;
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: "ativo" | "inativo";
}

type CourseFormData = Omit<Course, "id">;

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = getCookie("token");
      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        router.push("/home");
        return;
      }

      try {
        await axios.get("http://localhost:3001/courses", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const res = await axios.get("http://localhost:3001/courses", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCourses(res.data);
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.titulo.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? course.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  function openNewCourseModal() {
    setEditingCourse(null);
    setIsModalOpen(true);
  }

  function openEditCourseModal(course: Course) {
    setEditingCourse(course);
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja realmente excluir este curso?")) return;
    const token = getCookie("token");
    try {
      await axios.delete(`http://localhost:3001/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setCourses(courses.filter((c) => c.id !== id));
    } catch (error) {}
  }

  async function handleSaveCourse(data: CourseFormData) {
    const token = getCookie("token");
    try {
      if (editingCourse) {
        await axios.put(
          `http://localhost:3001/courses/${editingCourse.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } else {
        await axios.post("http://localhost:3001/courses", data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }

      const res = await axios.get("http://localhost:3001/courses", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setCourses(res.data);
      setIsModalOpen(false);
      setEditingCourse(null);
    } catch (error) {}
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!authenticated) {
    router.push("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 my-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white outline-none w-full sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white outline-none w-full sm:w-auto"
          >
            <option value="">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <button
          onClick={openNewCourseModal}
          className="bg-fuchsia-700 hover:bg-fuchsia-800 px-4 py-2 rounded text-white font-semibold w-full sm:w-auto"
        >
          + Novo Curso
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum curso encontrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDelete}
              onEdit={() => openEditCourseModal(course)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <NewCourseModal
          initialData={editingCourse || undefined}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
          onSubmit={handleSaveCourse}
        />
      )}
    </div>
  );
}
