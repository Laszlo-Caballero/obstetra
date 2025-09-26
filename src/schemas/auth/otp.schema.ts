import z from 'zod';

export const OtpSchema = z.object({
  code: z.string().length(6, 'El código debe tener 6 dígitos'),
});

export type OtpSchemaType = z.infer<typeof OtpSchema>;
