"use client";

import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  XCircle,
  RefreshCcw,
  Pencil,
  Trash,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import type { Supplier } from "@/lib/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Alta" />
    ),
    cell: ({ row }) => {
      return (row.getValue("createdAt") as Date).toJSON().slice(0, 10);
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Celular" />
    ),
    cell: ({ row }) => {
      const phone: string = row.getValue("phone");
      return (
        <a
          target="_blank"
          referrerPolicy="no-referrer"
          href={`https://wa.me/549${phone}`}
          className="hover:underline underline-offset-2"
        >
          {phone}
        </a>
      );
    },
  },
  {
    accessorKey: "dni",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DNI" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dirección" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      // <Button
      //   variant="ghost"
      //   className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      // >
      //   <MoreHorizontal className="h-4 w-4" />
      //   <span className="sr-only">Open menu</span>
      // </Button>
      // <DataTableRowActions row={row} />
      <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
        <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
          <DollarSign size={16} />
          <span className="sr-only">Pagar saldo</span>
        </Button>
        <Button variant="ghost" className="flex h-8 w-8 p-0">
          <Pencil size={16} />
          <span className="sr-only">Modificar proveedora</span>
        </Button>
        <Button variant="ghost" className="flex h-8 w-8 p-0">
          <Trash size={16} />
          <span className="sr-only">Eliminar proveedora</span>
        </Button>
      </div>
    ),
  },
];
