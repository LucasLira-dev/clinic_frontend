"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  Newspaper,
  ShieldCheck,
  Stethoscope,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Sidebar,
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "./sidebar"
import { authClient } from "@/lib/auth-client"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agendar", label: "Agendar Consulta", icon: CalendarPlus },
  { href: "/consultas", label: "Minhas Consultas", icon: CalendarCheck },
  { href: "/medicos", label: "Medicos", icon: Stethoscope },
  { href: "/blog", label: "Blog dos Medicos", icon: Newspaper },
  { href: "/medico-painel", label: "Painel do Medico", icon: Stethoscope },
  { href: "/admin", label: "Administracao", icon: ShieldCheck },
]

export function AppSidebar() {
  const pathname = usePathname()

  const { data: session } = authClient.useSession()
  const isAdmin = session?.user.role === 'admin'


  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex gap-3 items-center">
            <div className="bg-chart-2 p-2 rounded-lg">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground font-bold text-lg"> ClinicFlow </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              if (item.href === "/admin" && !isAdmin) {
                return null
              }
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start cursor-pointer" onClick={() => authClient.signOut()}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}