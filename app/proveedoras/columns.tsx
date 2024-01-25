"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { DollarSign, Pencil, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import type { Supplier } from "@/lib/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DataTableRowActions } from "./data-table-row-actions";

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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "acciones",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
