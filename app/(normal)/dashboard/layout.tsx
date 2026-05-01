import { AppSidebar } from "@/components/dashboard/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex gap-8">
            <div className="w-[280px] hidden lg:block shrink-0">
             <AppSidebar/>
            </div>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}