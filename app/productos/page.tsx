import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { NewProduct } from "./new-product";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "2",
      status: "returned",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "3",
      status: "sold",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "4",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "5",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
    {
      id: "6",
      status: "available",
      date: new Date(),
      category: "Remera",
      description: "Remera de algodón",
      size: "S",
      proveedora: "Maria",
      prize: 100,
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Productos</h1>
        <NewProduct />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
