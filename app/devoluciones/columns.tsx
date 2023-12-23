"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { ProductTable } from "./page";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ProductTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "returnedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Devolución" />
    ),
    cell: ({ row }) => {
      // const date: Date = row.getValue("createdAt");
      // return date;
      // console.log(date);
      return (row.getValue("returnedAt") as Date).toJSON().slice(0, 10);
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
    id: "acciones",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
