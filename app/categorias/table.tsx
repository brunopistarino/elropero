import { db } from "@/lib/drizzle";
import { Categories } from "@/lib/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { unstable_noStore as noStore } from "next/cache";

export default async function Table() {
  noStore();

  const startTime = Date.now();

  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await db.select().from(Categories).orderBy(Categories.id);

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
