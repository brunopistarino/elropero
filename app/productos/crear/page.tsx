import Breadcrumbs from "@/components/breadcrumbs";
import CreateForm from "./create-form";
import { db } from "@/lib/drizzle";
import { Categories, Suppliers } from "@/lib/schema";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore();

  const categories = await db
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

  return (
    <>
      <Breadcrumbs />
      <CreateForm categories={categories} suppliers={suppliers} />
    </>
  );
}
