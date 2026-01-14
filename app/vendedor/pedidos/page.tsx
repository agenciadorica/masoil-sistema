"use client"

import { useState } from "react"
import { OrderCard } from "@/components/vendedor/order-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { orders, vendedores } from "@/lib/mock-data"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function VendedorPedidosPage() {
  const currentVendedor = vendedores[0]
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  // Filter orders
  let filteredOrders = orders.filter((o) => o.vendedorId === currentVendedor.id)

  if (statusFilter !== "todos") {
    if (statusFilter === "pendientes") {
      filteredOrders = filteredOrders.filter((o) => !["ENTREGADO", "CANCELADO"].includes(o.status))
    } else if (statusFilter === "urgentes") {
      filteredOrders = filteredOrders.filter((o) => o.isUrgent && !["ENTREGADO", "CANCELADO"].includes(o.status))
    } else if (statusFilter === "entregados") {
      filteredOrders = filteredOrders.filter((o) => o.status === "ENTREGADO")
    }
  }

  if (searchTerm) {
    filteredOrders = filteredOrders.filter(
      (o) =>
        o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Mis Pedidos</h1>
          <Button asChild size="sm" variant="secondary">
            <Link href="/vendedor/pedidos/nuevo">
              <Plus className="h-4 w-4 mr-1" />
              Nuevo
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente o #pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b bg-card sticky top-[136px] z-10">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendientes">Pendientes</SelectItem>
            <SelectItem value="urgentes">Urgentes</SelectItem>
            <SelectItem value="entregados">Entregados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No se encontraron pedidos</p>
          </div>
        )}
      </div>
    </div>
  )
}
