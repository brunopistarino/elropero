"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { ProductTable } from "./page";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ProductTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "soldAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Venta" />
    ),
    cell: ({ row }) => {
      // const date: Date = row.getValue("createdAt");
      // return date;
      // console.log(date);
      return (row.getValue("soldAt") as Date).toJSON().slice(0, 10);
      // return <span>{new Date().toJSON().slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoría" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Talle" />
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proveedora" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio" />
    ),
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(row.getValue("price"));
    },
  },
  {
    accessorKey: "Ropero",
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format((row.getValue("price") as number) / 2);
    },
  },
  {
    accessorKey: "Proveedora",
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format((row.getValue("price") as number) / 2);
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => (
      // <Button
      //   variant="ghost"
      //   className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      // >
      //   <MoreHorizontal className="h-4 w-4" />
      //   <span className="sr-only">Open menu</span>
      // </Button>
      // <DataTableRowActions row={row} />
      // <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
      //   <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
      //     <DollarSign size={16} />
      //     <span className="sr-only">Marcar producto como vendido</span>
      //   </Button>
      //   <Button variant="ghost" className="flex h-8 w-8 p-0">
      //     <RefreshCcw size={16} />
      //     <span className="sr-only">Marcar producto como devuelto</span>
      //   </Button>
      //   <Button variant="ghost" className="flex h-8 w-8 p-0">
      //     <Pencil size={16} />
      //     <span className="sr-only">Modificar producto</span>
      //   </Button>
      //   <Button variant="ghost" className="flex h-8 w-8 p-0">
      //     <Trash size={16} />
      //     <span className="sr-only">Eliminar producto</span>
      //   </Button>
      // </div>
      <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
        <X size={16} />
        <span className="sr-only">Cancelar venta</span>
      </Button>
    ),
  },
];
