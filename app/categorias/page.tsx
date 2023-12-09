// import { sql } from "@vercel/postgres";
// import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { NewCategory } from "./new-category";
import { Categories } from "@/lib/schema";
import { db } from "@/lib/drizzle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

// import { useQuery } from "react-query";

export default async function Page() {
  const startTime = Date.now();
  // const data = await prisma.category.findMany({
  //   include: {
  //     products: {
  //       select: {
  //         id: true,
  //       },
  //     },
  //   },
  // });
  const data = await db.select().from(Categories).orderBy(Categories.id);
  // const data = await db.query(sql`
  //   SELECT
  //     "Categories"."id",
  //     "Categories"."name",
  //     "Categories"."createdAt",
  //     "Categories"."updatedAt",
  //     COUNT("Products"."id") AS "productsCount"
  //   FROM "Categories"
  //   LEFT JOIN "Products" ON "Categories"."id" = "Products"."categoryId"
  //   GROUP BY "Categories"."id"
  // `);

  const duration = Date.now() - startTime;

  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold text-3xl">Categorías</p>
        <Link href="/categorias/crear">
          <Button className="gap-1 px-3 font-semibold">
            <Plus />
            <p>Nueva categoría</p>
          </Button>
        </Link>
        <NewCategory />
      </div>
      <DataTable columns={columns} data={data} />
      <p className="text-sm text-gray-500">
        Fetched {data.length} categories in {duration}ms
      </p>
    </>
  );
}
