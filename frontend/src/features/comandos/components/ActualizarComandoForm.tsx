
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Comando, UpdateComandoDto } from "../types/comando.types";
import {
  actualizarComandoAsync,
  extraerMensajeErrorBackend,
} from "../api/comandoApi";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  crearComandoSchema,
  type CrearComandoSchemaInput,
  type CrearComandoSchemaType,
} from "../schemas/comando.schema";

interface ActualizarComandoFormProps {
  comandoAEditar: Comando;
  onComandoActualizado: (comandoActualizado: Comando) => void;
  onCancelar: () => void;
}

export function ActualizarComandoForm({
  comandoAEditar,
  onComandoActualizado,
  onCancelar,
}: ActualizarComandoFormProps) {
  const [errorServidor, setErrorServidor] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CrearComandoSchemaInput>({
    resolver: zodResolver(crearComandoSchema),
    mode: "onChange",
    defaultValues: {
      titulo: comandoAEditar.titulo,
      comandoText: comandoAEditar.comandoText,
      explicacion: comandoAEditar.explicacion,
      categoriaId: comandoAEditar.categoriaId,
    },
  });

  const procesarEnvioLimpio = async (
    datosValidados: CrearComandoSchemaType,
  ) => {
    try {
      setErrorServidor(null);

      const dto: UpdateComandoDto = {
        titulo: datosValidados.titulo,
        comandoText: datosValidados.comandoText,
        explicacion: datosValidados.explicacion,
        categoriaId: datosValidados.categoriaId,
      };

      const comandoActualizadoEnBd = await actualizarComandoAsync(
        comandoAEditar.id,
        dto,
      );
      onComandoActualizado(comandoActualizadoEnBd);
    } catch (error) {
      const mensajeExactoDeNet = extraerMensajeErrorBackend(error);
      console.error("🚨 Rechazo reportado por el Backend .NET:", error);
      setErrorServidor(mensajeExactoDeNet);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(procesarEnvioLimpio)}
      className="bg-slate-800/90 border border-amber-500/40 rounded-xl p-5 mb-8 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <span className="text-amber-400">✏️</span> Editando comando{" "}
          <code className="text-amber-300 font-mono">
            #{comandoAEditar.id}
          </code>
        </h2>
        <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
          🛡️ PUT /api/comandos/{comandoAEditar.id}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Título (ej. Docker Compose)"
            disabled={isSubmitting}
            autoFocus
            {...register("titulo", {
              onChange: () => {
                if (errorServidor) setErrorServidor(null);
              },
            })}
            className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              errors.titulo
                ? "border-amber-500 focus:border-amber-400"
                : errorServidor
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-indigo-500"
            }`}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Comando (docker ps)"
            disabled={isSubmitting}
            {...register("comandoText", {
              onChange: () => {
                if (errorServidor) setErrorServidor(null);
              },
            })}
            className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              errors.comandoText
                ? "border-amber-500 focus:border-amber-400"
                : errorServidor
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-indigo-500"
            }`}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Explicación del comando"
            disabled={isSubmitting}
            {...register("explicacion", {
              onChange: () => {
                if (errorServidor) setErrorServidor(null);
              },
            })}
            className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              errors.explicacion
                ? "border-amber-500 focus:border-amber-400"
                : errorServidor
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-indigo-500"
            }`}
          />
        </div>
        <div className="flex-1">
          <input
            type="number"
            placeholder="ID de categoría"
            disabled={isSubmitting}
            {...register("categoriaId", {
              onChange: () => {
                if (errorServidor) setErrorServidor(null);
              },
            })}
            className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              errors.categoriaId
                ? "border-amber-500 focus:border-amber-400"
                : errorServidor
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-indigo-500"
            }`}
          />
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "⏳ Actualizando..." : "💾 Actualizar Comando"}
          </button>

          <button
            type="button"
            onClick={onCancelar}
            disabled={isSubmitting}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>

      {errors.titulo && (
        <p className="text-amber-400 text-xs mt-2.5 font-medium flex items-center gap-1.5">
          <span>⚡</span> <strong>Validación en vivo:</strong>{" "}
          {errors.titulo.message}
        </p>
      )}
      {errors.comandoText && (
        <p className="text-amber-400 text-xs mt-2.5 font-medium flex items-center gap-1.5">
          <span>⚡</span> <strong>Validación en vivo:</strong>{" "}
          {errors.comandoText.message}
        </p>
      )}
      {errors.explicacion && (
        <p className="text-amber-400 text-xs mt-2.5 font-medium flex items-center gap-1.5">
          <span>⚡</span> <strong>Validación en vivo:</strong>{" "}
          {errors.explicacion.message}
        </p>
      )}
      {errors.categoriaId && (
        <p className="text-amber-400 text-xs mt-2.5 font-medium flex items-center gap-1.5">
          <span>⚡</span> <strong>Validación en vivo:</strong>{" "}
          {errors.categoriaId.message}
        </p>
      )}

      {errorServidor && (
        <div className="mt-3 bg-red-950/60 border border-red-500/40 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
          <span className="text-base">🛡️</span>
          <span>
            <strong>Respuesta del Backend (.NET):</strong> {errorServidor}
          </span>
        </div>
      )}
    </form>
  );
}
