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
import { unstable_noStore as noStore } from "next/cache";

export type PaymentsTable = {
  id: String;
  name: (typeof Products.$inferSelect)["name"];
  size: (typeof Products.$inferSelect)["size"];
  category: (typeof Categories.$inferSelect)["name"] | null;
  supplier: (typeof Suppliers.$inferSelect)["name"] | null;
  paidAt: (typeof Products.$inferSelect)["paidAt"];
  supplierProfit: (typeof Products.$inferSelect)["supplierProfit"];
};

export default async function Page() {
  noStore();
  const pagos: PaymentsTable[] = await db
    .select({
      id: sql<String>`CAST(${Products.id} AS VARCHAR)`,
      name: Products.name,
      size: Products.size,
      category: Categories.name,
      supplier: Suppliers.name,
      paidAt: Products.paidAt,
      supplierProfit: Products.supplierProfit,
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
