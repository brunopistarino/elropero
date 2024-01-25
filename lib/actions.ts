"use server";

import { revalidatePath } from "next/cache";
import { db } from "./drizzle";
import { Categories, Products, Suppliers } from "./schema";
import { redirect } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import {
  categorySchema,
  categorySchemaType,
  productSchema,
  supplierSchema,
} from "./zod-schemas";
import { cookies } from "next/headers";

// export async function createCategory(formData: FormData) {
//   "use server";
//   try {
//     await db.insert(Categories).values({
//       name: formData.get("name") as string,
//     });
//     console.log("Category created");
//   } catch (err) {
//     console.error(err);
//     return;
//   }

//   revalidatePath("/categorias");
// }

export async function setCookie(formData: FormData) {
  cookies().set("password", formData.get("password") as string);
}

export async function createCategory(newCategory: unknown) {
  // Server-side validation
  const result = categorySchema.safeParse(newCategory);
  if (!result.success) {
    let errorMesaage = "";
    result.error.issues.forEach((issue) => {
      errorMesaage += issue.message + "\n";
    });
    return { error: errorMesaage };
  }

  // Insert into database
  try {
    await db.insert(Categories).values(result.data);
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/categorias");
  redirect("/categorias");
}

export async function updateCategory(id: number, updatedCategory: unknown) {
  const result = categorySchema.safeParse(updatedCategory);
  if (!result.success) {
    let errorMesaage = "";
    result.error.issues.forEach((issue) => {
      errorMesaage += issue.message + "\n";
    });
    return { error: errorMesaage };
  }
  try {
    await db
      .update(Categories)
      .set({
        name: result.data.name,
      })
      .where(eq(Categories.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/categorias");
  redirect("/categorias");
}

export async function deleteCategory(id: number) {
  try {
    await db.delete(Categories).where(eq(Categories.id, id));
  } catch (err) {
    console.error(err);
    return { error: String(err) };
  }

  revalidatePath("/categorias");
  redirect("/categorias");
}

export async function createProduct(newProduct: unknown) {
  // Server-side validation
  const result = productSchema.safeParse(newProduct);
  if (!result.success) {
    let errorMesaage = "";
    result.error.issues.forEach((issue) => {
      errorMesaage += issue.message + "\n";
    });
    return { error: errorMesaage };
  }

  console.log(result.data);

  // Insert into database
  try {
    await db.insert(Products).values(result.data);
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function updateProduct(id: number, updatedProduct: unknown) {
  const result = productSchema.safeParse(updatedProduct);
  if (!result.success) {
    let errorMesaage = "";
    result.error.issues.forEach((issue) => {
      errorMesaage += issue.message + "\n";
    });
    return { error: errorMesaage };
  }
  try {
    await db
      .update(Products)
      .set({ ...result.data })
      .where(eq(Products.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(Products).where(eq(Products.id, id));
  } catch (err) {
    console.error(err);
    return { error: String(err) };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function markProductAsSold(id: number) {
  try {
    await db
      .update(Products)
      .set({
        soldAt: new Date(),
      })
      .where(eq(Products.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function markProductAsUnsold(id: number) {
  try {
    await db
      .update(Products)
      .set({
        soldAt: null,
      })
      .where(eq(Products.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/ventas");
  redirect("/ventas");
}

export async function markProductAsReturned(id: number) {
  try {
    await db
      .update(Products)
      .set({
        returnedAt: new Date(),
      })
      .where(eq(Products.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function markProductAsUnreturned(id: number) {
  try {
    await db
      .update(Products)
      .set({
        returnedAt: null,
      })
      .where(eq(Products.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/devoluciones");
  redirect("/devoluciones");
}

export async function markProductsAsPaid(ids: number[]) {
  try {
    await db
      .update(Products)
      .set({
        paidAt: new Date(),
      })
      .where(inArray(Products.id, ids));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/saldos");
  redirect("/saldos");
}

export async function markProductAsUnpaid(id: number) {
  try {
    await db
      .update(Products)
      .set({
        paidAt: null,
      })
      .where(eq(Products.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/pagos");
  redirect("/pagos");
}

export async function createSupplier(newSupplier: unknown) {
  // Server-side validation
  const result = supplierSchema.safeParse(newSupplier);
  if (!result.success) {
    let errorMesaage = "";
    result.error.issues.forEach((issue) => {
      errorMesaage += issue.message + "\n";
    });
    return { error: errorMesaage };
  }

  // Insert into database
  try {
    await db.insert(Suppliers).values(result.data);
  } catch (err) {
    return { error: String(err) };
  }
  revalidatePath("/proveedoras");
  redirect("/proveedoras");
}

export async function updateSupplier(id: number, updatedSupplier: unknown) {
  const result = supplierSchema.safeParse(updatedSupplier);
  if (!result.success) {
    let errorMesaage = "";
    result.error.issues.forEach((issue) => {
      errorMesaage += issue.message + "\n";
    });
    return { error: errorMesaage };
  }
  try {
    await db
      .update(Suppliers)
      .set({ ...result.data })
      .where(eq(Suppliers.id, id));
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/proveedoras");
  redirect("/proveedoras");
}

export async function deleteSupplier(id: number) {
  try {
    await db.delete(Suppliers).where(eq(Suppliers.id, id));
  } catch (err) {
    console.error(err);
    return { error: String(err) };
  }

  revalidatePath("/proveedoras");
  redirect("/proveedoras");
}
