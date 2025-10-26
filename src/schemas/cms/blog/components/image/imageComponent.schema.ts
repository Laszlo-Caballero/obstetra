import { ComponentType } from '@/interface/blog-response.interface';
import z from 'zod';
import { MainComponentSchema } from '../mainComponent.schema';

export const ImageComponentSchema = MainComponentSchema.default({
  type: ComponentType.IMAGE,
}).superRefine((data, ctx) => {
  if (!data.image || data.image.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El componente de imagen debe tener al menos una imagen',
      path: ['image'],
    });
  }
});
