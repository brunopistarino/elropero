"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  date: Date;
  category: string;
  description: string;
  size: string;
  proveedora: string;
  prize: number;
  status: "available" | "sold" | "returned";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "",
    header: "Fecha Ingreso",
    cell: ({ row }) => {
      return <span>{new Date().toJSON().slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "size",
    header: "Talle",
  },
  {
    accessorKey: "proveedora",
    header: "Proveedora",
  },
  {
    accessorKey: "prize",
    header: "Precio",
    cell: ({ row }) => {
      return <span>$ {row.getValue("prize")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div className="flex items-center">
          {status === "available" && (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
              Disponible
            </>
          )}
          {status === "sold" && (
            <>
              <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              Vendido
            </>
          )}
          {status === "returned" && (
            <>
              <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              Devuelto
            </>
          )}
        </div>
      );
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
      <DataTableRowActions row={row} />
    ),
  },
];
