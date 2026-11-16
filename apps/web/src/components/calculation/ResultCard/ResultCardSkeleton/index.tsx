import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const ResultCardSkeleton = () => {
  return (
    <Card className="flex-1 gap-3 py-5">
      <CardHeader className="flex gap-3 items-center">
        <Skeleton className="flex size-10 shrink-0 rounded-xl " />
        <Skeleton className="h-7 w-40" />
      </CardHeader>
      <CardContent className="px-5">
        <Skeleton className="h-8 w-50" />
      </CardContent>
    </Card>
  );
};
