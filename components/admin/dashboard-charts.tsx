"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface OrdersByZone {
  name: string
  value: number
}

interface OrdersByStatus {
  name: string
  value: number
  fill: string
}

interface DashboardChartsProps {
  ordersByZone: OrdersByZone[]
  ordersByStatus: OrdersByStatus[]
}

const COLORS = ["#3b82f6", "#06b6d4", "#f97316", "#10b981", "#8b5cf6", "#ec4899"]

export function DashboardCharts({ ordersByZone, ordersByStatus }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Orders by Zone */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos por Zona</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ordersByZone}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1e40af" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Orders by Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos por Estado</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={ordersByStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {ordersByStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
