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
            <Link
              href={route.link}
              className={cn(
                x === actualRoute.length - 1
                  ? "text-foreground"
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
      name: "Crear categoría",
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
      // Está mal
      link: "/categorias/editar",
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
      name: "Crear producto",
      link: "/productos/crear",
    },
  ],
  productosmodificar: [
    {
      name: "Productos",
      link: "/productos",
    },
    {
      name: "Editar producto",
      link: "/productos/editar",
    },
  ],
};
