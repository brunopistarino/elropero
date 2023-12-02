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

import { Package2 } from "lucide-react";

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
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        <Chart />
        <MoneyChart />

        {/* <img src="/chart.svg" alt="" /> */}
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-background p-5 border flex gap-3 rounded-lg w-full"
        >
          <div className="border p-3 rounded-md">
            <Package2 />
          </div>
          <div>
            <p className="font-semibold">Agregar un cliente</p>
            <p className="text-muted-foreground">
              Add yourself or import from CSV
            </p>
          </div>
        </Link>
        <div className="bg-background p-5 border flex gap-3 rounded-lg w-full">
          <div className="border p-3 rounded-md">
            <Package2 />
          </div>
          <div>
            <p>Create your first member</p>
            <p>Add yourself or import from CSV</p>
          </div>
        </div>
        <div className="bg-background p-5 border flex gap-3 rounded-lg w-full">
          <div className="border p-3 rounded-md">
            <Package2 />
          </div>
          <div>
            <p>Create your first member</p>
            <p>Add yourself or import from CSV</p>
          </div>
        </div>
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
