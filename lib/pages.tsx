import {
  Book,
  ClipboardList,
  Home,
  Pencil,
  RefreshCcw,
  Search,
  Shirt,
  User2,
  WalletCards,
} from "lucide-react";

export function getPages() {
  return [
    {
      name: "Inicio",
      icon: <Home />,
      link: "/inicio",
    },
    {
      name: "Saldos",
      icon: <WalletCards />,
      link: "/test2",
    },
    {
      name: "Proveedoras",
      icon: <User2 />,
      link: "/clientes",
    },
    {
      name: "Productos",
      icon: <Shirt />,
      link: "/productos",
    },
    {
      name: "Categorías",
      icon: <Book />,
      link: "/categorias",
    },
    {
      name: "Ventas",
      icon: <ClipboardList />,
      link: "/ventas",
    },
    {
      name: "Devoluciones",
      icon: <RefreshCcw />,
      link: "/devoluciones",
    },
  ];
}
