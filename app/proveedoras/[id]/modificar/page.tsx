import { db } from "@/lib/drizzle";
import { Suppliers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ModifyForm from "./modify-form";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const supplier = await db.query.Suppliers.findFirst({
    where: eq(Suppliers.id, id),
  });

  if (!supplier) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs />
      <ModifyForm supplier={supplier} />
    </>
  );
}
