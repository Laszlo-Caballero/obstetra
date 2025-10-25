import z from 'zod';

export const TurnoSchema = z.object({
  horaInicio: z.string().min(1, 'La hora de inicio es requerida'),
  horaFin: z.string().min(1, 'La hora de fin es requerida'),
});

export type TurnoInput = z.infer<typeof TurnoSchema>;
