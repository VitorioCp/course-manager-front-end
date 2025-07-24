"use client";

import { useRouter } from "next/navigation";

export interface Course {
  id: string;
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: "ativo" | "inativo";
}

interface CourseCardProps {
  course: Course;
  onDelete?: (id: string) => void;
}

export default function CourseCard({ course, onDelete }: CourseCardProps) {
  const router = useRouter();

  return (
    <div className="bg-zinc-900 rounded overflow-hidden shadow hover:shadow-lg transition-shadow">
      <img
        src={course.img}
        alt={course.titulo}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">{course.titulo}</h2>
          <span
            className={`text-sm px-2 py-1 rounded ${
              course.status === "ativo" ? "bg-green-800" : "bg-red-800"
            }`}
          >
            {course.status === "ativo" ? "Ativo" : "Inativo"}
          </span>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">{course.desc}</p>
        <p className="mt-2 text-sm">Duração: {course.horas} horas</p>
        <div className="flex gap-2 mt-4">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded"
            onClick={() => router.push(`/courses/edit/${course.id}`)}
          >
            Editar
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 text-sm px-3 py-1 rounded"
            onClick={() => {
              if (onDelete && confirm(`Excluir o curso "${course.titulo}"?`)) {
                onDelete(course.id);
              }
            }}
          >
            Excluir
          </button>
        </div>
      </div>

      
    </div>
  );
}
