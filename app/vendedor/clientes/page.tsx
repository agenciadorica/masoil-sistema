"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { clients, vendedores } from "@/lib/mock-data"
import { Search, Phone, MessageCircle, Plus } from "lucide-react"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export default function VendedorClientesPage() {
  const currentVendedor = vendedores[0]
  const [searchTerm, setSearchTerm] = useState("")

  // Filter clients
  let filteredClients = clients.filter((c) => c.vendedorId === currentVendedor.id)

  if (searchTerm) {
    filteredClients = filteredClients.filter(
      (c) =>
        c.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contactName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold mb-4">Mis Clientes</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
        </div>
      </div>

      {/* Clients List */}
      <div className="p-4 space-y-3">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <Card key={client.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1">{client.businessName}</h3>
                  <p className="text-sm text-muted-foreground">{client.contactName}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {client.zona}
                </Badge>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{client.whatsapp}</span>
                </div>
                {client.lastOrderDate && (
                  <div className="text-xs">Último pedido: {formatDate(client.lastOrderDate)}</div>
                )}
                <div className="text-xs">Total pedidos: {client.totalOrders}</div>
              </div>

              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/vendedor/pedidos/nuevo?clientId=${client.id}`}>
                    <Plus className="h-4 w-4 mr-1" />
                    Nuevo Pedido
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a
                    href={`https://wa.me/${client.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  )
}
