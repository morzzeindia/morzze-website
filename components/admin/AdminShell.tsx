"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";
import { MobileSidebar } from "@/components/admin/mobileSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGate =
    pathname === "/admin/gate" || pathname.startsWith("/admin/gate/");

  if (isGate) {
    return <>{children}</>;
  }

  const adminStyle = `
    .admin-dark {
      --background: oklch(0.08 0 0);
      --foreground: oklch(0.98 0 0);
      --card: oklch(0.12 0 0);
      --card-foreground: oklch(0.98 0 0);
      --popover: oklch(0.12 0 0);
      --popover-foreground: oklch(0.98 0 0);
      --primary: oklch(0.85 0.15 47);
      --primary-foreground: oklch(0.08 0 0);
      --secondary: oklch(0.2 0 0);
      --secondary-foreground: oklch(0.98 0 0);
      --muted: oklch(0.2 0 0);
      --muted-foreground: oklch(0.6 0 0);
      --accent: oklch(0.85 0.15 47);
      --accent-foreground: oklch(0.08 0 0);
      --destructive: oklch(0.577 0.245 27.325);
      --border: oklch(0.2 0 0);
      --input: oklch(0.15 0 0);
      --ring: oklch(0.85 0.15 47);
    }
    
    .admin-dark input {
      background-color: oklch(0.1 0 0);
      color: oklch(0.95 0 0);
      border-color: oklch(0.2 0 0);
    }
    
    .admin-dark input::placeholder {
      color: oklch(0.5 0 0);
    }
    
    .admin-dark textarea {
      background-color: oklch(0.1 0 0);
      color: oklch(0.95 0 0);
      border-color: oklch(0.2 0 0);
    }
    
    .admin-dark select {
      background-color: oklch(0.1 0 0);
      color: oklch(0.95 0 0);
      border-color: oklch(0.2 0 0);
    }
    
    .admin-dark label {
      color: oklch(0.95 0 0);
    }
    
    .admin-dark .bg-white {
      background-color: oklch(0.12 0 0) !important;
      color: oklch(0.95 0 0) !important;
    }
    
    .admin-dark [class*="bg-slate"] {
      background-color: oklch(0.12 0 0) !important;
      color: oklch(0.95 0 0) !important;
    }
    
    .admin-dark [class*="text-gray"] {
      color: oklch(0.95 0 0) !important;
    }
    
    .admin-dark [class*="text-slate"] {
      color: oklch(0.95 0 0) !important;
    }
    
    .admin-dark table {
      background-color: oklch(0.1 0 0);
    }
    
    .admin-dark th {
      background-color: oklch(0.12 0 0);
      color: oklch(0.95 0 0);
      border-color: oklch(0.2 0 0);
    }
    
    .admin-dark td {
      color: oklch(0.95 0 0);
      border-color: oklch(0.2 0 0);
    }
    
    .admin-dark tr:hover {
      background-color: oklch(0.15 0 0);
    }
  `;

  return (
    <div className="admin-dark">
      <style>{adminStyle}</style>
      <div className="flex h-full overflow-hidden bg-black">
        <div className="sticky top-0 hidden h-screen lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto bg-black">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-black p-3 lg:hidden">
            <MobileSidebar />
            <span className="text-lg font-semibold text-white">Admin</span>
          </div>

          <div className="bg-black">{children}</div>
        </div>
      </div>
    </div>
  );
}
