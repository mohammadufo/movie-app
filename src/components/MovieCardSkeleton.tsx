import { Skeleton } from '@/components/ui/skeleton'

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
