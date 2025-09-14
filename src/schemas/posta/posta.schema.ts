import z from 'zod';

export const PostaSchema = z.object({
  ruc: z
    .string('El RUC es obligatorio')
    .min(11, {
      message: 'El RUC debe tener 11 caracteres',
    })
    .max(11, {
      message: 'El RUC debe tener 11 caracteres',
    }),
  nombre: z
    .string('El nombre es obligatorio')
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  direccion: z
    .string('La dirección es obligatoria')
    .min(3, { message: 'La dirección debe tener al menos 3 caracteres' }),
  ipress: z
    .string('La IPRESS es obligatoria')
    .min(3, { message: 'La IPRESS debe tener al menos 3 caracteres' }),
  lat: z.string('La latitud es obligatoria'),
  lng: z.string('La longitud es obligatoria'),
  altitud: z
    .number('La altitud es obligatoria')
    .positive({ message: 'La altitud debe ser un número positivo' }),
  fechaInicioActividad: z.string('La fecha de inicio de actividad es obligatoria'),
  capacidad: z
    .number('La capacidad es obligatoria')
    .positive({ message: 'La capacidad debe ser un número positivo' }),
  region: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    {
      error: 'La región es obligatoria',
    },
  ),
  provincia: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    {
      error: 'La provincia es obligatoria',
    },
  ),
  distrito: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'El distrito es obligatorio',
    },
  ),
});

export type PostaSchemaType = z.infer<typeof PostaSchema>;
