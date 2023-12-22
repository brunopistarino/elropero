"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { CategoryTable } from "./table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<CategoryTable>[] = [
  {
    accessorKey: "id",
    // header: "Código",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "name",
    // header: "Nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "count",
    // header: "Productos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Productos" />
    ),
  },
  {
    id: "Acciones",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
