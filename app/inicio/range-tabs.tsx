"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RangeTabs({ searchName }: { searchName: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(searchName, value);
    } else {
      params.delete(searchName);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      defaultValue={searchParams.get(searchName)?.toString() || "day"}
      onValueChange={(value) => {
        handleSearch(value);
      }}
    >
      <TabsList>
        <TabsTrigger value="year">12 meses</TabsTrigger>
        {/* <TabsTrigger value="3months">3 meses</TabsTrigger> */}
        <TabsTrigger value="month">30 días</TabsTrigger>
        {/* <TabsTrigger value="7days">7 días</TabsTrigger> */}
        <TabsTrigger value="day">24 horas</TabsTrigger>
      </TabsList>
      {/* <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
  );
}
