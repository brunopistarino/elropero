"use server";

import { revalidatePath } from "next/cache";
import { db } from "./drizzle";
import { Categories } from "./schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { categorySchema, categorySchemaType } from "./zod-schemas";

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
  try {
    await db.insert(Categories).values(result.data);
  } catch (err) {
    return { error: String(err) };
  }

  revalidatePath("/categorias");
}

export async function updateCategory(id: number, formData: FormData) {
  try {
    await db
      .update(Categories)
      .set({
        name: formData.get("name") as string,
      })
      .where(eq(Categories.id, id));
    console.log("Category updated");
  } catch (err) {
    console.error(err);
    return;
  }

  revalidatePath("/test");
  redirect("/test");
}
