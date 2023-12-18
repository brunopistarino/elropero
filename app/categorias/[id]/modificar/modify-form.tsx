"use client";
import { useForm } from "react-hook-form";
import { categorySchema, categorySchemaType } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Category } from "@/lib/schema";
import { toast } from "sonner";
import { updateCategory } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModifyForm({ category }: { category: Category }) {
  const [isPending, setIsPending] = useState(false);

  // 1. Define the form.
  const form = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: categorySchemaType) {
    setIsPending(true);
    const response = await updateCategory(category.id, values);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Categoría modificada");
    // form.reset();
    setIsPending(false);
  }

  return (
    <div className="md:rounded-md border-y md:border bg-background mx-[-16px] md:mx-auto max-w-lg p-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end">
            <Link
              href="/categorias"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancelar
            </Link>
            <Button type="submit" disabled={isPending}>
              Modificar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
