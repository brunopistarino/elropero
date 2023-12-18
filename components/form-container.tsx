export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md md:border md:bg-background mx-auto max-w-lg md:p-6 md:pt-4 w-full">
      {children}
    </div>
  );
}
