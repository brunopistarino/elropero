import { Button } from "@/components/ui/button";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";
import { NewCustomer } from "./new-customer";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Mariana Pérez",
      amount: 100,
      status: "2",
      email: "m@example.com",
    },
    {
      id: "628bd41a",
      name: "Juan García",
      amount: 75,
      status: "5",
      email: "juan@example.com",
    },
    {
      id: "932ac72c",
      name: "Luisa Rodríguez",
      amount: 150,
      status: "1",
      email: "luisa@example.com",
    },
    {
      id: "831de39b",
      name: "Carlos López",
      amount: 120,
      status: "3",
      email: "carlos@example.com",
    },
    {
      id: "523bf48d",
      name: "Elena Fernández",
      amount: 90,
      status: "7",
      email: "elena@example.com",
    },
    {
      id: "439ce57a",
      name: "Pedro Ramirez",
      amount: 200,
      status: "10",
      email: "pedro@example.com",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold text-3xl">Clientes</p>
        <NewCustomer />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
