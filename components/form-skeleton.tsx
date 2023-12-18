export default function FormSkeleton({ height }: { height: number }) {
  return (
    <div
      className="max-w-lg w-full bg-muted-foreground/20 animate-pulse rounded-md mx-auto"
      style={{ height: height }}
    />
  );
}
