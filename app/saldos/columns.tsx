"use client";

import { ColumnDef } from "@tanstack/react-table";
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
  MessageCircle,
} from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export type SaldosTable = {
  id: number;
  name: string;
  phone: string | null;
  count: number;
  amount: number;
};

export const columns: ColumnDef<SaldosTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
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
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Productos" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saldo" />
    ),
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(row.getValue("amount") as number);
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
      <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
        <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
          <DollarSign size={16} />
          <span className="sr-only">Pagar saldo</span>
        </Button>
        <Button variant="ghost" className="flex h-8 w-8 p-0">
          <MessageCircle size={16} />
          <span className="sr-only">Mandar mensaje</span>
        </Button>
      </div>
    ),
  },
];
