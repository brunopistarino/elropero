import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { NewProduct } from "./new-product";
import { db } from "@/lib/drizzle";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Mariaa",
      prize: 100,
    },
    {
      id: "2",
      status: "returned",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "3",
      status: "sold",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "4",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "5",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "6",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Productos</h1>
        {/* <NewProduct categories={cateories} suppliers={suppliers} /> */}
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
