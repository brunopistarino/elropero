import { db } from "@/lib/drizzle";
import { Categories, Products, Suppliers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ModifyForm from "./modify-form";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const product = await db.query.Products.findFirst({
    where: eq(Products.id, id),
  });

  const cateories = await db
    .select({
      id: Categories.id,
      name: Categories.name,
    })
    .from(Categories)
    .orderBy(Categories.name);

  const suppliers = await db
    .select({
      id: Suppliers.id,
      name: Suppliers.name,
    })
    .from(Suppliers)
    .orderBy(Suppliers.name);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs />
      <ModifyForm
        categories={cateories}
        suppliers={suppliers}
        product={product}
      />
    </>
  );
}
