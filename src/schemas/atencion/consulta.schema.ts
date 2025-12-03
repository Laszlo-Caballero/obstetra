import { z } from 'zod';

export const RecetaMedicinaSchema = z.object({
  medicinaId: z.number(),
  dosis: z.string().min(1, 'La dosis es requerida'),
  indicacion: z.string().min(1, 'La indicación es requerida'),
});

export const DiagnosticoSchema = z.object({
  nombre: z.string().min(1, 'El nombre del diagnóstico es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
});

export const LaboratorioSchema = z.object({
  nombre: z.string().min(1, 'El nombre del laboratorio es requerido'),
  estado: z.string().default('Pendiente'),
});

export const ConsultaSchema = z.object({
  receta: z.object({
    detalle: z.string().optional(),
    recetasMedicinas: z.array(RecetaMedicinaSchema).optional(),
  }),
  diagnosticos: z.array(DiagnosticoSchema).optional(),
  laboratorios: z.array(LaboratorioSchema).optional(),
});

export type ConsultaSchemaType = z.infer<typeof ConsultaSchema>;
export type RecetaMedicinaType = z.infer<typeof RecetaMedicinaSchema>;
export type DiagnosticoType = z.infer<typeof DiagnosticoSchema>;
export type LaboratorioType = z.infer<typeof LaboratorioSchema>;
