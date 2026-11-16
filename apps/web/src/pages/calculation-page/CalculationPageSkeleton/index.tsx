import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { CalculationLoading } from "@/components/calculation/CalculationLoading";

export const CalculationPageSkeleton = () => {
  return (
    <main className="flex gap-8 p-8">
      <aside className="w-24 shrink-0">
        <nav className="sticky top-8 rounded-3xl bg-white px-2 py-5">
          <ul className="flex flex-col gap-6">
            <li>
              <Skeleton className="w-20 h-18 px-2 py-3 rounded-2xl" />
            </li>
            <li>
              <Skeleton className="w-20 h-18 px-2 py-3 rounded-2xl" />
            </li>
          </ul>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 flex flex-col gap-8">
        <header>
          <Card className="flex flex-row gap-10 items-center justify-between px-4">
            <CardTitle className="flex flex-col gap-2">
              <Skeleton className="h-7 w-62.5" />
              <Skeleton className="h-5 w-37.5" />
            </CardTitle>
            <CardContent className="flex items-center gap-4 px-0">
              <Skeleton className="h-9 w-37.5" />
              <Skeleton className="h-9 w-37.5" />
            </CardContent>
          </Card>
        </header>
        <CalculationLoading />
      </div>
    </main>
  );
};
