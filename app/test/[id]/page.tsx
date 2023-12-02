import { updateCategory } from "@/lib/actions";
import { db } from "@/lib/drizzle";
import { Categories } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: number } }) {
  const categories = await db
    .select()
    .from(Categories)
    .where(eq(Categories.id, params.id));

  if (categories.length === 0) return notFound();

  const updateCategoryWithId = updateCategory.bind(null, categories[0].id);

  return (
    <div>
      <form action={updateCategoryWithId}>
        <input
          type="text"
          name="name"
          className="bg-gray-600"
          defaultValue={categories[0].name}
        />
        <input type="hidden" name="id" defaultValue={categories[0].id} />
        <button>submit</button>
      </form>
    </div>
  );
}
