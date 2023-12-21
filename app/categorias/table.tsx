import { db } from "@/lib/drizzle";
import { Categories, Products } from "@/lib/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { unstable_noStore as noStore } from "next/cache";
import { count, eq } from "drizzle-orm";

export type CategoryTable = {
  id: (typeof Categories.$inferSelect)["id"];
  name: (typeof Categories.$inferSelect)["name"];
  count: number;
};

export default async function Table() {
  noStore();

  const startTime = Date.now();

  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  // const data = await db.select().from(Categories).orderBy(Categories.id);

  const data: CategoryTable[] = await db
    .select({
      id: Categories.id,
      name: Categories.name,
      count: count(Products.id),
      // count: sql < number > `cast(count(${elroperoCategories.id}) as int)`,
    })
    .from(Categories)
    .leftJoin(Products, eq(Products.categoryId, Categories.id))
    .groupBy(Categories.id)
    .orderBy(Categories.id);
  console.log(data);

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
