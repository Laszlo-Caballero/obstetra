import z from 'zod';

export const ProfileUpdateSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellidoPaterno: z.string().min(1, 'El apellido paterno es obligatorio'),
  apellidoMaterno: z.string().min(1, 'El apellido materno es obligatorio'),
  fechaNacimiento: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  sexo: z.string().min(1, 'El sexo es obligatorio'),
  telefono: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  codigoColegio: z.string().min(1, 'El código de colegio es obligatorio'),
  correo: z.string().email('El correo no es válido'),
});

export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;

export const PasswordUpdateSchema = z
  .object({
    previousPassword: z.string().min(1, 'La contraseña actual es obligatoria'),
    newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmar la contraseña es obligatorio'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type PasswordUpdateSchemaType = z.infer<typeof PasswordUpdateSchema>;
