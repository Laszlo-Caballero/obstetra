import z from "zod";

export const FilesSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Debe subir al menos un archivo"),
});

export type FilesSchemaType = z.infer<typeof FilesSchema>;
