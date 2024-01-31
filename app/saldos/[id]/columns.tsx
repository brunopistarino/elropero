"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { SupplierSaldoTable } from "./page";

export const columns: ColumnDef<SupplierSaldoTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="h-8 flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Código",
  },
  {
    accessorKey: "soldAt",
    header: "Fecha Venta",
    cell: ({ row }) => {
      return (row.getValue("soldAt") as Date).toJSON().slice(0, 10);
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "name",
    header: "Descripción",
  },
  {
    accessorKey: "size",
    header: "Talle",
  },
  {
    accessorKey: "supplierProfit",
    header: "Monto",
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format((row.getValue("supplierProfit") as number) / 100);
    },
  },
];
