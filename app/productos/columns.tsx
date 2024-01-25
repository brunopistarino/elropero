"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import type { ProductTable } from "./page";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<ProductTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Ingreso" />
    ),
    cell: ({ row }) => {
      // const date: Date = row.getValue("createdAt");
      // return date;
      // console.log(date);
      return (row.getValue("createdAt") as Date).toJSON().slice(0, 10);
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
      // return <span>$ {row.getValue("price")}</span>;
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format((row.getValue("price") as number) / 100);
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Estado",
  //   cell: ({ row }) => {
  //     const status: string = row.getValue("status");

  //     return (
  //       <div className="flex items-center">
  //         {status === "available" && (
  //           <>
  //             <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
  //             Disponible
  //           </>
  //         )}
  //         {status === "sold" && (
  //           <>
  //             <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />
  //             Vendido
  //           </>
  //         )}
  //         {status === "returned" && (
  //           <>
  //             <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
  //             Devuelto
  //           </>
  //         )}
  //       </div>
  //     );
  //   },
  // },
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
      // <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
      //   <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
      //     <DollarSign size={16} />
      //     <span className="sr-only">Marcar producto como vendido</span>
      //   </Button>
      //   <Button variant="ghost" className="flex h-8 w-8 p-0">
      //     <RefreshCcw size={16} />
      //     <span className="sr-only">Marcar producto como devuelto</span>
      //   </Button>
      //   <Button variant="ghost" className="flex h-8 w-8 p-0">
      //     <Pencil size={16} />
      //     <span className="sr-only">Modificar producto</span>
      //   </Button>
      //   <Button variant="ghost" className="flex h-8 w-8 p-0">
      //     <Trash size={16} />
      //     <span className="sr-only">Eliminar producto</span>
      //   </Button>
      // </div>
      <DataTableRowActions row={row} />
    ),
  },
];
