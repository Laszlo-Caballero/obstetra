import { ComponentType } from '@/interface/blog-response.interface';
import { MainComponentSchema } from '../mainComponent.schema';
import z from 'zod';

export const ListItemComponentSchema = MainComponentSchema.default({
  type: ComponentType.LIST,
}).superRefine((data, ctx) => {
  if (!data.listItems || data.listItems.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El componente de lista debe tener al menos un ítem',
      path: ['listItems'],
    });
  }
});
