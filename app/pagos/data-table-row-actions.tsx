"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { markProductAsUnpaid } from "@/lib/actions";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isPending, setIsPending] = useState(false);
  const form = useForm();
  const id: number = row.getValue("id");

  async function handleUnpaidSubmit() {
    setIsPending(true);
    const response = await markProductAsUnpaid(id);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Venta eliminada");
    setIsPending(false);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleUnpaidSubmit)}
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
        <span className="sr-only">Cancelar pago</span>
      </Button>
    </form>
  );
}
