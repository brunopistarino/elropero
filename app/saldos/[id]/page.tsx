import { db } from "@/lib/drizzle";
import { Categories, Products, Suppliers } from "@/lib/schema";
import { eq, isNotNull, isNull, and } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export type SupplierSaldoTable = {
  id: (typeof Products.$inferSelect)["id"];
  category: (typeof Categories.$inferSelect)["name"] | null;
  name: (typeof Products.$inferSelect)["name"];
  size: (typeof Products.$inferSelect)["size"];
  soldAt: (typeof Products.$inferSelect)["soldAt"];
  supplierProfit: (typeof Products.$inferSelect)["supplierProfit"];
};

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [supplier] = await db
    .select({
      name: Suppliers.name,
    })
    .from(Suppliers)
    .where(eq(Suppliers.id, id))
    .limit(1);

  const soldNotPaidProducts: SupplierSaldoTable[] = await db
    .select({
      id: Products.id,
      category: Categories.name,
      name: Products.name,
      size: Products.size,
      soldAt: Products.soldAt,
      supplierProfit: Products.supplierProfit,
    })
    .from(Products)
    .leftJoin(Categories, eq(Products.categoryId, Categories.id))
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
    </>
  );
}
