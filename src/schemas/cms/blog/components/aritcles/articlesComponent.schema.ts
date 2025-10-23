import { ComponentType } from '@/interface/blog-response.interface';
import { MainComponentSchema } from '../mainComponent.schema';
import z from 'zod';

export const ArticlesComponentSchema = MainComponentSchema.default({
  type: ComponentType.ARTICLES,
}).superRefine((data, ctx) => {
  if (!data.articles || data.articles.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El componente de artículos debe tener al menos un artículo',
      path: ['articles'],
    });
  }
});
