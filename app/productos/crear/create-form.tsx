"use client";

import FormContainer from "@/components/form-container";
import { Category, Supplier } from "@/lib/schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { productSchema } from "@/lib/zod-schemas";

export default function CreateForm({
  categories,
  suppliers,
}: {
  categories: Category[];
  suppliers: Supplier[];
}) {
  const [isPending, setIsPending] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: undefined,
      description: "",
      size: "",
      supplierId: undefined,
      price: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <FormContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. */}
          {/* Select cateory */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                {/* FALTA {...field} */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talle</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Select supplier */}
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedora</FormLabel>
                {/* FALTA {...field} */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una proveedora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem
                        value={supplier.id.toString()}
                        key={supplier.id}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} step={0.01} />
                </FormControl>
                <div className="flex gap-2">
                  <Input
                    disabled
                    value={`Ropero: $${new Intl.NumberFormat("es-AR").format(
                      field.value / 2
                    )}`}
                    className="font-semibold disabled:opacity-70"
                  />
                  <Input
                    disabled
                    value={`Proveedora: $${new Intl.NumberFormat(
                      "es-AR"
                    ).format(field.value / 2)}`}
                    className="font-semibold disabled:opacity-70"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end pt-2">
            <Link
              href="/productos"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancelar
            </Link>
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
