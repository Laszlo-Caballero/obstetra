import z from 'zod';
export const PersonalSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido_paterno: z.string().min(1, 'El apellido paterno es requerido'),
  apellido_materno: z.string().min(1, 'El apellido materno es requerido'),
  fecha_nacimiento: z.string().min(1, 'La fecha de nacimiento es requerida'),
  correo: z.string().email('El correo no es válido'),
  sexo: z.string().min(1, 'El sexo es requerido'),
  telefono: z
    .string()
    .min(9, 'El teléfono debe tener 9 caracteres')
    .max(9, 'El teléfono debe tener 9 caracteres'),
  dni: z.string().min(8, 'El DNI debe tener 8 caracteres').max(8, 'El DNI debe tener 8 caracteres'),
  codigo: z.string().min(1, 'El codigo es obligatorio'),
  nota: z.string().optional(),
  postas: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .min(1, 'Debes seleccionar al menos una posta'),

  tipoPersonal: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'El Tipo de Personal es obligatoria',
    },
  ),
  turno: z.object(
    {
      label: z.string(),
      value: z.string(),
    },

    {
      error: 'El turno es obligatoria',
    },
  ),
});

export type PersonalSchemaType = z.infer<typeof PersonalSchema>;
