"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Breadcrumbs() {
  const pathname = usePathname();
  const path = pathname.replace(/[0-9]/g, "").replace(/\//g, "");
  const actualRoute = routes[path as keyof typeof routes];
  console.log(path);

  return (
    <div>
      <p className="font-semibold text-3xl text-muted-foreground">
        {actualRoute.map((route, x) => (
          <span key={x}>
            {/* {actualRoute.length - 1 !== x ? (
              <Link href={route.link} className="hover:underline">
                {route.name}
              </Link>
            ) : (
              <span className="text-foreground">{route.name}</span>
            )} */}
            <Link
              href={route.link}
              tabIndex={-1}
              className={cn(
                x === actualRoute.length - 1
                  ? "text-foreground hover:cursor-default"
                  : "hover:underline"
              )}
            >
              {route.name}
            </Link>
            {x !== actualRoute.length - 1 && " / "}
          </span>
        ))}
      </p>
    </div>
  );
}

const routes = {
  categorias: [
    {
      name: "Categorías",
      link: "/categorias",
    },
  ],
  categoriascrear: [
    {
      name: "Categorías",
      link: "/categorias",
    },
    {
      name: "Agregar categoría",
      link: "/categorias/crear",
    },
  ],
  categoriasmodificar: [
    {
      name: "Categorías",
      link: "/categorias",
    },
    {
      name: "Modificar categoría",
      link: "",
    },
  ],
  productos: [
    {
      name: "Productos",
      link: "/productos",
    },
  ],
  productoscrear: [
    {
      name: "Productos",
      link: "/productos",
    },
    {
      name: "Agregar producto",
      link: "/productos/crear",
    },
  ],
  productosmodificar: [
    {
      name: "Productos",
      link: "/productos",
    },
    {
      name: "Modificar producto",
      link: "",
    },
  ],
  proveedoras: [
    {
      name: "Proveedoras",
      link: "/proveedoras",
    },
  ],
  proveedorascrear: [
    {
      name: "Proveedoras",
      link: "/proveedoras",
    },
    {
      name: "Agregar proveedora",
      link: "/proveedoras/crear",
    },
  ],
  proveedorasmodificar: [
    {
      name: "Proveedoras",
      link: "/proveedoras",
    },
    {
      name: "Modificar proveedora",
      link: "",
    },
  ],
  saldos: [
    {
      name: "Pagos pendientes",
      link: "/saldos",
    },
  ],
  saldosmensaje: [
    {
      name: "Pagos pendientes",
      link: "/saldos",
    },
    {
      name: "Modificar mensaje",
      link: "/saldos/mensaje",
    },
  ],
  pagos: [
    {
      name: "Pagos",
      link: "/pagos",
    },
  ],
};
