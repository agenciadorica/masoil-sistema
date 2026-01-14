"use client"

import dynamic from "next/dynamic"
import { StatsCard } from "@/components/admin/stats-card"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { orders } from "@/lib/mock-data"
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { getStatusConfig } from "@/lib/status-config"

// Dynamic import to avoid SSR issues with Recharts
const DashboardCharts = dynamic(
  () => import("@/components/admin/dashboard-charts").then((mod) => mod.DashboardCharts),
  { ssr: false, loading: () => <div className="h-[250px] flex items-center justify-center">Cargando gráficos...</div> }
)

export default function AdminDashboard() {
  // Calculate stats
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayOrders = orders.filter((o) => o.createdAt >= today).length
  const pendingOrders = orders.filter((o) => !["ENTREGADO", "CANCELADO"].includes(o.status)).length
  const completedOrders = orders.filter((o) => o.status === "ENTREGADO").length
  const urgentOrders = orders.filter((o) => o.isUrgent && !["ENTREGADO", "CANCELADO"].includes(o.status)).length

  // Revenue today
  const todayRevenue = orders.filter((o) => o.createdAt >= today).reduce((sum, o) => sum + o.total, 0)

  // Orders by zone
  const ordersByZone = [
    { name: "Norte", value: orders.filter((o) => o.zona === "Norte").length },
    { name: "Capital", value: orders.filter((o) => o.zona === "Capital").length },
    { name: "Sur", value: orders.filter((o) => o.zona === "Sur").length },
    { name: "Oeste", value: orders.filter((o) => o.zona === "Oeste").length },
    { name: "GBA", value: orders.filter((o) => o.zona === "GBA").length },
  ]

  // Orders by status
  const ordersByStatus = [
    { name: "Recibido", value: orders.filter((o) => o.status === "RECIBIDO").length, fill: "#3b82f6" },
    { name: "Confirmado", value: orders.filter((o) => o.status === "CONFIRMADO").length, fill: "#06b6d4" },
    { name: "En Armado", value: orders.filter((o) => o.status === "EN_ARMADO").length, fill: "#f97316" },
    { name: "Listo", value: orders.filter((o) => o.status === "LISTO").length, fill: "#10b981" },
    { name: "En Entrega", value: orders.filter((o) => o.status === "EN_ENTREGA").length, fill: "#3b82f6" },
    { name: "Entregado", value: orders.filter((o) => o.status === "ENTREGADO").length, fill: "#10b981" },
  ].filter((s) => s.value > 0)

  // Recent alerts
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Vista general del sistema de pedidos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Pedidos Hoy" value={todayOrders} icon={FileText} trend="+12% vs ayer" trendUp={true} />
        <StatsCard title="Pedidos Pendientes" value={pendingOrders} icon={Clock} />
        <StatsCard title="Pedidos Completados" value={completedOrders} icon={CheckCircle} />
        <StatsCard
          title="Pedidos Urgentes"
          value={urgentOrders}
          icon={AlertTriangle}
          trend="Requieren atención"
          trendUp={false}
        />
      </div>

      {/* Revenue Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Facturación Hoy</p>
            <p className="text-3xl font-bold">{formatCurrency(todayRevenue)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Charts Grid - Dynamic import to avoid SSR issues */}
      <DashboardCharts ordersByZone={ordersByZone} ordersByStatus={ordersByStatus} />

      {/* Recent Orders */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos Recientes</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-mono text-sm font-semibold">#{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.clientName}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {order.zona}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">{formatCurrency(order.total)}</p>
                <Badge className={`${getStatusConfig(order.status).bgColor} ${getStatusConfig(order.status).color}`}>
                  {getStatusConfig(order.status).label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
