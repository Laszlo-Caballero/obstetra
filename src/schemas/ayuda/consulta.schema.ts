import z from 'zod';

export const ConsultaSchema = z.object({
  asumto: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  descripcion: z.string().min(3, 'La descripcion debe tener al menos 3 caracteres'),
  email: z.string().min(3, 'El correo no es valido'),
  prioridad: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'La prioridad es obligatoria',
    },
  ),
  modulo: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'El modulo es obligatorio',
    },
  ),
  categoria: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'El modulo es obligatoria',
    },
  ),
  telefono: z
    .string()
    .min(9, 'El teléfono debe tener 9 caracteres')
    .max(9, 'El teléfono debe tener 9 caracteres'),
});

export type ConsultaSchemaType = z.infer<typeof ConsultaSchema>;
