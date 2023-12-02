"use client";

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
    header: "Productos vendidos",
  },
  {
    accessorKey: "status",
    header: "Productos a la venta",
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
];
