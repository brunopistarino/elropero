"use client";

import FormContainer from "@/components/form-container";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { productSchema, productSchemaType } from "@/lib/zod-schemas";
import { createProduct, updateProduct } from "@/lib/actions";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/lib/schema";

interface SelectData {
  id: number;
  name: string;
}

export default function ModifyForm({
  categories,
  suppliers,
  product,
}: {
  categories: SelectData[];
  suppliers: SelectData[];
  product: Product;
}) {
  const [isPending, setIsPending] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [profit, setProfit] = useState<number>(
    product.businessProfitPercentage
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: product.categoryId,
      name: product.name,
      size: product.size ?? "",
      supplierId: product.supplierId,
      price: product.price / 100,
      businessProfitPercentage: product.businessProfitPercentage,
      businessProfit: 0,
      supplierProfit: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: productSchemaType) {
    const price = values.price;
    values.price = Math.round(price * 100);
    values.businessProfitPercentage = profit;
    values.businessProfit = Math.round((price / 100) * profit * 100);
    values.supplierProfit = Math.round((price - (price / 100) * profit) * 100);
    console.log(values);

    setIsPending(true);
    const response = await updateProduct(product.id, values);
    if (response?.error) {
      toast.error(response.error);
      setIsPending(false);
      return;
    }
    toast.success("Producto modificado");
    // form.reset();
    setIsPending(false);
  }

  return (
    <FormContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Select category */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Categoría</FormLabel>
                <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={categoryOpen}
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.id === field.value
                          )?.name
                        : "Seleccione una categoría..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="md:w-[462px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar categoria..." />
                      <ScrollArea className="h-80">
                        <CommandEmpty>Categoria no encontrada.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.name}
                              onSelect={() => {
                                form.setValue("categoryId", category.id);
                                setCategoryOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
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
              <FormItem className="flex flex-col">
                <FormLabel>Proveedora</FormLabel>
                <Popover open={supplierOpen} onOpenChange={setSupplierOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={supplierOpen}
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? suppliers.find(
                            (supplier) => supplier.id === field.value
                          )?.name
                        : "Seleccione una proveedora..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="md:w-[462px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar proveedora..." />
                      <ScrollArea className="h-80">
                        <CommandEmpty>Proveedora no encontrada.</CommandEmpty>
                        <CommandGroup>
                          {suppliers.map((supplier) => (
                            <CommandItem
                              key={supplier.id}
                              value={supplier.name}
                              onSelect={() => {
                                form.setValue("supplierId", supplier.id);
                                setSupplierOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  supplier.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {supplier.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                    value={`Ropero: ${
                      field.value
                        ? new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format((field.value / 100) * profit)
                        : "$ 0,00"
                    }`}
                    className="font-semibold disabled:opacity-70"
                  />
                  <Input
                    disabled
                    value={`Proveedora: ${new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(field.value - (field.value / 100) * profit)}`}
                    className="font-semibold disabled:opacity-70"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Ganancia</FormLabel>
            <div className="flex gap-4">
              <Input
                value={profit}
                className="w-20"
                type="number"
                onChange={(e) => setProfit(e.currentTarget.valueAsNumber)}
                min={0}
                max={100}
              />
              <Slider
                value={[profit]}
                defaultValue={[profit]}
                max={100}
                step={1}
                onValueChange={(value) => setProfit(value[0] as number)}
              />
            </div>
          </FormItem>
          <div className="flex gap-2 justify-end pt-2">
            <Link
              href="/productos"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancelar
            </Link>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Modificar
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
