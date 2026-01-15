"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { orders, products, vendedores } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react"

// Dynamic import to avoid SSR issues with Recharts
const EstadisticasCharts = dynamic(
  () => import("@/components/admin/estadisticas-charts").then((mod) => mod.EstadisticasCharts),
  { ssr: false, loading: () => <div className="h-[300px] flex items-center justify-center">Cargando gráficos...</div> }
)

export default function AdminEstadisticasPage() {
  const [period, setPeriod] = useState("mes")

  // Calculate metrics
  const totalRevenue = orders.filter((o) => o.status === "ENTREGADO").reduce((sum, o) => sum + o.total, 0)

  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "ENTREGADO").length
  const fulfillmentRate = ((completedOrders / totalOrders) * 100).toFixed(1)

  const avgOrderValue = totalRevenue / completedOrders

  // Sales by zone
  const salesByZone = [
    {
      zona: "Norte",
      ventas: orders.filter((o) => o.zona === "Norte" && o.status === "ENTREGADO").reduce((sum, o) => sum + o.total, 0),
      pedidos: orders.filter((o) => o.zona === "Norte" && o.status === "ENTREGADO").length,
    },
    {
      zona: "Capital",
      ventas: orders
        .filter((o) => o.zona === "Capital" && o.status === "ENTREGADO")
        .reduce((sum, o) => sum + o.total, 0),
      pedidos: orders.filter((o) => o.zona === "Capital" && o.status === "ENTREGADO").length,
    },
    {
      zona: "Sur",
      ventas: orders.filter((o) => o.zona === "Sur" && o.status === "ENTREGADO").reduce((sum, o) => sum + o.total, 0),
      pedidos: orders.filter((o) => o.zona === "Sur" && o.status === "ENTREGADO").length,
    },
    {
      zona: "Oeste",
      ventas: orders.filter((o) => o.zona === "Oeste" && o.status === "ENTREGADO").reduce((sum, o) => sum + o.total, 0),
      pedidos: orders.filter((o) => o.zona === "Oeste" && o.status === "ENTREGADO").length,
    },
    {
      zona: "GBA",
      ventas: orders.filter((o) => o.zona === "GBA" && o.status === "ENTREGADO").reduce((sum, o) => sum + o.total, 0),
      pedidos: orders.filter((o) => o.zona === "GBA" && o.status === "ENTREGADO").length,
    },
  ]

  // Sales by category
  const salesByCategory = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { name: product.category, value: 0 }
      }

      // Calculate sales for this product from orders
      orders
        .filter((o) => o.status === "ENTREGADO")
        .forEach((order) => {
          const orderProduct = order.products.find((p) => p.productId === product.id)
          if (orderProduct) {
            acc[product.category].value += orderProduct.price * orderProduct.quantity
          }
        })

      return acc
    },
    {} as Record<string, { name: string; value: number }>,
  )

  const categoryData = Object.values(salesByCategory)

  // Sales by vendedor
  const salesByVendedor = vendedores
    .filter((v) => v.role === "vendedor")
    .map((vendedor) => ({
      name: vendedor.name.split(" ")[0],
      ventas: orders
        .filter((o) => o.vendedorId === vendedor.id && o.status === "ENTREGADO")
        .reduce((sum, o) => sum + o.total, 0),
      pedidos: orders.filter((o) => o.vendedorId === vendedor.id && o.status === "ENTREGADO").length,
    }))
    .sort((a, b) => b.ventas - a.ventas)

  // Sales trend (mock data - last 7 days)
  const salesTrend = [
    { dia: "Lun", ventas: 450000 },
    { dia: "Mar", ventas: 520000 },
    { dia: "Mié", ventas: 480000 },
    { dia: "Jue", ventas: 610000 },
    { dia: "Vie", ventas: 590000 },
    { dia: "Sáb", ventas: 380000 },
    { dia: "Dom", ventas: 290000 },
  ]

  // Top products
  const productSales = products.map((product) => {
    const sales = orders
      .filter((o) => o.status === "ENTREGADO")
      .reduce((sum, order) => {
        const orderProduct = order.products.find((p) => p.productId === product.id)
        return sum + (orderProduct ? orderProduct.quantity : 0)
      }, 0)

    const revenue = orders
      .filter((o) => o.status === "ENTREGADO")
      .reduce((sum, order) => {
        const orderProduct = order.products.find((p) => p.productId === product.id)
        return sum + (orderProduct ? orderProduct.price * orderProduct.quantity : 0)
      }, 0)

    return {
      ...product,
      unitsSold: sales,
      revenue,
    }
  })

  const topProducts = productSales.sort((a, b) => b.revenue - a.revenue).slice(0, 10)

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Estadísticas y Reportes</h1>
          <p className="text-sm md:text-base text-muted-foreground">Análisis de rendimiento del negocio</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semana">Esta semana</SelectItem>
            <SelectItem value="mes">Este mes</SelectItem>
            <SelectItem value="trimestre">Este trimestre</SelectItem>
            <SelectItem value="año">Este año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Facturación Total</p>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
            </div>
          </div>
          <p className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{formatCurrency(totalRevenue)}</p>
          <div className="flex items-center gap-1 text-xs md:text-sm text-green-600">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden md:inline">+15.3% vs mes anterior</span>
            <span className="md:hidden">+15.3%</span>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Pedidos Totales</p>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{totalOrders}</p>
          <div className="flex items-center gap-1 text-xs md:text-sm text-blue-600">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden md:inline">+8.2% vs mes anterior</span>
            <span className="md:hidden">+8.2%</span>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Ticket Promedio</p>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Package className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{formatCurrency(avgOrderValue)}</p>
          <div className="flex items-center gap-1 text-xs md:text-sm text-purple-600">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden md:inline">+6.5% vs mes anterior</span>
            <span className="md:hidden">+6.5%</span>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Tasa Cumplimiento</p>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{fulfillmentRate}%</p>
          <div className="flex items-center gap-1 text-xs md:text-sm text-red-600">
            <TrendingDown className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden md:inline">-2.1% vs mes anterior</span>
            <span className="md:hidden">-2.1%</span>
          </div>
        </Card>
      </div>

      {/* Charts - Dynamic import to avoid SSR issues */}
      <EstadisticasCharts
        salesTrend={salesTrend}
        salesByZone={salesByZone}
        categoryData={categoryData}
        salesByVendedor={salesByVendedor}
      />

      {/* Top Products Table */}
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Top 10 Productos Más Vendidos</h3>
        <div className="space-y-2">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{product.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{product.code}</span>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-left md:text-right ml-11 md:ml-0">
                <p className="font-bold text-base md:text-lg">{formatCurrency(product.revenue)}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{product.unitsSold} unidades vendidas</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Zone Performance Details */}
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Rendimiento Detallado por Zona</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {salesByZone.map((zona) => (
            <Card key={zona.zona} className="p-3 md:p-4 border-2">
              <h4 className="font-semibold mb-2 md:mb-3">{zona.zona}</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Ventas</p>
                  <p className="text-base md:text-xl font-bold">{formatCurrency(zona.ventas)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pedidos</p>
                  <p className="text-base md:text-lg font-semibold">{zona.pedidos}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ticket Prom.</p>
                  <p className="text-xs md:text-sm font-medium">{formatCurrency(zona.ventas / (zona.pedidos || 1))}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}
