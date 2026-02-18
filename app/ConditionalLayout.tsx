"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/appSidebar";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Verifica se está em uma rota de autenticação
  const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  // Se for rota de auth, renderiza sem sidebar
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Se não, renderiza com sidebar
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
