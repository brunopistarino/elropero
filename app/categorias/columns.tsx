"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import type { CategoryTable } from "./table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<CategoryTable>[] = [
  {
    accessorKey: "id",
    // header: "Código",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Cógido
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "name",
    // header: "Nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "count",
    // header: "Productos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Productos" />
    ),
  },
  {
    id: "Acciones",
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="flex h-8 w-8 p-0">
                <Trash size={16} />
                <span className="sr-only">Eliminar categoría</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Estas seguro de eliminar la categoría &quot;
                  {row.getValue("name")}&quot;?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará
                  permanentemente la cetegoría y los productos asociados a esta
                  quedarán sin.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Button variant="destructive">Eliminar</Button>
                {/* <AlertDialogAction className="">Continue</AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TooltipWrapper>
      </div>
    ),
  },
];
