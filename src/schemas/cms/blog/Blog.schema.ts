import z from 'zod';
import { ArticlesComponentSchema } from './components/aritcles/articlesComponent.schema';
import { ImageComponentSchema } from './components/image/imageComponent.schema';
import { ListItemComponentSchema } from './components/list-item/listItemComponent.schema';
import { NoteComponentSchema } from './components/note/noteComponent.schema';
import { TextComponentSchema } from './components/text/textComponent.schema';

export const CreateBlogSchema = z
  .object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    legend: z.string().min(10, 'La leyenda debe tener al menos 10 caracteres'),
    image: z.object({
      file: z.instanceof(File).optional(),
      selected: z
        .object({
          url: z.url(),
          id: z.number(),
        })
        .optional(),
    }),
    categories: z.array(z.number()).min(1, 'Debe seleccionar al menos una categoría'),
    components: z
      .array(
        z.union([
          ArticlesComponentSchema,
          ImageComponentSchema,
          ListItemComponentSchema,
          NoteComponentSchema,
          TextComponentSchema,
        ]),
      )
      .min(1, 'El blog debe tener al menos un componente'),
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
