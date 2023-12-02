import { Button } from "./ui/button";
import { getPages } from "@/lib/pages";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function TopSidebar() {
  const navItems = getPages();
  return (
    <nav className="absolute top-0 w-full z-[60] py-2 px-4 border-b bg-white dark:bg-black flex justify-between">
      <div>
        {navItems.map((item) => (
          <Link href={item.link ?? ""} key={item.name}>
            <Button
              className="gap-1 px-3 font-semibold"
              variant={"ghost"}
              //   onClick={() => item.name}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      <Button variant={"outline"} size={"icon"}>
        <Settings />
      </Button>
    </nav>
  );
}
