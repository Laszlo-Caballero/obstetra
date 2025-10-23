import { ComponentType } from '@/interface/blog-response.interface';
import { MainComponentSchema } from '../mainComponent.schema';
import z from 'zod';

export const NoteComponentSchema = MainComponentSchema.default({
  type: ComponentType.NOTE,
}).superRefine((data, ctx) => {
  if (!data.text || data.text.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El componente de nota debe tener al menos un bloque de texto',
      path: ['text'],
    });
  }
  if ((data?.text?.length || 0) > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El componente de nota solo puede tener un bloque de texto',
      path: ['text'],
    });
  }

  data.text?.forEach((textBlock, index) => {
    if (textBlock.text.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El bloque de texto no puede estar vacío',
        path: ['text', index, 'text'],
      });
    }
  });
});
