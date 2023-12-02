"use client";

import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import prisma from "@/lib/prisma";
// import { handleDelete } from "./actions";

// import { labels } from "../data/data";
// import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  const id = parseInt(row.getValue("id"));

  // async function handleDelete() {
  //   "use server";
  //   // const { id } = row.original;
  //   await prisma.category.update({
  //     data: { name: "test" },
  //     where: { id: parseInt(row.id) },
  //   });
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted ml-auto"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <PencilLine size={16} className="text-muted-foreground mr-2" />
          Editar
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        {/* <DropdownMenuItem onSelect={() => handleDelete(id)}> */}
        <DropdownMenuItem>
          {/* <DropdownMenuItem onSelect={() => console.log(row.id)}> */}
          <Trash2 size={16} className="text-muted-foreground mr-2" />
          Eliminar {id}
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
