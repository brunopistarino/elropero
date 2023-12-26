import { buttonVariants } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/breadcrumbs";
import { db } from "@/lib/drizzle";
import { Suppliers } from "@/lib/schema";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore();
  const suppliers = await db.select().from(Suppliers).orderBy(Suppliers.name);

  return (
    <>
      <div className="flex justify-between">
        <Breadcrumbs />
        <Link
          href="/proveedoras/crear"
          className={cn(buttonVariants(), "gap-1 px-3 font-semibold")}
        >
          <Plus />
          <p>Nueva proveedora</p>
        </Link>
        {/* <NewCustomer /> */}
      </div>
      <DataTable columns={columns} data={suppliers} />
    </>
  );
}
