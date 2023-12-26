import Breadcrumbs from "@/components/breadcrumbs";
import FormContainer from "@/components/form-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Breadcrumbs />
      <FormContainer>
        <Textarea
          value="Hola [nombre], te hablo desde el ropero. Vendiste [cantidad] productos y tenes un saldo pendiente de [monto]. Podes pasar a cobrar los viernes por la mañana. Muchas gracias!"
          className="mt-2 mb-4 text-base min-h-[250px]"
        />
        <p>[nombre]: nombre de la proveedora</p>
        <p>[cantidad]: cantidad de productos vendidos</p>
        <p>[monto]: saldo a cobrar</p>
        <div className="flex gap-2 justify-end mt-4">
          <Link
            href="/saldos"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancelar
          </Link>
          <Button type="submit">Crear</Button>
        </div>
      </FormContainer>
    </>
  );
}
