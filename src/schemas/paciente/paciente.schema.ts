import z from "zod";

export const PacienteSchema = z.object({
  dni: z
    .string()
    .min(8, "El DNI debe tener 8 caracteres")
    .max(8, "El DNI debe tener 8 caracteres"),
  nombres: z.string().min(1, "El nombre es requerido"),
  apellido_paterno: z.string().min(1, "El apellido paterno es requerido"),
  apellido_materno: z.string().min(1, "El apellido materno es requerido"),
  fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
  sexo: z.string().min(1, "El sexo es requerido"),
  telefono: z
    .string()
    .min(9, "El teléfono debe tener 9 caracteres")
    .max(9, "El teléfono debe tener 9 caracteres"),
  direccion: z.string().min(1, "La dirección es requerida"),
  provincia: z.string().min(1, "La provincia es requerida"),
  distrito: z.string().min(1, "El distrito es requerido"),
  departamento: z.string().min(1, "El departamento es requerido"),
  nota: z.string().optional(),
});

export type PacienteType = z.infer<typeof PacienteSchema>;
