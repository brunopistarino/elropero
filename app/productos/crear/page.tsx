import Breadcrumbs from "@/components/breadcrumbs";
import CreateForm from "./create-form";
import { db } from "@/lib/drizzle";
import { Categories, Suppliers } from "@/lib/schema";

export default async function Page() {
  const cateories = await db.select().from(Categories).orderBy(Categories.name);
  const suppliers = await db.select().from(Suppliers).orderBy(Suppliers.name);

  return (
    <>
      <Breadcrumbs />
      <CreateForm categories={cateories} suppliers={suppliers} />
    </>
  );
}
