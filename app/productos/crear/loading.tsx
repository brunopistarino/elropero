import Breadcrumbs from "@/components/breadcrumbs";
import FormSkeleton from "@/components/form-skeleton";

export default function Loading() {
  return (
    <>
      <Breadcrumbs />
      <FormSkeleton height={578} />
    </>
  );
}
