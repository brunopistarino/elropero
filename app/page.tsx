import Image from "next/image";
// import { Categories, db } from "@/lib/schema";
import { Categories } from "@/lib/schema";
import { db } from "@/lib/drizzle";

export default async function Home() {
  const a = await db.select().from(Categories);
  const b = await db.query.Categories.findMany({
    with: {
      products: true,
    },
  });
  // console.log("====================================");
  // console.log(a);
  // console.log(b);
  return (
    <div className="justify-center flex items-center h-screen -mt-8 -mb-12">
      <p className="text-7xl text-gray-300">
        <span>EL</span>
        <span className="font-bold">ROPERO</span>
      </p>
    </div>
  );
}
