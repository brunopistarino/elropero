"use client";
import { useForm } from "react-hook-form";
import {
  categorySchemaType,
  supplierSchema,
  supplierSchemaType,
} from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Supplier } from "@/lib/schema";
import { toast } from "sonner";
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
import FormContainer from "@/components/form-container";
import { updateSupplier } from "@/lib/actions";

export default function ModifyForm({ supplier }: { supplier: Supplier }) {
  const [isPending, setIsPending] = useState(false);

  // 1. Define the form.
  const form = useForm<supplierSchemaType>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: supplier.name,
      phone: supplier.phone ?? undefined,
      dni: supplier.dni ?? undefined,
      address: supplier.address ?? undefined,
      email: supplier.email ?? undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: categorySchemaType) {
    setIsPending(true);
    const response = await updateSupplier(supplier.id, values);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Proveedora modificada");
    setIsPending(false);
  }

  return (
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
  );
}
