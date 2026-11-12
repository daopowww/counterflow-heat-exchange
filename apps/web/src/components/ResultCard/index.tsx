import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResultCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

export const ResultCard = ({ title, value, icon }: ResultCardProps) => (
  <Card className="flex-1 gap-3 py-5">
    <CardHeader className="flex gap-3 items-center">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>
      <CardTitle className="text-xl font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="px-5">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
    </CardContent>
  </Card>
);
