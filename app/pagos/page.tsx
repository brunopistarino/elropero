import Breadcrumbs from "@/components/breadcrumbs";

import { db } from "@/lib/drizzle";
import {
  count,
  eq,
  gt,
  and,
  isNull,
  isNotNull,
  sum,
  sql,
  desc,
} from "drizzle-orm";
import { Categories, Products, Suppliers } from "@/lib/schema";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export type PaymentsTable = {
  id: String;
  name: (typeof Products.$inferSelect)["name"];
  price: (typeof Products.$inferSelect)["price"];
  size: (typeof Products.$inferSelect)["size"];
  category: (typeof Categories.$inferSelect)["name"] | null;
  supplier: (typeof Suppliers.$inferSelect)["name"] | null;
  paidAt: (typeof Products.$inferSelect)["paidAt"];
};

export default async function Page() {
  const pagos: PaymentsTable[] = await db
    .select({
      id: sql<String>`CAST(${Products.id} AS VARCHAR)`,
      name: Products.name,
      price: Products.price,
      size: Products.size,
      category: Categories.name,
      supplier: Suppliers.name,
      paidAt: Products.paidAt,
    })
    .from(Products)
    .leftJoin(Categories, eq(Products.categoryId, Categories.id))
    .leftJoin(Suppliers, eq(Products.supplierId, Suppliers.id))
    .where(isNotNull(Products.paidAt))
    .orderBy(desc(Products.paidAt));

  return (
    <>
      <Breadcrumbs />
      <DataTable columns={columns} data={pagos} />
    </>
  );
}
