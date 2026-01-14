"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { formatCurrency } from "@/lib/utils"

const COLORS = ["#1e40af", "#dc2626", "#f59e0b", "#10b981", "#8b5cf6"]

interface SalesTrendData {
  dia: string
  ventas: number
}

interface SalesByZoneData {
  zona: string
  ventas: number
  pedidos: number
}

interface CategoryData {
  name: string
  value: number
}

interface VendedorData {
  name: string
  ventas: number
  pedidos: number
}

interface EstadisticasChartsProps {
  salesTrend: SalesTrendData[]
  salesByZone: SalesByZoneData[]
  categoryData: CategoryData[]
  salesByVendedor: VendedorData[]
}

export function EstadisticasCharts({
  salesTrend,
  salesByZone,
  categoryData,
  salesByVendedor,
}: EstadisticasChartsProps) {
  return (
    <>
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Ventas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Line type="monotone" dataKey="ventas" stroke="#1e40af" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales by Zone */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ventas por Zona</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByZone}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zona" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="ventas" fill="#1e40af" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ventas por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales by Vendedor */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ventas por Vendedor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByVendedor} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="ventas" fill="#dc2626" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}
