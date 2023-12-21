import { buttonVariants } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/breadcrumbs";
import { db } from "@/lib/drizzle";
import { Suppliers } from "@/lib/schema";

export default async function Page() {
  const suppliers = await db.select().from(Suppliers).orderBy(Suppliers.name);

  return (
    <>
      <div className="flex justify-between">
        <Breadcrumbs />
        <p>(agregar el botón de whatsapp que te arme el mensaje)</p>
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
