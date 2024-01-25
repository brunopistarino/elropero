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
  price: z.coerce
    .number({ invalid_type_error: "Por favor introduzca un precio." })
    .min(1, {
      message: "El precio debe ser mayor a 0.",
    }),
  size: z.string().max(255).optional(),
  // categoryId: z.number(),
  categoryId: z.coerce.number({
    invalid_type_error: "Por favor elija una categoría.",
  }),
  // supplierId: z.number(),
  supplierId: z.coerce.number({
    invalid_type_error: "Por favor elija una proveedora.",
  }),
  businessProfitPercentage: z.coerce.number().min(0).max(100),
  businessProfit: z.coerce.number(),
  supplierProfit: z.coerce.number(),
});

export const supplierSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Por favor escriba un nombre.",
    })
    .max(255),
  dni: z.string().max(255).optional(),
  address: z.string().max(255).optional(),
  phone: z.string().max(255).optional(),
  email: z.string().max(255).optional(),
});

export type categorySchemaType = z.infer<typeof categorySchema>;
export type productSchemaType = z.infer<typeof productSchema>;
export type supplierSchemaType = z.infer<typeof supplierSchema>;
