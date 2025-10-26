import z from 'zod';

export const ProgramaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().min(1, 'La descripcion es obligatoria'),
  cupoMaximo: z.number().min(1, 'La cupoMaximo es obligatoria'),
  deribacion: z.boolean().default(false),
  responsable: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'El Responsable es Obligatorio',
    },
  ),
});

export type ProgramaSchemaType = z.infer<typeof ProgramaSchema>;
