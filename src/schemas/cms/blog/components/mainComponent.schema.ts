import { ComponentType } from '@/interface/blog-response.interface';
import z from 'zod';

export const TextSchema = z.object({
  text: z.string(),
  highlight: z
    .object({
      text: z.string(),
      bold: z.boolean().optional(),
    })
    .optional(),
});

export type TextSchemaType = z.infer<typeof TextSchema>;

export const ListItemSchema = z.object({
  title: z.string().min(1, 'El título del ítem es obligatorio'),
  text: TextSchema.superRefine((data, ctx) => {
    if (data.text.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El texto no puede estar vacío',
        path: ['text'],
      });
    }
  }),
});

export const ImageSchema = z
  .object({
    recurso: z
      .object({
        recursoId: z.number(),
        nombre: z.string(),
        extension: z.string(),
        url: z.string(),
        fechaSubida: z.string(),
      })
      .optional(),
    file: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.recurso && !data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Se debe proporcionar al menos un recurso o un archivo',
        path: ['recurso', 'file'],
      });
    }
  });

export const MainComponentSchema = z.object({
  type: z.enum(ComponentType),
  text: z.array(TextSchema).optional(),
  listItems: z.array(ListItemSchema).optional(),
  image: z.array(ImageSchema).optional(),
  articles: z.array(z.number()).optional(),
});
