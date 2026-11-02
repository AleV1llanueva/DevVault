import { useState, useEffect } from "react";
import { NightBackground } from "./components/NightBackground";
import { ComandoCard, type ComandoProps } from "./components/ComandoCard";

function App() {
  const [comandos, setComandos] = useState<ComandoProps[]>([]);

  const [cargando, setCargando] = useState<boolean>(true);

  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    const temporizador = setTimeout(() => {
      const datosSimuladosBD: ComandoProps[] = [
        {
          id: 1,
          titulo: "Docker start",
          comandoText: "docker start container",
          explicacion: "Este comando inicia un contenedor",
        },
        {
          id: 2,
          titulo: "Docker health",
          comandoText: "docker ps",
          explicacion: "Ver la salud de los contenedores",
        },
        {
          id: 3,
          titulo: "Docker start",
          comandoText: "docker start container",
          explicacion: "Este comando inicia un contenedor",
        },
        {
          id: 4,
          titulo: "Docker start",
          comandoText: "docker start container",
          explicacion: "Este comando inicia un contenedor",
        },
        {
          id: 5,
          titulo: "Docker start",
          comandoText: "docker start container",
          explicacion: "Este comando inicia un contenedor",
        },
        {
          id: 6,
          titulo: "Docker start",
          comandoText: "docker start container",
          explicacion: "Este comando inicia un contenedor",
        },
      ];

      setComandos(datosSimuladosBD);
      setCargando(false);
    }, 1200);

    return () => clearTimeout(temporizador);
  }, []);

  const comandosFiltrados = comandos.filter((comando) => {
    const q = busqueda.toLowerCase();
    return (
      comando.titulo.toLowerCase().includes(q) ||
      comando.comandoText.toLowerCase().includes(q) ||
      comando.explicacion.toLowerCase().includes(q)
   )
  });

  return (
    <NightBackground>
      <div className="min-h-screen text-slate-100 flex flex-col md:flex-row">
        {/* =====================================================================
          1. COLUMNA IZQUIERDA: MENÚ CORPORATIVO (SIDEBAR)
          Fijo de 256px (w-64) en Escritorio | Oculto en Celular
         ===================================================================== */}
        <aside className="hidden md:flex md:w-64 md:flex-col  bg-[#070b19]/60 border-r border-slate-800 justify-between p-5 shrink-0">
          <div>
            {/* Identidad de Marca */}
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow">
                DV
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                DevVault
              </span>
            </div>

            {/* Menú de Navegación del Sistema */}
            <nav className="space-y-2  ">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 bg-indigo-600/15 text-indigo-400 rounded-lg font-medium text-sm border border-indigo-500/20"
              >
                <span>🌐</span> Catálogo Global
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-slate-500 rounded-lg font-medium text-sm cursor-not-allowed"
              >
                <span>📈</span> Mis Comandos (Unidad 3)
              </a>
            </nav>
          </div>

          {/* Estado de Sesión (Se conectará con JWT en la Unidad 3) */}
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400 mb-1">Estado de Seguridad</p>
            <p className="text-sm font-semibold text-amber-400">
              👤 Modo Invitado
            </p>
          </div>
        </aside>

        {/* =====================================================================
          2. CABECERA MÓVIL (Visible únicamente en teléfonos celulares: md:hidden)
         ===================================================================== */}
        <header className="md:hidden  border-b border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center font-bold text-sm text-white">
              DV
            </div>
            <span className="font-bold text-lg text-white">DevVault</span>
          </div>
          <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20 font-medium">
            👤 Invitado
          </span>
        </header>

        {/* =====================================================================
          3. ÁREA CENTRAL DE CONTENIDO (WORKSPACE)
         ===================================================================== */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
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
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
              + Nuevo Comando
            </button>
          </div>

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
              <strong className="text-white">{comandosFiltrados.length}</strong>{" "}
              de {comandos.length} registros en memoria
            </span>
          </div>

          {cargando ? (
            <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
              <p className="text-indigo-400 font-semibold animate-pulse text-lg">
                ⏳ Sincronizando catálogo desde el Almacén de Estado...
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Ejecutando Vuelta 1 (Montaje inicial y disparo de useEffect)
              </p>
            </div>
          ) : (
            /* MAPEO DINÁMICO AL DOM: Recorremos los datos re-inyectados en la variable 'habitosFiltrados' */
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {comandosFiltrados.map((comando) => (
                <ComandoCard
                  key={comando.id}
                  id={comando.id}
                  titulo={comando.titulo}
                  comandoText={comando.comandoText}
                  explicacion={comando.explicacion}
                />
              ))}
            </section>
          )}
        </main>
      </div>
    </NightBackground>
  );
}

export default App;
