import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="border p-4 w-full flex flex-col gap-2">
      <Skeleton className="aspect-[21/20] max-h-[768px] w-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-[28px] w-[150px] rounded-xl" />
        <Skeleton className="h-[24px] w-[70px] rounded-xl" />
      </div>
    </div>
  );
}
