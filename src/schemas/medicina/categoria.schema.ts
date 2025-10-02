import z from 'zod';

export const CategoriaSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
});

export type CategoriaSchemaType = z.infer<typeof CategoriaSchema>;
