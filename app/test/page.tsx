import { createCategory } from "@/lib/actions";
import { db } from "@/lib/drizzle";
import { Categories } from "@/lib/schema";
import Link from "next/link";

export default async function Page() {
  const categories = await db.select().from(Categories);
  return (
    <div>
      <h1>Page</h1>
      <hr />
      {categories.map((category) => (
        <Link href={`/test/${category.id}`} key={category.id}>
          <h2>{category.name}</h2>
        </Link>
      ))}
      <hr />
      <form action={createCategory}>
        <input type="text" name="name" className="bg-gray-600" />
        <button>submit</button>
      </form>
    </div>
  );
}
