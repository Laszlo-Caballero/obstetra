import z from 'zod';

export const TipoConsultaSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  descripcion: z.string().min(10, 'La descripcion debe tener al menos 10 caracteres'),
});

export type TipoConsultaSchemaType = z.infer<typeof TipoConsultaSchema>;
