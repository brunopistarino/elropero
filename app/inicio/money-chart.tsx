"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    average: 400,
    today: 240,
  },
  {
    name: "Feb",
    average: 300,
    today: 139,
  },
  {
    name: "Mar",
    average: 200,
    today: 980,
  },
  {
    name: "Apr",
    average: 278,
    today: 390,
  },
  {
    name: "May",
    average: 189,
    today: 480,
  },
  {
    name: "Jun",
    average: 239,
    today: 380,
  },
  {
    name: "Jul",
    average: 349,
    today: 430,
  },
];

export default function MoneyChart() {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
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
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Egresos
                        </span>
                        <span className="font-bold text-muted-foreground">
                          ${payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Ingresos
                        </span>
                        <span className="font-bold">${payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="average"
            activeDot={{
              r: 6,
              style: { fill: "var(--theme-primary)", opacity: 0.25 },
            }}
            // style={
            //   {
            //     stroke: "var(--theme-primary)",
            //     opacity: 0.25,
            //     "--theme-primary": `hsl(${
            //       theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
            //     })`,
            //   } as React.CSSProperties
            // }
            style={
              {
                stroke: "var(--theme-primary)",
                // opacity: 0.25,
                // "--theme-primary": `hsl(240 5.9% 10%)`,
                "--theme-primary": `hsl(346.8 77.2% 49.8%)`,
              } as React.CSSProperties
            }
          />
          <Line
            type="monotone"
            dataKey="today"
            strokeWidth={2}
            activeDot={{
              r: 8,
              style: { fill: "var(--theme-primary)" },
            }}
            // style={
            //   {
            //     stroke: "var(--theme-primary)",
            //     "--theme-primary": `hsl(${
            //       theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
            //     })`,
            //   } as React.CSSProperties
            // }
            style={
              {
                stroke: "var(--theme-primary)",
                "--theme-primary": `hsl(142.1 76.2% 36.3%)`,
              } as React.CSSProperties
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    // <ResponsiveContainer width="100%" height="100%">
    //   <LineChart
    //     width={500}
    //     height={300}
    //     data={data}
    //     margin={{
    //       top: 5,
    //       right: 30,
    //       left: 20,
    //       bottom: 5,
    //     }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="name" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Line
    //       type="monotone"
    //       dataKey="pv"
    //       stroke="#8884d8"
    //       activeDot={{ r: 8 }}
    //     />
    //     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    //   </LineChart>
    // </ResponsiveContainer>
  );
}
