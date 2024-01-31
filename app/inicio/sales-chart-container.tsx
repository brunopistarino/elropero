// TODO: ARREGLAR
// @ts-ignore

import React from "react";
import { SQLWrapper, isNotNull, sql } from "drizzle-orm";
import { Products } from "@/lib/schema";
import { db } from "@/lib/drizzle";
import SalesChart from "./sales-chart";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export type SalesChart = {
  key_name: string;
  total_sold: number;
  total_revenue: number;
};

export default async function SalesChartContainer({
  range = "day",
}: {
  range?: string;
}) {
  console.log(range);
  let data: SalesChart[];
  //   const salesRange = searchParams.salesRange;
  //   console.log(salesRange);
  //   const data = await db
  //     .select({
  //       month: sql`to_char(${Products.soldAt}, 'Mon')`,
  //       total: sql<number>`cast(sum(${Products.price}) as int)`,
  //     })
  //     .from(Products)
  //     .where(isNotNull(Products.soldAt))
  //     .groupBy(sql`to_char(${Products.soldAt}, 'Mon')`)
  //     .orderBy(sql`to_char(${Products.soldAt}, 'MM')`);

  if (range === "day") {
    const query = sql`
    WITH HourSequence AS (
      SELECT
        generate_series(
          current_timestamp - interval '23 hours',
          current_timestamp,
          interval '1 hour'
        ) AS hour
    )
    
    SELECT
      EXTRACT(HOUR FROM hs.hour) AS key_name,
      COALESCE(COUNT(ep."soldAt"), 0) AS total_sold,
      COALESCE(SUM(ep.price), 0) AS total_revenue
    FROM
      HourSequence hs
    LEFT JOIN
      "elropero_Products" ep
    ON
      ep."soldAt" >= hs.hour AND ep."soldAt" < hs.hour + interval '1 hour'
    GROUP BY
      key_name, hs.hour
    ORDER BY
      hs.hour;
    `;
    // @ts-ignore
    data = (await db.execute(query)).rows;
    // @ts-ignore
    data = data.map((item) => ({
      ...item,
      total_revenue: Math.floor(item.total_revenue / 100),
      // @ts-ignore
      key_name: (item.key_name - 2 + 24) % 24,
    }));
  } else if (range === "month") {
    const query = sql`
    WITH DaySequence AS (
        SELECT
          generate_series(
            current_date - interval '29 days',
            current_date,
            interval '1 day'
          )::date AS day
      )
      
      SELECT
        EXTRACT(DAY FROM ds.day) AS key_name,
        COALESCE(COUNT(ep."soldAt"), 0) AS total_sold,
        COALESCE(SUM(ep.price), 0) AS total_revenue
      FROM
        DaySequence ds
      LEFT JOIN
        "elropero_Products" ep
      ON
        ep."soldAt"::date = ds.day
      GROUP BY
      key_name, ds.day
      ORDER BY
        ds.day;
      `;
    // @ts-ignore
    data = (await db.execute(query)).rows;
    data = data.map((item) => ({
      ...item,
      total_revenue: Math.floor(item.total_revenue / 100),
    }));
    console.log(data);
  } else if (range === "year") {
    //     const query2 = sql`
    //   WITH MonthSequence AS (
    //     SELECT generate_series(
    //       current_date - interval '11 months',
    //       current_date,
    //       interval '1 month'
    //     )::date AS month
    //   )

    //   SELECT
    //     EXTRACT(YEAR FROM ms.month) AS sale_year,
    //     EXTRACT(MONTH FROM ms.month) AS sale_month,
    //     COALESCE(COUNT(ep."soldAt"), 0) AS totalSold,
    //     COALESCE(SUM(ep.price), 0) AS totalRevenue
    //   FROM
    //     MonthSequence ms
    //   LEFT JOIN
    //     "elropero_Products" ep
    //   ON
    //     EXTRACT(YEAR FROM ep."soldAt") = EXTRACT(YEAR FROM ms.month)
    //     AND EXTRACT(MONTH FROM ep."soldAt") = EXTRACT(MONTH FROM ms.month)
    //   GROUP BY
    //     sale_year, sale_month
    //   ORDER BY
    //     sale_year, sale_month;
    // `;

    const query = sql`
    WITH MonthSequence AS (
        SELECT
          generate_series(
            current_date - interval '11 months',
            current_date,
            interval '1 month'
          )::date AS month
      )
      
      SELECT
        EXTRACT(MONTH FROM ms.month) AS key_name,
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
        key_name, ms.month
      ORDER BY
        ms.month;
      `;
    // @ts-ignore
    data = (await db.execute(query)).rows;

    data = data.map((item) => ({
      ...item,
      total_revenue: Math.floor(item.total_revenue / 100),
      key_name: months[new Date(item.key_name).getMonth()].slice(0, 3),
    }));
    console.log(data);
  }

  // @ts-ignore
  return <SalesChart data={data} />;
}

// const query = sql`
//   WITH MonthSequence AS (
//     SELECT generate_series(
//       current_date - interval '11 months',
//       current_date,
//       interval '1 month'
//     )::date AS month
//   )

//   SELECT
//     EXTRACT(YEAR FROM ms.month) AS sale_year,
//     EXTRACT(MONTH FROM ms.month) AS sale_month,
//     TO_CHAR(ms.month, 'Month') AS month_name,
//     COALESCE(COUNT(ep."soldAt"), 0) AS total_sold,
//     COALESCE(SUM(ep.price), 0) AS total_revenue
//   FROM
//     MonthSequence ms
//   LEFT JOIN
//     "elropero_Products" ep
//   ON
//     EXTRACT(YEAR FROM ep."soldAt") = EXTRACT(YEAR FROM ms.month)
//     AND EXTRACT(MONTH FROM ep."soldAt") = EXTRACT(MONTH FROM ms.month)
//   GROUP BY
//     sale_year, sale_month, month_name
//   ORDER BY
//     sale_year, sale_month;
// `;
