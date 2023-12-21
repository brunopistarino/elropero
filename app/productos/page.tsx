import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { NewProduct } from "./new-product";
import { db } from "@/lib/drizzle";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Categories, Products, Suppliers } from "@/lib/schema";
import { eq } from "drizzle-orm";

// async function getData(): Promise<Payment[]> {}

export type ProductTable = {
  id: (typeof Products.$inferSelect)["id"];
  name: (typeof Products.$inferSelect)["name"];
  price: (typeof Products.$inferSelect)["price"];
  size: (typeof Products.$inferSelect)["size"];
  category: (typeof Categories.$inferSelect)["name"] | null;
  supplier: (typeof Suppliers.$inferSelect)["name"] | null;
  createdAt: (typeof Products.$inferSelect)["createdAt"];
};

export default async function Page() {
  // const data = await getData();
  const data: ProductTable[] = await db
    .select({
      id: Products.id,
      name: Products.name,
      price: Products.price,
      size: Products.size,
      category: Categories.name,
      supplier: Suppliers.name,
      createdAt: Products.createdAt,
    })
    .from(Products)
    .leftJoin(Categories, eq(Products.categoryId, Categories.id))
    .leftJoin(Suppliers, eq(Products.supplierId, Suppliers.id));
  // const data = await db.query.Products.findMany({
  //   with: {
  //     category: true,
  //     supplier: true,
  //   },
  // });

  // const data = await db.query.Products.findMany({
  //   with: {
  //     category: true,
  //     supplier: true,
  //   },
  //   extras: {
  //     categoryName: (products, { ref }) => ref(products.category.name),
  //     supplierName: (products, { ref }) => ref(products.supplier.name),
  //   },
  // });

  // const data = await db.query.Products.findMany({
  //   columns: {
  //     id: true,
  //     name: true,
  //     price: true,
  //     size: true,
  //     categoryId: true,
  //     supplierId: true,
  //     createdAt: true,
  //     soldAt: true,
  //     returnedAt: true,
  //     paidAt: true,
  //   },
  //   with: {
  //     category: {
  //       columns: { name: true },
  //     },
  //     supplier: {
  //       columns: { name: true },
  //     },
  //   },
  // });

  console.log(data);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Productos</h1>
        <p>
          no se actualizaa bien cuando cambias algo (habria que poner nostore o
          algo mejor)
        </p>
        <Link
          href="/productos/crear"
          className={cn(buttonVariants(), "gap-1 px-3 font-semibold")}
        >
          <Plus />
          <p>Nuevo producto</p>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
