export interface ComandoProps {
  id: number;
  titulo: string;
  comandoText: string;
  explicacion: string;
}

export function ComandoCard({
  id,
  titulo,
  comandoText,
  explicacion,
}: ComandoProps) {
  return (
    <article className="group relative bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-3 justify-between shadow-sm overflow-hidden hover:shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 bg-slate-700/50 rounded-full px-3 py-1">
          #{id}
        </span>
        <h3 className="text-indigo-300 font-semibold text-sm uppercase tracking-wider">
          {titulo}
        </h3>
      </div>

      <h2 className="font-mono text-slate-100 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm shadow-inner">
        <i>{comandoText}</i>
      </h2>

      <button
        disabled
        className="w-full bg-slate-900/80 text-slate-400 text-sm font-medium py-2.5 px-4 rounded-lg cursor-not-allowed border border-slate-700"
      >
        🔒 Editar Comando (Requiere Sesión)
      </button>

      <p className="text-slate-400 text-sm leading-relaxed">{explicacion}</p>
    </article>
  );
}
