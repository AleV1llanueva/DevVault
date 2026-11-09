import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
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
            {/*👤 Modo Invitado*/}
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

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
