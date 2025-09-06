import z from "zod";

export const AuthSchema = z.object({
  user: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
  posta: z.object(
    {
      value: z.string().min(1, "La posta es obligatoria"),
      label: z.string().min(1, "La posta es obligatoria"),
    },
    { error: "La posta es obligatoria" }
  ),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
