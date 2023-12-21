"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  categorySchemaType,
  supplierSchema,
  supplierSchemaType,
} from "@/lib/zod-schemas";
import Link from "next/link";
import { createCategory, createSupplier } from "@/lib/actions";
import { toast } from "sonner";
import Breadcrumbs from "@/components/breadcrumbs";
import FormContainer from "@/components/form-container";

export default function Page() {
  const [isPending, setIsPending] = useState(false);
  // 1. Define the form.
  const form = useForm<supplierSchemaType>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: supplierSchemaType) {
    setIsPending(true);
    const response = await createSupplier(values);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Proveedora agregada");
    form.reset();
    setIsPending(false);
  }

  return (
    <>
      <div className="flex justify-between">
        <Breadcrumbs />
      </div>
      <FormContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="3492000000" {...field} />
                  </FormControl>
                  {/* <FormDescription>Formato: 3492000000</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
      </FormContainer>
    </>
  );
}
