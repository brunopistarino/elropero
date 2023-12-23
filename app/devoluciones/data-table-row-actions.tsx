"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { markProductAsUnreturned } from "@/lib/actions";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id: number = row.getValue("id");

  const handleUnsellSubmit = () => {
    console.log("Sell", id);
    markProductAsUnreturned(id);
  };

  return (
    <form
      action={handleUnsellSubmit}
      className="ml-auto opacity-0 group-hover:opacity-100"
    >
      <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
        <X size={16} />
        <span className="sr-only">Cancelar venta</span>
      </Button>
    </form>
  );
}
