"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data2 = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 500) + 100,
  },
];

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

export default function Chart({ data }: { data: any[] }) {
  return (
    <>
      {/* <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data2}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            // tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={{ fill: "var(--theme-primary)", opacity: 0.25 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                      </span>
                      <span className="font-bold">{payload[0].value}</span>
                      <span className="font-bold">
                        {new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        }).format(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          <Bar dataKey="total" fill="#16A34A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height={350} className="pl-2">
        <BarChart data={data}>
          <XAxis
            dataKey="key_name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            // tickFormatter={(value) => months[value - 1].slice(0, 3)}
          />
          {/* <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            // tickFormatter={(value) => `$${value}`}
          /> */}
          <YAxis
            // yAxisId="left"
            orientation="left"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            tickFormatter={(value) => `$${value}`}
          />
          {/* <YAxis
            yAxisId="right"
            orientation="right"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            stroke="#8884d8"
          /> */}
          {/* <Tooltip /> */}
          <Tooltip
            cursor={{ fill: "var(--theme-primary)", opacity: 0.25 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                      </span>
                      <span className="font-bold">
                        {payload[1].value} ventas
                      </span>
                      <span className="font-bold">
                        {new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        }).format(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          {/* <Bar dataKey="total" fill="#16A34A" radius={[4, 4, 0, 0]} /> */}
          {/* <Bar dataKey="total_sold" fill="#16A34A" radius={[4, 4, 0, 0]} /> */}
          {/* <Bar dataKey="total_revenue" fill="#16A34A" radius={[4, 4, 0, 0]} /> */}
          <Bar
            // yAxisId="left"
            stackId="a"
            dataKey="total_revenue"
            fill="hsl(142.1 76.2% 36.3%)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            // yAxisId="right"
            stackId="a"
            dataKey="total_sold"
            fill="#ffffff00"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
