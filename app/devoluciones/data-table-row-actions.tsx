"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Loader2, X } from "lucide-react";
import { markProductAsUnreturned } from "@/lib/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isPending, setIsPending] = useState(false);
  const form = useForm();
  const id: number = row.getValue("id");

  async function handleUnreturnSubmit() {
    setIsPending(true);
    const response = await markProductAsUnreturned(id);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Devolución eliminada");
    setIsPending(false);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleUnreturnSubmit)}
      className="ml-auto opacity-0 group-hover:opacity-100"
    >
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 ml-auto"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <X size={16} />
        )}
        <span className="sr-only">Cancelar venta</span>
      </Button>
    </form>
  );
}
