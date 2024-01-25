"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      }).format((row.getValue("amount") as number) / 100);
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => (
      <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
        <Link
          href={`/saldos/${row.getValue("id")}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex h-8 w-8 p-0 ml-auto"
          )}
        >
          <DollarSign size={16} />
          <span className="sr-only">Pagar saldo</span>
        </Link>
        <Link
          href={`https://wa.me/${row.getValue(
            "phone"
          )}?text=Hola ${row.getValue(
            "name"
          )}, te hablo desde el ropero. Vendiste ${row.getValue(
            "count"
          )} productos y tenes un saldo pendiente de ${new Intl.NumberFormat(
            "es-AR",
            {
              style: "currency",
              currency: "ARS",
            }
          ).format(
            (row.getValue("amount") as number) / 100
          )}. Podes pasar a cobrar los viernes por la mañana.
            `}
          target="_blank"
          referrerPolicy="no-referrer"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex h-8 w-8 p-0"
          )}
        >
          <MessageCircle size={16} />
          <span className="sr-only">Mandar mensaje</span>
        </Link>
      </div>
    ),
  },
];
