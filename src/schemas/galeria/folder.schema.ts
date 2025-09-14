import z from "zod";

export const FolderSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export type FolderSchemaType = z.infer<typeof FolderSchema>;
