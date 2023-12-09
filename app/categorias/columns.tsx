"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Category } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "productCount",
    header: "Productos",
    cell: ({ row }) => 30,
    // cell: ({ row }) => <span>{row.original.products.length}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      // <DataTableRowActions row={row} />
      <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground justify-end">
        <TooltipWrapper text="Modificar categoría">
          <Link
            href={`/categorias/${row.getValue("id")}/modificar`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex h-8 w-8 p-0"
            )}
            // className="flex h-8 w-8 p-0"
          >
            <Pencil size={16} />
            <span className="sr-only">Modificar categoría</span>
          </Link>
        </TooltipWrapper>
        <TooltipWrapper text="Eliminar categoría">
          <Button variant="ghost" className="flex h-8 w-8 p-0">
            <Trash size={16} />
            <span className="sr-only">Eliminar categoría</span>
          </Button>
        </TooltipWrapper>
      </div>
    ),
  },
];
