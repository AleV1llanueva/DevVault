
import { useState } from "react";
import type { Comando } from "../types/comando.types";
import { EliminarComandoForm } from "./EliminarComandoForm";

type Props = Comando & {
  onDelete: (id: number) => void;
  onEditar: (comando: Comando) => void;   // 👈 nueva
};

export function ComandoCard({
  id,
  titulo,
  comandoText,
  explicacion,
  categoriaId,
  onDelete,
  onEditar,
}: Props) {
  const [confirmando, setConfirmando] = useState(false);

  return (
    <article className="group relative bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-3 justify-between shadow-sm overflow-hidden hover:shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center justify-between">
        <h3 className="text-indigo-300 font-semibold text-l tracking-wider">
          {titulo}
        </h3>
        <span className="text-s font-semibold text-slate-400 px-3 py-1">
          #{id}
        </span>
        <span className="text-s font-semibold text-slate-400 px-3 py-1">
          Categoria: {categoriaId}
        </span>
      </div>

      <h2 className="font-mono text-slate-100 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm shadow-inner">
        <i>{comandoText}</i>
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed">{explicacion}</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() =>
            onEditar({ id, titulo, comandoText, explicacion, categoriaId })
          }
          className="bg-slate-900/80 text-slate-300 text-sm font-medium py-2.5 px-4 rounded-lg border border-slate-700 hover:bg-amber-600/10 hover:text-amber-300 hover:border-amber-500/40 transition cursor-pointer"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => setConfirmando(true)}
          className="bg-slate-900/80 text-slate-400 text-sm font-medium py-2.5 px-4 rounded-lg border border-slate-700 hover:bg-red-600/10 hover:text-red-400 hover:border-red-500/40 transition cursor-pointer"
        >
          Eliminar
        </button>
      </div>

      {confirmando && (
        <EliminarComandoForm
          comandoId={id}
          titulo={titulo}
          onCancel={() => setConfirmando(false)}
          onConfirm={(id) => {
            onDelete(id);
            setConfirmando(false);
          }}
        />
      )}
    </article>
  );
}
