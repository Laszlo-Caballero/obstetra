import z from 'zod';

export const TipoPersonalSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
});

export type TipoPersonalInput = z.infer<typeof TipoPersonalSchema>;
