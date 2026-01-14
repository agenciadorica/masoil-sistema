import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { orders } from "@/lib/mock-data"
import { formatCurrency, formatDate, getDaysRemaining } from "@/lib/utils"
import { getStatusConfig } from "@/lib/status-config"
import Link from "next/link"
import { Eye } from "lucide-react"

export default function AdminCustomOrdersPage() {
  const customOrders = orders.filter((o) => o.isCustom)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Pedidos Customizados</h1>
        <p className="text-muted-foreground">Seguimiento de pedidos con fabricación especial (15 días)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Customizados</p>
          <p className="text-2xl font-bold">{customOrders.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">En Fabricación</p>
          <p className="text-2xl font-bold">{customOrders.filter((o) => o.status === "EN_FABRICACION").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Próximos a Vencer</p>
          <p className="text-2xl font-bold">
            {customOrders.filter((o) => getDaysRemaining(o.estimatedDelivery) <= 3).length}
          </p>
        </Card>
      </div>

      {/* Custom Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customOrders.length > 0 ? (
          customOrders.map((order) => {
            const daysRemaining = getDaysRemaining(order.estimatedDelivery)
            const statusConfig = getStatusConfig(order.status)

            return (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono text-sm font-semibold text-muted-foreground mb-1">#{order.id}</p>
                    <h3 className="font-semibold text-lg">{order.clientName}</h3>
                  </div>
                  <Badge className={`${statusConfig.bgColor} ${statusConfig.color} border text-xs`} variant="outline">
                    {statusConfig.label}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl mb-1">🏭</div>
                    <div className="text-2xl font-bold text-purple-700">{daysRemaining}</div>
                    <div className="text-xs font-medium text-purple-900">DÍAS RESTANTES</div>
                    {daysRemaining <= 3 && (
                      <Badge variant="destructive" className="mt-2 text-xs">
                        URGENTE
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha estimada:</span>
                      <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-semibold">{formatCurrency(order.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Zona:</span>
                      <Badge variant="outline" className="text-xs">
                        {order.zona}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full" size="sm">
                  <Link href={`/admin/pedidos/${order.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Link>
                </Button>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p>No hay pedidos customizados actualmente</p>
          </div>
        )}
      </div>
    </div>
  )
}
