import { useState } from "react";

export function NewCourseModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: {
    titulo: string;
    desc: string;
    horas: number;
    img: string;
    status: "ativo" | "inativo";
  }) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [horas, setHoras] = useState(0);
  const [img, setImg] = useState("");
  const [status, setStatus] = useState<"ativo" | "inativo">("ativo");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ titulo, desc, horas, img, status });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-white">Novo Curso</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="px-3 py-2 rounded bg-gray-800 text-white outline-none"
          />
          <textarea
            placeholder="Descrição"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="px-3 py-2 rounded bg-gray-800 text-white outline-none resize-none"
            rows={3}
          />
          <input
            type="number"
            placeholder="Horas"
            value={horas || ""}
            onChange={(e) => setHoras(Number(e.target.value))}
            required
            min={1}
            className="px-3 py-2 rounded bg-gray-800 text-white outline-none"
          />
          <input
            type="text"
            placeholder="URL da imagem"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            className="px-3 py-2 rounded bg-gray-800 text-white outline-none"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "ativo" | "inativo")}
            className="px-3 py-2 rounded bg-gray-800 text-white outline-none"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
