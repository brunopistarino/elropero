"use client";

import { Row } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";

import { DollarSign, RefreshCcw, Pencil, Trash, Loader2 } from "lucide-react";
import {
  markProductAsSold,
  markProductAsReturned,
  deleteProduct,
} from "@/lib/actions";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const [isSellPending, setIsSellPending] = useState(false);
  const [isReturnPending, setIsReturnPending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const form = useForm();

  const id: number = row.getValue("id");

  async function handleSellSubmit() {
    setIsSellPending(true);
    const response = await markProductAsSold(id);
    if (response?.error) {
      toast.error(response.error);
      setIsSellPending(false);
      return;
    }
    toast.success("Producto vendido");
    setIsSellPending(false);
  }

  async function handleReturnSubmit() {
    setIsReturnPending(true);
    const response = await markProductAsReturned(id);
    if (response?.error) {
      toast.error(response.error);
      setIsReturnPending(false);
      return;
    }
    toast.success("Producto devuelto");
    setIsReturnPending(false);
  }

  async function handleDeleteSubmit() {
    setIsDeletePending(true);
    const response = await deleteProduct(id);
    if (response?.error) {
      toast.error(response.error);
      setIsDeletePending(false);
      return;
    }
    toast.success("Producto eliminado");
    setIsDeletePending(false);
    setIsDeleteOpen(false);
  }

  return (
    <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground">
      <form onSubmit={form.handleSubmit(handleSellSubmit)} className="ml-auto">
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0"
          disabled={isSellPending || isReturnPending}
        >
          {isSellPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <DollarSign size={16} />
          )}
          <span className="sr-only">Marcar producto como vendido</span>
        </Button>
      </form>
      <form onSubmit={form.handleSubmit(handleReturnSubmit)}>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0"
          disabled={isSellPending || isReturnPending}
        >
          {isReturnPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCcw size={16} />
          )}
          <span className="sr-only">Marcar producto como devuelto</span>
        </Button>
      </form>
      <Link
        href={`/productos/${row.getValue("id")}/modificar`}
        className={cn(buttonVariants({ variant: "ghost" }), "flex h-8 w-8 p-0")}
      >
        <Pencil size={16} />
        <span className="sr-only">Modificar producto</span>
      </Link>
      <AlertDialog open={isDeleteOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0"
            onClick={() => {
              setIsDeleteOpen(true);
            }}
          >
            <Trash size={16} />
            <span className="sr-only">Eliminar categoría</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Estas seguro de eliminar el producto &quot;
              {row.getValue("name")}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el producto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <form onSubmit={form.handleSubmit(handleDeleteSubmit)}>
              <Button variant="destructive" disabled={isDeletePending}>
                Eliminar
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
