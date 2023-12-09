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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  amount: number;
  // status: "pending" | "processing" | "success" | "failed";
  status: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "",
    header: "Fecha Alta",
    cell: ({ row }) => {
      return <span>{new Date().toJSON().slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "",
    header: "Celular",
    cell: ({ row }) => {
      return <a href="">3401 409416</a>;
    },
  },
  {
    accessorKey: "status",
    header: "P. Vendidos",
  },
  {
    accessorKey: "status",
    header: "P. Disponibles",
  },
  {
    accessorKey: "status",
    header: "Pagos pendientes",
  },
  {
    accessorKey: "amount",
    header: "Saldo",
    cell: ({ row }) => {
      return <span>$ {row.getValue("amount")}</span>;
    },
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
