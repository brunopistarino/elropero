"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email(),
});

import { Book, Package2, Shirt, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import Chart from "./chart";
import MoneyChart from "./money-chart";
import React from "react";

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <div className="flex gap-4">
        <SmallCard
          icon={<Shirt />}
          title="Agregar producto"
          description="al listado de productos"
          href="/productos/crear"
        />
        <SmallCard
          icon={<User2 />}
          title="Agregar proveedora"
          description="al listado de preveedoras"
          href="/proveedoras/crear"
        />
        <SmallCard
          icon={<Book />}
          title="Agregar categoría"
          description="al listado de categorías"
          href="/categorias/crear"
        />
      </div>
      <div className="bg-background p-6 rounded-md border flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Ventas</p>
          <Button variant="outline">Ver reporte</Button>
        </div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="12months">12 meses</TabsTrigger>
            <TabsTrigger value="3months">3 meses</TabsTrigger>
            <TabsTrigger value="30days">30 días</TabsTrigger>
            <TabsTrigger value="7days">7 días</TabsTrigger>
            <TabsTrigger value="24days">24 horas</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="account">
            Make changes to your account here.
          </TabsContent> */}
          {/* <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
        <Chart />

        {/* <img src="/chart.svg" alt="" /> */}
      </div>
      <div className="bg-background p-6 pl-0 rounded-md border flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="font-semibold text-lg pl-6">Ingresos / Egresos</p>
          <Tabs defaultValue="24days">
            <TabsList>
              <TabsTrigger value="12months">12 meses</TabsTrigger>
              <TabsTrigger value="6months">6 meses</TabsTrigger>
              <TabsTrigger value="30days">30 días</TabsTrigger>
              <TabsTrigger value="7days">7 días</TabsTrigger>
              <TabsTrigger value="24days">24 horas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <MoneyChart />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Chart />
    </>
  );
}

function SmallCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      className="bg-background p-5 border flex gap-3 rounded-lg w-full group"
      href={href}
    >
      <div className="border p-3 rounded-md group-hover:bg-border">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
