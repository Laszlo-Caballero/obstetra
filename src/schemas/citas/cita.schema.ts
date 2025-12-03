import { z } from 'zod';

export const CitaSchema = z.object({
  pacienteId: z.number(),
  personalId: z.string().min(1, 'El obstetra es requerido'),
  programaId: z.string().min(1, 'El programa es requerido'),
  fecha: z.string().min(1, 'La fecha es requerida'),
  turnoId: z.string().min(1, 'El turno es requerido'),
  nota: z.string().optional(),
});

export type CitaSchemaType = z.infer<typeof CitaSchema>;
