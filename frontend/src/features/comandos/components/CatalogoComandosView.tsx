import { useState, useEffect } from "react";
import type { Comando } from "../types/comando.types";
import {
  obtenerComandosAsync,
  extraerMensajeErrorBackend,
} from "../api/comandoApi";
import { ComandoCard } from "./ComandoCard";
import { CrearComandoForm } from "./CrearComandoForm";
import { ActualizarComandoForm } from "./ActualizarComandoForm";

export function CatalogoComandosView() {
  const [comandos, setComandos] = useState<Comando[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState<string>("");
  const [errorRed, setErrorRed] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [comandoEnEdicion, setComandoEnEdicion] = useState<Comando | null>(
    null,
  );

  useEffect(() => {
    obtenerComandosAsync()
      .then((datosDesdePostgres) => {
        setComandos(datosDesdePostgres);
        setErrorRed(null);
      })
      .catch((error) => {
        console.error("Fallo en la comunicacion HTTP con  .NET:", error);
        setErrorRed(
          "La comunicacion fue rechazada o bloqueada por las politicas de seguridad (CORS)",
        );
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const manejarComandoCreado = (nuevoComandoDesdeDB: Comando) => {
    setComandos((comandosActuales) => [
      ...comandosActuales,
      nuevoComandoDesdeDB,
    ]);
    setMostrarFormulario(false);
  };

  const comandosFiltrados = comandos.filter((comando) =>
    comando.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const manejarComandoEliminado = (id: number) => {
    setComandos((prev) => prev.filter((c) => c.id !== id));
  };

  const manejarComandoActualizado = (comandoActualizado: Comando) => {
    setComandos((prev) =>
      prev.map((c) =>
        c.id === comandoActualizado.id ? comandoActualizado : c,
      ),
    );
    setComandoEnEdicion(null);
  };

  const manejarEditarClick = (comando: Comando) => {
    setMostrarFormulario(false); // evitar dos forms abiertos
    setComandoEnEdicion((actual) =>
      actual?.id === comando.id ? null : comando,
    );
  };

  // --- ZONA 4: RENDERIZADO EXCLUSIVO DEL CATÁLOGO ---
  return (
    <div>
      {/* Barra Superior de Título y Acción Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Catálogo Global de Comandos
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Explora todos tus comandos registrados en la app{" "}
            <code className="text-indigo-400 font-mono">DevVault</code>.
          </p>
        </div>

        {/* Botón preparado para el Laboratorio de Integración POST */}

        <button
          type="button"
          onClick={() => {
            setComandoEnEdicion(null);
            setMostrarFormulario(true);
          }}
          disabled={mostrarFormulario}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          {mostrarFormulario ? "✍️ Formulario abierto" : "+ Nuevo Comando"}
        </button>
      </div>

      {comandoEnEdicion ? (
        <ActualizarComandoForm
          key={comandoEnEdicion.id}
          comandoAEditar={comandoEnEdicion}
          onComandoActualizado={manejarComandoActualizado}
          onCancelar={() => setComandoEnEdicion(null)}
        />
      ) : mostrarFormulario ? (
        <CrearComandoForm
          onComandoCreado={manejarComandoCreado}
          onCancelar={() => setMostrarFormulario(false)}
        />
      ) : null}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar comandos en el catálogo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:max-w-md bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <span className="text-xs text-slate-400">
          Mostrando{" "}
          <strong className="text-white">{comandosFiltrados.length}</strong> de{" "}
          {comandos.length} registros en memoria
        </span>
      </div>

      {cargando && (
        <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-indigo-400 font-semibold animate-pulse text-lg">
            Consultando endpoint GET /api/habitos en .NET...
          </p>
        </div>
      )}

      {!cargando && errorRed && (
        <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-6 text-center">
          <p className="text-red-400 font-bold text-base mb-1">
            🚨 Error de Comunicación Full-Stack
          </p>
          <p className="text-slate-300 text-sm">{errorRed}</p>
        </div>
      )}

      {!cargando && !errorRed && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {comandosFiltrados.map((comando) => (
            <ComandoCard
              key={comando.id}
              id={comando.id}
              titulo={comando.titulo}
              comandoText={comando.comandoText}
              explicacion={comando.explicacion}
              categoriaId={comando.categoriaId}
              onDelete={manejarComandoEliminado}
              onEditar={manejarEditarClick}
            />
          ))}
        </section>
      )}
    </div>
  );
}
