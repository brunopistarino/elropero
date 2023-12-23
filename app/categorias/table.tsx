import { db } from "@/lib/drizzle";
import { Categories, Products } from "@/lib/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { unstable_noStore as noStore } from "next/cache";
import { count, eq, and, isNull } from "drizzle-orm";

export type CategoryTable = {
  id: (typeof Categories.$inferSelect)["id"];
  name: (typeof Categories.$inferSelect)["name"];
  count: number;
};

export default async function Table() {
  noStore();

  const startTime = Date.now();

  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  const availableProducts = db
    .select()
    .from(Products)
    .where(and(isNull(Products.soldAt), isNull(Products.returnedAt)))
    .as("availableProducts");

  const data: CategoryTable[] = await db
    .select({
      id: Categories.id,
      name: Categories.name,
      count: count(availableProducts.id),
    })
    .from(Categories)
    .leftJoin(
      availableProducts,
      eq(availableProducts.categoryId, Categories.id)
    )
    .groupBy(Categories.id)
    .orderBy(Categories.id);

  const duration = Date.now() - startTime;
  return (
    <>
      <DataTable columns={columns} data={data} />
      <p className="text-sm text-gray-500">
        Fetched {data.length} categories in {duration}ms
      </p>
    </>
  );
}
