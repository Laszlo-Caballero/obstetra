import z from 'zod';

export const MotivoSchema = z.object({
  razon: z
    .string()
    .min(10, 'La razón debe tener al menos 10 caracteres')
    .max(255, 'La razón no puede exceder los 255 caracteres'),
});

export type MotivoSchemaType = z.infer<typeof MotivoSchema>;
