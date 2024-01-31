// "use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Book, Package2, Shirt, User2 } from "lucide-react";

import Link from "next/link";
import MoneyChart from "./money-chart";
import React from "react";
import TodayInfo from "./today-info";
import SalesChartContainer from "./sales-chart-container";
import RangeTabs from "./range-tabs";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    salesRange?: string;
  };
}) {
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
        <div className="flex gap-4 flex-col lg:flex-row">
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
      <div className="flex gap-4 lg:flex-row flex-col">
        <div className="bg-background p-6 pl-0 rounded-md border flex flex-col gap-8 w-full">
          <div className="flex items-center pl-6 justify-between">
            <p className="font-semibold text-lg">Ventas</p>
            <RangeTabs searchName="salesRange" />
          </div>
          <SalesChartContainer range={searchParams?.salesRange} />
          {/* <Chart data={result.rows} /> */}

          {/* <img src="/chart.svg" alt="" /> */}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-4 whitespace-nowrap">
          <div className="bg-background p-6 rounded-md border flex flex-col gap-2 h-full justify-between">
            <p className="whitespadce-nowrap text-muted-foreground">
              Ventas de hoy
            </p>
            <p className="font-semibold text-3xl whitespadce-nowrap">4</p>
          </div>
          <div className="bg-background p-6 rounded-md border flex flex-col gap-2 h-full justify-between sm:col-span-2">
            <p className="whitespace-nowdrap text-muted-foreground">
              Ganancias de hoy
            </p>
            <p className="font-semibold text-3xl">$ 45.950,00</p>
          </div>
        </div> */}
        <TodayInfo />
      </div>
      {/* <div className="bg-background p-6 pl-0 rounded-md border flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="font-semibold text-lg pl-6">Ingresos / Egresos</p>
          <Tabs defaultValue="24days">
            <TabsList>
              <TabsTrigger value="12months">12 meses</TabsTrigger>
              <TabsTrigger value="30days">30 días</TabsTrigger>
              <TabsTrigger value="24days">24 horas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <MoneyChart />
      </div> */}
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
      className="bg-background p-5 border flex gap-3 rounded-lg w-full group items-start"
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
