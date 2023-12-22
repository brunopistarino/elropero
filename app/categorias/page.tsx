// import { sql } from "@vercel/postgres";
// import prisma from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Categories } from "@/lib/schema";
import { db } from "@/lib/drizzle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Table from "./table";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

// import { useQuery } from "react-query";

export default async function Page() {
  // const startTime = Date.now();
  // // const data = await prisma.category.findMany({
  // //   include: {
  // //     products: {
  // //       select: {
  // //         id: true,
  // //       },
  // //     },
  // //   },
  // // });
  // const data = await db.select().from(Categories).orderBy(Categories.id);
  // // const data = await db.query(sql`
  // //   SELECT
  // //     "Categories"."id",
  // //     "Categories"."name",
  // //     "Categories"."createdAt",
  // //     "Categories"."updatedAt",
  // //     COUNT("Products"."id") AS "productsCount"
  // //   FROM "Categories"
  // //   LEFT JOIN "Products" ON "Categories"."id" = "Products"."categoryId"
  // //   GROUP BY "Categories"."id"
  // // `);

  // const duration = Date.now() - startTime;

  return (
    <>
      <div className="flex justify-between">
        {/* <p className="font-semibold text-3xl">Categorías</p> */}
        <Breadcrumbs />

        <Link
          href="/categorias/crear"
          className={cn(buttonVariants(), "gap-1 px-3 font-semibold")}
        >
          <Plus />
          <p>Nueva categoría</p>
        </Link>
      </div>
      {/* <Suspense fallback={<p>aaaaaa</p>}> */}
      <Suspense
        fallback={
          // <div className="h-12 w-full bg-gray-300 md:rounded-md animate-pulse"></div>
          // <div className="animate-pulse md:rounded-md overflow-hidden">
          //   <div className="h-12 w-full bg-muted-foreground/20" />
          //   <div className="h-[37px] flex items-center gap-4">
          //     <div className="h-4 bg-muted-foreground/20 w-full rounded-md" />
          //     <div className="h-4 bg-muted-foreground/20 w-full rounded-md" />
          //     <div className="h-4 bg-muted-foreground/20 w-full rounded-md" />
          //     <div className="h-4 bg-muted-foreground/20 w-full rounded-md" />
          //   </div>
          //   <div className="h-4 w-10 bg-slate-300 mt-4"></div>
          // </div>
          // <div className="flex flex-col gap-4 animate-pulse">
          //   <div className="flex justify-between gap-3">
          //     <div className="rounded-md w-full max-w-sm h-10 bg-muted-foreground/20" />
          //     <div className="rounded-md w-full max-w-[125px] h-10 bg-muted-foreground/20" />
          //   </div>
          <div className="md:rounded-md w-full h-96 bg-muted-foreground/20" />
          // </div>
          // <div
          //   role="status"
          //   className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          // >
          //   <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          //     <svg
          //       className="w-10 h-10 text-gray-200 dark:text-gray-600"
          //       aria-hidden="true"
          //       xmlns="http://www.w3.org/2000/svg"
          //       fill="currentColor"
          //       viewBox="0 0 20 18"
          //     >
          //       <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          //     </svg>
          //   </div>
          //   <div className="w-full">
          //     <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          //     <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          //   </div>
          //   <span className="sr-only">Loading...</span>
          // </div>
        }
      >
        <Table />
      </Suspense>
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <p className="text-sm text-gray-500">
        Fetched {data.length} categories in {duration}ms
      </p> */}
    </>
  );
}
