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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
