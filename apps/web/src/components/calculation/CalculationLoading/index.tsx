import { ResultCardSkeleton } from "@/components/calculation/ResultCard/ResultCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

export const CalculationLoading = () => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex gap-3">
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
      </div>
      <div className="flex gap-8">
        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="w-80 h-7" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video" />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="w-80 h-7" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6" />
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex gap-4 flex-1" key={index}>
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
