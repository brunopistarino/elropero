import {
  Book,
  ClipboardList,
  DollarSign,
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
      name: "Productos",
      icon: <Shirt />,
      link: "/productos",
    },
    {
      name: "Saldos",
      icon: <WalletCards />,
      link: "/saldos",
    },
    {
      name: "Pagos",
      icon: <DollarSign />,
      link: "/pagos",
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
    {
      name: "Proveedoras",
      icon: <User2 />,
      link: "/proveedoras",
    },
    {
      name: "Categorías",
      icon: <Book />,
      link: "/categorias",
    },
  ];
}
