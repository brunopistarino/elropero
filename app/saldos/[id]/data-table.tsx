"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { DollarSign, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { markProductsAsPaid } from "@/lib/actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isPending, setIsPending] = useState(false);
  const form = useForm();

  const selectedRows = table
    .getRowModel()
    .rows.filter((row) => row.getIsSelected());

  const selectedRowsIds = selectedRows.map((row) => Number(row.getValue("id")));

  const totalPrice =
    selectedRows.reduce(
      (acc, curr) => acc + (curr.getValue("supplierProfit") as number),
      0
    ) / 100;

  console.log(selectedRowsIds);

  async function handlePaySubmit() {
    setIsPending(true);
    const response = await markProductsAsPaid(selectedRowsIds);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Pagos realizados");
  }

  useEffect(() => {
    table.toggleAllPageRowsSelected(true);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 md:rounded-md border-y md:border bg-background -mx-4 md:mx-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            <TableRow className="font-semibold">
              <TableCell colSpan={columns.length - 1} className="h-16">
                Total
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                }).format(totalPrice)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <form onSubmit={form.handleSubmit(handlePaySubmit)} className="ml-auto">
        <Button
          className="gap-1 font-semibold px-3"
          disabled={selectedRowsIds.length === 0 || isPending}
        >
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <DollarSign size={16} />
          )}
          Pagar
        </Button>
      </form>
    </>
  );
}
