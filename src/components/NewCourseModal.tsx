"use client";

import { useState, useEffect } from "react";

interface CourseFormData {
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: "ativo" | "inativo";
}

interface NewCourseModalProps {
  initialData?: CourseFormData | null;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => void | Promise<void>;
}

export default function NewCourseModal({ initialData, onClose, onSubmit }: NewCourseModalProps) {
  const [form, setForm] = useState<CourseFormData>({
    titulo: "",
    desc: "",
    horas: 0,
    img: "",
    status: "ativo",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "horas" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded max-w-lg w-full text-white">
        <h2 className="text-xl mb-4">{initialData ? "Editar Curso" : "Novo Curso"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="titulo" className="font-semibold">
            Título
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            required
            className="p-2 rounded bg-gray-800 text-white"
          />

          <label htmlFor="desc" className="font-semibold">
            Descrição
          </label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Descrição"
            value={form.desc}
            onChange={handleChange}
            required
            rows={3}
            className="p-2 rounded bg-gray-800 text-white"
          />

          <label htmlFor="horas" className="font-semibold">
            Duração em horas
          </label>
          <input
            id="horas"
            name="horas"
            type="number"
            placeholder="Duração em horas"
            value={form.horas}
            onChange={handleChange}
            min={0}
            required
            className="p-2 rounded bg-gray-800 text-white"
          />

          <label htmlFor="img" className="font-semibold">
            URL da imagem
          </label>
          <input
            id="img"
            name="img"
            type="text"
            placeholder="URL da imagem"
            value={form.img}
            onChange={handleChange}
            required
            className="p-2 rounded bg-gray-800 text-white"
          />

          <label htmlFor="status" className="font-semibold">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
              Cancelar
            </button>
            <button type="submit" className="bg-fuchsia-700 px-4 py-2 rounded hover:bg-fuchsia-800">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
