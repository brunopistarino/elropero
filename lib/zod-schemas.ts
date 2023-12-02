import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Por favor escriba un nombre.",
    })
    .max(255),
});

export type categorySchemaType = z.infer<typeof categorySchema>;
