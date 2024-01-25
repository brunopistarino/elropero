// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import TodayInfo from "./today-info";
import { isNotNull, sql } from "drizzle-orm";
import { Products } from "@/lib/schema";
import { db } from "@/lib/drizzle";

export default async function Page() {
  const query = sql`
  WITH MonthSequence AS (
    SELECT generate_series(
      current_date - interval '11 months',
      current_date,
      interval '1 month'
    )::date AS month
  )
  
  SELECT
    EXTRACT(YEAR FROM ms.month) AS sale_year,
    EXTRACT(MONTH FROM ms.month) AS sale_month,
    TO_CHAR(ms.month, 'Month') AS month_name,
    COALESCE(COUNT(ep."soldAt"), 0) AS total_sold,
    COALESCE(SUM(ep.price), 0) AS total_revenue
  FROM
    MonthSequence ms
  LEFT JOIN
    "elropero_Products" ep
  ON
    EXTRACT(YEAR FROM ep."soldAt") = EXTRACT(YEAR FROM ms.month)
    AND EXTRACT(MONTH FROM ep."soldAt") = EXTRACT(MONTH FROM ms.month)
  GROUP BY
    sale_year, sale_month, month_name
  ORDER BY
    sale_year, sale_month;
`;

  const result = await db.execute(query);

  console.log(result.rows);
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
        <div className="bg-background p-6 px-0 rounded-md border flex flex-col gap-8 w-full">
          <div className="flex items-center px-6 justify-between">
            <p className="font-semibold text-lg">Ventas</p>
            <Tabs defaultValue="12months">
              <TabsList>
                <TabsTrigger value="12months">12 meses</TabsTrigger>
                {/* <TabsTrigger value="3months">3 meses</TabsTrigger> */}
                <TabsTrigger value="30days">30 días</TabsTrigger>
                {/* <TabsTrigger value="7days">7 días</TabsTrigger> */}
                <TabsTrigger value="24days">24 horas</TabsTrigger>
              </TabsList>
              {/* <TabsContent value="password">Change your password here.</TabsContent> */}
            </Tabs>
          </div>
          <Chart data={result.rows} />

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
      <div className="bg-background p-6 pl-0 rounded-md border flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="font-semibold text-lg pl-6">Ingresos / Egresos</p>
          <Tabs defaultValue="24days">
            <TabsList>
              <TabsTrigger value="12months">12 meses</TabsTrigger>
              {/* <TabsTrigger value="6months">6 meses</TabsTrigger> */}
              <TabsTrigger value="30days">30 días</TabsTrigger>
              {/* <TabsTrigger value="7days">7 días</TabsTrigger> */}
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
