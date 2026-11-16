import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { VariantContent } from "@/components/variant/VariantContent";

export const VariantsPage = () => {
  return (
    <main className="flex gap-8 p-8">
      <Sidebar />
      <div className="min-w-0 flex-1 flex flex-col gap-8">
        <Header />
        <VariantContent />
      </div>
    </main>
  );
};
