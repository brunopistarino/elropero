import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Options from "./options";
import { Suspense } from "react";

export default function Page() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Categoría" />
      </SelectTrigger>
      <Suspense
        fallback={
          <>
            <SelectContent>
              <SelectItem value="1">Cargando</SelectItem>
            </SelectContent>
            <p>loading</p>
          </>
        }
      >
        <Options />
      </Suspense>
    </Select>
  );
}
