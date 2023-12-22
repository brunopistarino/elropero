"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DollarSign, RefreshCcw, Pencil, Trash } from "lucide-react";
import { markProductAsSold } from "@/lib/actions";

// import { labels } from "../data/data";
// import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const id: number = row.getValue("id");

  const handleSellSubmit = () => {
    console.log("Sell", id);
    markProductAsSold(id);
  };

  return (
    <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
      <form action={handleSellSubmit}>
        <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
          <DollarSign size={16} />
          <span className="sr-only">Marcar producto como vendido</span>
        </Button>
      </form>
      <Button variant="ghost" className="flex h-8 w-8 p-0">
        <RefreshCcw size={16} />
        <span className="sr-only">Marcar producto como devuelto</span>
      </Button>
      <Button variant="ghost" className="flex h-8 w-8 p-0">
        <Pencil size={16} />
        <span className="sr-only">Modificar producto</span>
      </Button>
      <Button variant="ghost" className="flex h-8 w-8 p-0">
        <Trash size={16} />
        <span className="sr-only">Eliminar producto</span>
      </Button>
    </div>
  );
}
