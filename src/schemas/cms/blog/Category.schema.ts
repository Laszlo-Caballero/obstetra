import z from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  iconName: z.string().min(1, 'El icono es obligatorio'),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
