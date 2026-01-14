"use client"

import { useState } from "react"
import { OrderTable } from "@/components/admin/order-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { orders } from "@/lib/mock-data"
import { Search, Download } from "lucide-react"

export default function AdminPedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [zonaFilter, setZonaFilter] = useState<string>("todas")

  // Filter orders
  let filteredOrders = [...orders]

  if (statusFilter !== "todos") {
    if (statusFilter === "pendientes") {
      filteredOrders = filteredOrders.filter((o) => !["ENTREGADO", "CANCELADO"].includes(o.status))
    } else if (statusFilter === "urgentes") {
      filteredOrders = filteredOrders.filter((o) => o.isUrgent)
    } else {
      filteredOrders = filteredOrders.filter((o) => o.status === statusFilter)
    }
  }

  if (zonaFilter !== "todas") {
    filteredOrders = filteredOrders.filter((o) => o.zona === zonaFilter)
  }

  if (searchTerm) {
    filteredOrders = filteredOrders.filter(
      (o) =>
        o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.vendedorName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Pedidos</h1>
          <p className="text-muted-foreground">Administra todos los pedidos del sistema</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente, pedido o vendedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="pendientes">Pendientes</SelectItem>
            <SelectItem value="urgentes">Urgentes</SelectItem>
            <SelectItem value="RECIBIDO">Recibido</SelectItem>
            <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
            <SelectItem value="EN_ARMADO">En Armado</SelectItem>
            <SelectItem value="LISTO">Listo</SelectItem>
            <SelectItem value="EN_ENTREGA">En Entrega</SelectItem>
            <SelectItem value="ENTREGADO">Entregado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={zonaFilter} onValueChange={setZonaFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las zonas</SelectItem>
            <SelectItem value="Norte">Norte</SelectItem>
            <SelectItem value="Capital">Capital</SelectItem>
            <SelectItem value="Sur">Sur</SelectItem>
            <SelectItem value="Oeste">Oeste</SelectItem>
            <SelectItem value="GBA">GBA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <OrderTable orders={filteredOrders} />
      ) : (
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          <p>No se encontraron pedidos</p>
        </div>
      )}
    </div>
  )
}
