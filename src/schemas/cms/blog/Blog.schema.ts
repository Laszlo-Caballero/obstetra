import z from 'zod';

export const CreateBlogSchema = z
  .object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    legend: z.string().min(10, 'La leyenda debe tener al menos 10 caracteres'),
    image: z.object({
      file: z.instanceof(File),
      selected: z.object({
        url: z.url(),
        id: z.string().min(1, 'El public_id es obligatorio'),
      }),
    }),
    categories: z.object({
      value: z.string().min(1, 'La categoría es obligatoria'),
      label: z.string(),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.image.file && !data.image.selected) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Se debe proporcionar una imagen',
        path: ['image'],
      });
    }
  });

export type BlogInput = z.infer<typeof CreateBlogSchema>;
