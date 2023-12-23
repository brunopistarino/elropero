import { db } from "@/lib/drizzle";
import { Categories, Products, Suppliers } from "@/lib/schema";
import { eq, isNotNull } from "drizzle-orm";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { unstable_noStore as noStore } from "next/cache";

export type ProductTable = {
  id: (typeof Products.$inferSelect)["id"];
  name: (typeof Products.$inferSelect)["name"];
  price: (typeof Products.$inferSelect)["price"];
  size: (typeof Products.$inferSelect)["size"];
  category: (typeof Categories.$inferSelect)["name"] | null;
  supplier: (typeof Suppliers.$inferSelect)["name"] | null;
  returnedAt: (typeof Products.$inferSelect)["returnedAt"];
};

export default async function Page() {
  noStore();
  const data: ProductTable[] = await db
    .select({
      id: Products.id,
      name: Products.name,
      price: Products.price,
      size: Products.size,
      category: Categories.name,
      supplier: Suppliers.name,
      returnedAt: Products.returnedAt,
    })
    .from(Products)
    .leftJoin(Categories, eq(Products.categoryId, Categories.id))
    .leftJoin(Suppliers, eq(Products.supplierId, Suppliers.id))
    .where(isNotNull(Products.returnedAt));

  return (
    <>
      <div className="h-10">
        <h1 className="font-semibold text-3xl">Devoluciones</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
