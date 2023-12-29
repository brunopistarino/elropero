import { db } from "@/lib/drizzle";
import { Products, Suppliers } from "@/lib/schema";
import { eq, isNotNull, isNull, and } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataTableDemo } from "./data-table2";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [supplier] = await db
    .select({
      name: Suppliers.name,
    })
    .from(Suppliers)
    .where(eq(Suppliers.id, id))
    .limit(1);

  const soldNotPaidProducts = await db
    .select()
    .from(Products)
    .where(
      and(
        isNotNull(Products.soldAt),
        isNull(Products.paidAt),
        eq(Products.supplierId, id)
      )
    );

  if (!supplier) {
    notFound();
  }

  return (
    <>
      <div className="flex gap-4 justify-between">
        <p className="font-semibold text-3xl text-muted-foreground">
          <Link href="/saldos" className="hover:underline">
            Pagos pendientes
          </Link>{" "}
          / <span className="text-foreground">{supplier.name}</span>
        </p>
        {/* <Button className="ml-auto gap-1 font-semibold">
          <DollarSign size={16} />
          Pagar
        </Button> */}
      </div>
      {/* <div>
        {soldNotPaidProducts.map((product) => (
          <p key={product.id}>
            {product.name} - {product.price}
          </p>
        ))}
      </div> */}
      {/* <DataTableDemo /> */}
      <DataTable columns={columns} data={soldNotPaidProducts} />
      <Button className="ml-auto gap-1 font-semibold">
        <DollarSign size={16} />
        Pagar
      </Button>
    </>
  );
}
