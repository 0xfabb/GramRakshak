import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 pt-20">{children}</main>
      </div>
    </SidebarProvider>
  );
}
