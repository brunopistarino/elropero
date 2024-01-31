"use client";

import { Row } from "@tanstack/react-table";

import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { deleteCategory } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm();

  const id: number = row.getValue("id");

  async function handleDeleteSubmit() {
    setIsPending(true);
    const response = await deleteCategory(id);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Categoría eliminada");
    setIsPending(false);
    setIsOpen(false);
  }

  return (
    <div className="flex opacity-0 group-hover:opacity-100 text-muted-foreground justify-end">
      <TooltipWrapper text="Modificar categoría">
        <Link
          href={`/categorias/${row.getValue("id")}/modificar`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex h-8 w-8 p-0"
          )}
        >
          <Pencil size={16} />
          <span className="sr-only">Modificar categoría</span>
        </Link>
      </TooltipWrapper>
      <AlertDialog open={isOpen}>
        <TooltipWrapper text="Eliminar categoría">
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Trash size={16} />
              <span className="sr-only">Eliminar categoría</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipWrapper>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Estas seguro de eliminar la categoría &quot;
              {row.getValue("name")}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la cetegoría y los productos asociados a esta quedarán sin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <form onSubmit={form.handleSubmit(handleDeleteSubmit)}>
              <Button variant="destructive" disabled={isPending}>
                Eliminar
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
