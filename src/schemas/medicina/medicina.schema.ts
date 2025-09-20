import z from 'zod';

export const MedicinaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().min(1, 'La descripcion es obligatoria'),
  codigo: z.string().min(1, 'El codigo es obligatorio'),
  stock: z.number({ error: 'El stock es obligatorio' }).min(0, 'El stock no puede ser negativo'),
  stockMinimo: z
    .number({ error: 'El stock minimo es obligatorio' })
    .min(0, 'El stock minimo no puede ser negativo'),
  dosis: z.string().min(1, 'La dosis es obligatoria'),
  necesitaReceta: z.boolean().default(false),
  unidades: z.number({ error: 'La unidad es obligatoria' }).min(1, 'La unidad es obligatoria'),
  categoria: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'La categoria es obligatoria',
    },
  ),
  presentacion: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'La presentacion es obligatoria',
    },
  ),
  foto: z.instanceof(File, { message: 'La foto debe ser un archivo' }),
});

export type MedicinaSchemaType = z.infer<typeof MedicinaSchema>;
