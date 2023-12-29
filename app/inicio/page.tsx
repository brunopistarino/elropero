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
  return (
    <>
      {/* un texto que diga buenos dias, buenas tarde o buenas noces dependiendo de la hora */}
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">
          {new Date().getHours() < 12
            ? "Buenos días"
            : new Date().getHours() < 18
            ? "Buenas tardes"
            : "Buenas noches"}
        </h1>
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
      </div>
      <div className="bg-background p-6 pl-0 rounded-md border flex flex-col gap-8">
        <div className="flex items-center pl-6 justify-between">
          <p className="font-semibold text-lg">Ventas</p>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="12months">12 meses</TabsTrigger>
              <TabsTrigger value="3months">3 meses</TabsTrigger>
              <TabsTrigger value="30days">30 días</TabsTrigger>
              <TabsTrigger value="7days">7 días</TabsTrigger>
              <TabsTrigger value="24days">24 horas</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="password">Change your password here.</TabsContent> */}
          </Tabs>
        </div>
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
      {/* <Chart /> */}
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
