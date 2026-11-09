export interface Comando {
  id: number;
  titulo: string;
  comandoText: string;
  explicacion: string;

  categoriaId: number;
}

export interface CrearComandoDto {
  titulo: string;
  comandoText: string;
  explicacion: string;

  categoriaId: number;
}


export type UpdateComandoDto = {
  titulo: string;
  comandoText: string;
  explicacion: string;
  categoriaId: number;
};

export interface FluentValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue?: unknown;
    errorCode?: string;
}
