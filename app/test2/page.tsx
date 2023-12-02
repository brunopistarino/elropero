import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignJustify, LayoutGrid, List } from "lucide-react";

import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Mariana Pérez",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "628bd41a",
      name: "Juan García",
      amount: 75,
      status: "pending",
      email: "juan@example.com",
    },
    {
      id: "932ac72c",
      name: "Luisa Rodríguez",
      amount: 150,
      status: "failed",
      email: "luisa@example.com",
    },
    {
      id: "831de39b",
      name: "Carlos López",
      amount: 120,
      status: "success",
      email: "carlos@example.com",
    },
    {
      id: "523bf48d",
      name: "Elena Fernández",
      amount: 90,
      status: "pending",
      email: "elena@example.com",
    },
    {
      id: "439ce57a",
      name: "Pedro Ramirez",
      amount: 200,
      status: "success",
      email: "pedro@example.com",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Pagos pendientes</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full p-6 rounded-md border gap-2 bg-background">
            <p>Clientes</p>
            <p className="text-4xl font-semibold">8</p>
          </div>
          <div className="flex flex-col w-full p-6 rounded-md border gap-2 bg-background">
            <p>Pagos</p>
            <p className="text-4xl font-semibold">17</p>
          </div>
          <div className="flex flex-col w-full p-6 rounded-md border gap-2 bg-background">
            <p>Monto total</p>
            <p className="text-4xl font-semibold">$1470.50</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Input placeholder="Buscar" />
          <Tabs defaultValue="account">
            <TabsList className="bg-background border">
              <TabsTrigger value="account">
                <LayoutGrid size={20} />
              </TabsTrigger>
              <TabsTrigger value="password">
                <AlignJustify size={20} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant={"outline"}>Filtros</Button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
