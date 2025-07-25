"use client";

import { Course } from "@/types";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  course: Course;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
}

export default function CourseCard({
  course,
  onDelete,
  onEdit,
}: CourseCardProps) {
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
            onClick={onEdit}
            className="bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete && onDelete(course.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
