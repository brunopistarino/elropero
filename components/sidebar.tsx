"use client";

import { useState } from "react";
import Link from "next/link";

// import LogoIcon from "@icons/logom.svg";

import { getPages } from "@/lib/pages";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Menu, X, Settings, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeButton } from "@/components/theme-button";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [open, setOpen] = useState<String>("");
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[1];

  const navItems = getPages();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = (name: String) => {
    if (open === name) {
      setOpen("");
    } else {
      setOpen(name);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      if (!isOpen && window.innerWidth > 768) {
        setIsOpen(false);
      }
    });
  }

  return (
    <>
      <nav
        className={`flex md:hidden sticky items-center justify-between h-[71px] top-0 right-0 left-0 px-6 bg-white dark:bg-black z-50 ${
          !isOpen && "border-b"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* <LogoIcon className="h-9 w-7" /> */}
          <p className="text-2xl">
            <span>EL</span>
            <span className="font-bold">ROPERO</span>
          </p>
        </div>
        <Button onClick={handleIsOpen} variant={"ghost"} size={"icon"}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </nav>
      <nav
        className={`${
          isOpen ? "flex fixed top-[71px] bottom-0 w-full" : "hidden"
        } w-60 xl:w-72 z-50 shrink-0 flex-col justify-between md:flex overflow-y-auto border-r dark:border-[#242424] bg-white dark:bg-black`}
      >
        <div className="flex flex-col gap-6 pt-2 md:pt-8">
          <Link
            href="/"
            className="hidden md:flex items-center gap-4 pr-5 pl-6"
          >
            {/* <LogoIcon className="h-12 w-9" /> */}
            {/* <p className="text-2xl font-bold">Dashboard</p> */}
            <img src="/logo.png" className="h-10" alt="" />
            <p className="text-2xl">
              <span>EL</span>
              <span className="font-bold">ROPERO</span>
            </p>
          </Link>
          <div className="px-6">
            <Input placeholder="Buscar" />
          </div>
          <div className="flex flex-col gap-1 px-4">
            {navItems.map((item, x) => (
              <Link
                key={x}
                href={item.link}
                onClick={handleClose}
                // className="flex gap-3 pt-2 pr-3 pb-2 pl-3 hover:bg-muted/50 rounded-md"
                className={cn(
                  buttonVariants({
                    variant: path !== item.link ? "ghost" : "default",
                    size: "default",
                  }),
                  "justify-start gap-2 px-2"
                  // link.variant === "default" &&
                  //   "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                {item.icon}
                <p className="font-semibold">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-4 mb-8 mx-auto">
          {/* <Button className="gap-2 w-full justify-start" variant={"ghost"}>
            <Settings />
            Configuración
          </Button> */}
          <ThemeButton />
        </div>
        {/* <div className="px-2 py-6">
          <UserDialog>
            <div className="flex gap-3 items-center hover:bg-gray-200 rounded-md p-2 cursor-pointer">
              <div className="bg-gray-200 w-10 h-10 rounded-full flex place-content-center items-center">
                <User2 />
              </div>
              <div className="flex flex-col">
                <p>Bruno Pistarino</p>
                <p className="text-sm">brunopistarino@gmail.com</p>
              </div>
            </div>
          </UserDialog>
        </div> */}
      </nav>
    </>
  );
}

// const UserDialog = ({ children }: { children: React.ReactNode }) => (
//   <Dialog>
//     <DialogTrigger asChild>{children}</DialogTrigger>
//     <DialogContent className="sm:max-w-[425px]">
//       <DialogHeader>
//         <DialogTitle>Bruno Pistarino</DialogTitle>
//         <DialogDescription>brunopistarino@gmail.com</DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4">
//         <p>Carrera: ING. EN INFORMÁTICA - Plan 2022</p>
//         <p>Departamento Académico Rafaela</p>
//       </div>
//       <DialogFooter>
//         <Button className="w-full">Cambiar de Carrera</Button>
//         <Link href="/" className="w-full">
//           <Button className="w-full" variant="destructive">
//             Cerrar Sesión
//           </Button>
//         </Link>
//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
// );
