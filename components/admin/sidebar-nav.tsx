"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Package, Users, BarChart3, Settings, Factory, AlertTriangle } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pedidos", label: "Pedidos", icon: FileText },
  { href: "/admin/pedidos/customizados", label: "Pedidos Custom", icon: Factory },
  { href: "/admin/stock", label: "Inventario", icon: Package },
  { href: "/admin/stock/alertas", label: "Alertas de Stock", icon: AlertTriangle },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-primary">Masoil Lubricantes</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Panel Administrativo</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold text-sm">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin Masoil</p>
            <p className="text-xs text-sidebar-foreground/60">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
