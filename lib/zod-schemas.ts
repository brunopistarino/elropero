import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Por favor escriba un nombre.",
    })
    .max(255),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Por favor escriba una descripción.",
    })
    .max(255),
  // price: z.number().min(1, {
  //   message: "Por favor introduzca un precio.",
  // }),
  price: z.coerce.number().min(1, {
    message: "Por favor introduzca un precio.",
  }),
  size: z.string().max(255).optional(),
  // categoryId: z.number(),
  categoryId: z.coerce.number(),
  // supplierId: z.number(),
  supplierId: z.coerce.number(),
});

export type categorySchemaType = z.infer<typeof categorySchema>;
export type productSchemaType = z.infer<typeof productSchema>;
