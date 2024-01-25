import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignJustify, LayoutGrid, List } from "lucide-react";

import { db } from "@/lib/drizzle";
import { Categories, Products, Suppliers } from "@/lib/schema";
import { unstable_noStore as noStore } from "next/cache";
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

import { SaldosTable, columns } from "./columns";
import { DataTable } from "./data-table";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Page() {
  noStore();

  const soldNotPaidProducts = db
    .select()
    .from(Products)
    .where(and(isNotNull(Products.soldAt), isNull(Products.paidAt)))
    .as("soldNotPaidProducts");

  const data: SaldosTable[] = await db
    .select({
      id: Suppliers.id,
      name: Suppliers.name,
      phone: Suppliers.phone,
      count: count(soldNotPaidProducts.id),
      amount: sql<number>`cast(sum(${soldNotPaidProducts.supplierProfit}) as int)`,
    })
    .from(Suppliers)
    .leftJoin(
      soldNotPaidProducts,
      eq(soldNotPaidProducts.supplierId, Suppliers.id)
    )
    .groupBy(Suppliers.id)
    .having(gt(sum(soldNotPaidProducts.supplierProfit), 0));
  // console.log(data);

  // calculate totalAmount
  const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  const totalProducts = data.reduce((acc, curr) => acc + curr.count, 0);

  // .orderBy(Suppliers.id);

  // const data = await db
  //   .select()
  //   .from(Suppliers)
  //   .leftJoin(
  //     db
  //       .select({
  //         id: Suppliers.id,
  //         name: Suppliers.name,
  //         count: count(soldNotPaidProducts.id),
  //       })
  //       .from(Suppliers)
  //       .leftJoin(
  //         soldNotPaidProducts,
  //         eq(soldNotPaidProducts.supplierId, Suppliers.id)
  //       )
  //       .groupBy(Suppliers.id)
  //       .orderBy(Suppliers.id)
  //       .as("data"),
  //     eq(Suppliers.id, data.id)
  //   );

  return (
    <>
      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex flex-col w-full p-6 rounded-md border gap-2 bg-background">
            <p>Proveedoras</p>
            <p className="text-4xl font-semibold">{data.length}</p>
          </div>
          <div className="flex flex-col w-full p-6 rounded-md border gap-2 bg-background">
            <p>Productos</p>
            <p className="text-4xl font-semibold">{totalProducts}</p>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 w-full p-6 rounded-md border gap-2 bg-background overflow-x-auto">
            <p>Monto total</p>
            <p className="text-4xl font-semibold">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(totalAmount / 100)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* <div className="flex gap-3">
          <Input placeholder="Buscar" />
          <Tabs defaultValue="account">
            <TabsList className="bg-background border">
              <TabsTrigger value="account">
                <LayoutGrid size={20} />
              </TabsTrigger>
              <TabsTrigger value="password">
                <AlignJustify size={20} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant={"outline"}>Filtros</Button>
        </div> */}
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
