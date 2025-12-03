import { z } from 'zod';

export const UserCreateSchema = z.object({
  user: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
  personalId: z.string().min(1, 'El personal es requerido'),
  roleId: z.string().min(1, 'El rol es requerido'),
  recursoId: z.number().optional(),
  foto: z.any().optional(), // For internal use in the form
});

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>;
