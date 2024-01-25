"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { ProductTable } from "./page";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { DollarSign, X } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
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
      }).format((row.getValue("price") as number) / 100);
    },
  },
  {
    accessorKey: "businessProfit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ropero" />
    ),
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format((row.getValue("businessProfit") as number) / 100);
    },
  },
  {
    accessorKey: "supplierProfit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proveedora" />
    ),
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format((row.getValue("supplierProfit") as number) / 100);
    },
  },
  {
    accessorKey: "paidAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pagado" />
    ),
    cell: ({ row }) => {
      if (row.getValue("paidAt") === null) {
        return <Badge variant="destructive">No</Badge>;
      } else {
        return <Badge variant="default">Si</Badge>;
      }
    },
  },
  {
    id: "Acciones",
    cell: ({ row }) => {
      if (row.getValue("paidAt") === null) {
        return <DataTableRowActions row={row} />;
      } else {
        return (
          // <div className="ml-auto opacity-0 group-hover:opacity-100">
          //   <Button variant="ghost" className="h-8 w-8 p-0" disabled>
          //     <DollarSign size={16} />
          //     <span className="sr-only">Cancelar venta</span>
          //   </Button>
          // </div>
          <div className="ml-auto opacity-0 group-hover:opacity-100">
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 ml-auto"
              disabled
            >
              <DollarSign size={16} />
            </Button>
          </div>
        );
      }
    },
  },
];
