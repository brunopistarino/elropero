"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  populateCategoriesDatabase,
  populateSuppliersDatabase,
  populateProductsDatabase,
} from "@/lib/actions";
// import { cookies } from "next/headers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  // const cookieStore = cookies();
  // return cookieStore.getAll().map((cookie) => (
  //   <>
  //     <div key={cookie.name}>
  //       <p>Name: {cookie.name}</p>
  //       <p>Value: {cookie.value}</p>
  //     </div>
  //     <form action={setCookie}>
  //       <button>Submit</button>
  //     </form>
  //   </>
  // ));
  const form = useForm();

  async function handlePopulateSuppliersDatabaseSubmit() {
    const response = await populateSuppliersDatabase();
    if (response?.error) {
      toast.error(response.error);
      console.log("Error");
      return;
    }
    console.log(response);
    toast.success("Devolución eliminada");
    console.log("Devolución eliminada");
  }

  async function handlePopulateCategoriesDatabaseSubmit() {
    const response = await populateCategoriesDatabase();
    if (response?.error) {
      toast.error(response.error);
      console.log("Error");
      return;
    }
    console.log(response);
    toast.success("Devolución eliminada");
    console.log("Devolución eliminada");
  }

  async function handlePopulateProductsDatabaseSubmit() {
    const response = await populateProductsDatabase();
    if (response?.error) {
      toast.error(response.error);
      console.log("Error");
      return;
    }
    console.log(response);
    toast.success("Devolución eliminada");
    console.log("Devolución eliminada");
  }

  return (
    <>
      {/* {cookieStore.getAll().map((cookie) => (
        <div key={cookie.name} className="bg-background p-4 rounded">
          <p>Name: {cookie.name}</p>
          <p>Value: {cookie.value}</p>
        </div>
      ))}
      <form action={setCookie}>
        <Input placeholder="Password" name="password" />
        <Button className="mt-4">Submit</Button>
      </form> */}
      <form onSubmit={form.handleSubmit(handlePopulateSuppliersDatabaseSubmit)}>
        <p>Cargar proveedoras</p>
        <Button className="mt-4">Submit</Button>
      </form>
      <form
        onSubmit={form.handleSubmit(handlePopulateCategoriesDatabaseSubmit)}
      >
        <p>Cargar categorias</p>
        <Button className="mt-4">Submit</Button>
      </form>
      <form onSubmit={form.handleSubmit(handlePopulateProductsDatabaseSubmit)}>
        <p>Cargar productos</p>
        <Button className="mt-4">Submit</Button>
      </form>
    </>
  );
}
