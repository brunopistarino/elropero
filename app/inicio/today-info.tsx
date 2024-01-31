import { db } from "@/lib/drizzle";
import { Products } from "@/lib/schema";
import { and, gte, lt, sql } from "drizzle-orm";

export default async function TodayInfo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set to the start of today

  const data = await db
    .select({
      totalSoldToday: sql<Number>`COALESCE(SUM(${Products.price}), 0)`,
      countSoldToday: sql<Number>`COALESCE(COUNT(${Products.id}), 0)`,
    })
    .from(Products)
    .where(gte(Products.soldAt, today));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-4 whitespace-nowrap">
      <div className="bg-background p-6 rounded-md border flex flex-col gap-2 h-full justify-between">
        <p className="whitespadce-nowrap text-muted-foreground">
          Ventas de hoy
        </p>
        <p className="font-semibold text-3xl whitespadce-nowrap">
          {String(data[0].countSoldToday)}
        </p>
      </div>
      <div className="bg-background p-6 rounded-md border flex flex-col gap-2 h-full justify-between sm:col-span-2">
        <p className="whitespace-nowdrap text-muted-foreground">
          Ganancias de hoy
        </p>
        {/* <p className="font-semibold text-3xl">{data[0].totalSoldToday}</p> */}
        <p className="font-semibold text-3xl">
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(Number(data[0].totalSoldToday) / 100)}
        </p>
      </div>
    </div>
  );
}
