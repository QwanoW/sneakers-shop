import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonSliderCard() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Skeleton className="aspect-square max-h-[768px] w-full rounded-none" />
      <Skeleton className="h-[28px] w-full max-w-[275px] rounded-xl" />
      <Skeleton className="h-[24px] w-[70px] rounded-xl" />
    </div>
  );
}
