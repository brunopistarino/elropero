import { db } from "@/lib/drizzle";
import { Categories } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ModifyForm from "./modify-form";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const category = await db.query.Categories.findFirst({
    where: eq(Categories.id, id),
  });

  if (!category) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs />
      <ModifyForm category={category} />
    </>
  );
}
