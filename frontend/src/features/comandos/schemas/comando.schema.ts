
import { z } from "zod";

// Espejo de CreateComandoValidator.cs (reglas de forma, no de BD)
export const crearComandoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, "El título debe contener al menos 3 caracteres")
    .max(50, "El título es muy grande"),

  comandoText: z
    .string()
    .trim()
    .min(1, "El comando no puede ir vacío"),

  explicacion: z.string().trim(),

  categoriaId: z
    .coerce
    .number({ error: "Debe seleccionar una categoría válida" })
    .int("Debe seleccionar una categoría válida")
    .positive("Debe seleccionar una categoría válida"),
});

export type CrearComandoSchemaType = z.infer<typeof crearComandoSchema>
export type CrearComandoSchemaInput = z.input<typeof crearComandoSchema>;
