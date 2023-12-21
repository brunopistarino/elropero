import { SelectContent, SelectItem } from "@/components/ui/select";

import { db } from "@/lib/drizzle";
import { Categories } from "@/lib/schema";

export default async function Options() {
  const cateories = await db.select().from(Categories).orderBy(Categories.name);

  //   wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <SelectContent>
      {cateories.map((category) => (
        <SelectItem key={category.id} value={category.id.toString()}>
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  );
}
