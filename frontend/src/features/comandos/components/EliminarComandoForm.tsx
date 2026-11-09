
import { useEffect, useState } from "react";
import { eliminarComandoAsync, extraerMensajeErrorBackend } from "../api/comandoApi";

type Props = {
  comandoId: number;
  titulo: string;
  onCancel: () => void;
  onConfirm: (id: number) => void;
  cargando?: boolean;
};

export function EliminarComandoForm({
  comandoId,
  titulo,
  onCancel,
  onConfirm,
  cargando = false,
}: Props) {
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [eliminando, setEliminando] = useState(false);
  const ocupado = cargando || eliminando;

  const procesarEliminacion = async () => {
    setEliminando(true);
    setErrorServidor(null);
    try {
      await eliminarComandoAsync(comandoId);
      onConfirm(comandoId);
    } catch (error) {
      setErrorServidor(extraerMensajeErrorBackend(error));
    } finally {
      setEliminando(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !ocupado) onCancel();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onCancel, ocupado]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !ocupado && onCancel()}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="eliminar-comando-titulo"
        className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-sm w-full shadow-xl mx-4"
      >
        <h3 id="eliminar-comando-titulo" className="text-indigo-300 font-semibold mb-2">
          ¿Eliminar comando?
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Vas a eliminar{" "}
          <span className="font-mono text-slate-200">{titulo}</span>. Esto no se puede deshacer.
        </p>

        {errorServidor && (
          <div className="mb-4 bg-red-950/60 border border-red-500/40 rounded-lg p-3 text-xs text-red-300 flex items-start gap-2">
            <span className="text-base">🚨</span>
            <span>
              <strong>No se pudo eliminar:</strong> {errorServidor}
            </span>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            autoFocus
            disabled={ocupado}
            className="py-2 px-4 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={procesarEliminacion}
            disabled={ocupado}
            className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {eliminando ? "Eliminando…" : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
