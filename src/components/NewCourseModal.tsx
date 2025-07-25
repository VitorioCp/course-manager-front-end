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
    <div className="fixed inset-0 bg-gray-950/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 p-6 rounded-lg max-w-lg w-full border border-gray-800 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-50">
            {initialData ? "Editar Curso" : "Novo Curso"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-300 mb-1">
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              placeholder="Título do curso"
              value={form.titulo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              id="desc"
              name="desc"
              placeholder="Descrição detalhada do curso"
              value={form.desc}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="horas" className="block text-sm font-medium text-gray-300 mb-1">
                Duração (horas)
              </label>
              <input
                id="horas"
                name="horas"
                type="number"
                placeholder="0"
                value={form.horas}
                onChange={handleChange}
                min={0}
                required
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-[10px] rounded-md bg-gray-800 border border-gray-700 text-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="img" className="block text-sm font-medium text-gray-300 mb-1">
              URL da Imagem
            </label>
            <input
              id="img"
              name="img"
              type="text"
              placeholder="https://exemplo.com/imagem.jpg"
              value={form.img}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {initialData ? "Atualizar Curso" : "Criar Curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}