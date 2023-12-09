"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { categorySchema, categorySchemaType } from "@/lib/zod-schemas";
import Link from "next/link";

export default function Page() {
  const [isPending, setIsPending] = useState(false);
  // 1. Define your form.
  const form = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  // async function onSubmit(values: categorySchemaType) {
  //   setIsPending(true);
  //   const response = await createCategory(values);
  //   if (response?.error) {
  //     toast.error(response.error);
  //     setIsPending(false);
  //     return;
  //   }
  //   form.reset();
  //   setIsPending(false);
  //   setIsOpen(false);
  // }
  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold text-3xl">Categorías / Nueva categoría</p>
        {/* <NewCategory /> */}
      </div>
      <div className="md:rounded-md border-y md:border bg-background mx-[-16px] md:mx-auto max-w-lg p-6 w-full">
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
          <form className="space-y-8">
            {/* This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. */}
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
                Crear
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
