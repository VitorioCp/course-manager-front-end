
export interface Course {
  id: string;
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: "ativo" | "inativo";
}
