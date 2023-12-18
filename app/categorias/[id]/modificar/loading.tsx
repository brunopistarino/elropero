import Breadcrumbs from "@/components/breadcrumbs";

export default function Loading() {
  return (
    <>
      <Breadcrumbs />
      <div className="max-w-lg w-full h-[194px] bg-muted-foreground/20 animate-pulse rounded-md mx-auto" />
    </>
  );
}
