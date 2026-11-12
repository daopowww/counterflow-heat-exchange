import { Header } from "@/components/Header";
import { CalculationSection } from "@/components/CalculationSection";
import { Sidebar } from "@/components/Sidebar";

export const CalculationPage = () => {
  return (
    <main className="flex gap-8 p-8">
      <Sidebar />
      <div className="min-w-0 flex-1 flex flex-col gap-8">
        <Header />
        <CalculationSection />
      </div>
    </main>
  );
};
