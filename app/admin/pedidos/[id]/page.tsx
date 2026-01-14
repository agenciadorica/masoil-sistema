import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StatusTimeline } from "@/components/vendedor/status-timeline"
import { CountdownWidget } from "@/components/vendedor/countdown-widget"
import { orders, clients } from "@/lib/mock-data"
import { getStatusConfig } from "@/lib/status-config"
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils"
import { ArrowLeft, Printer, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function AdminPedidoDetailPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    notFound()
  }

  const client = clients.find((c) => c.id === order.clientId)
  const statusConfig = getStatusConfig(order.status)

  return (
    <div className="p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/pedidos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
            {order.isUrgent && (
              <Badge variant="destructive" className="text-xs">
                URGENTE
              </Badge>
            )}
            {order.isCustom && (
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                CUSTOMIZADO
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Creado el {formatDateTime(order.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Remito
          </Button>
          <Button>Actualizar Estado</Button>
        </div>
      </div>

      {/* Status Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Estado del Pedido</h3>
        <StatusTimeline currentStatus={order.status} isCustom={order.isCustom} />
      </Card>

      {/* Countdown for Custom Orders */}
      {order.isCustom && <CountdownWidget estimatedDelivery={order.estimatedDelivery} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Productos</h3>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-muted-foreground font-mono">{product.productCode}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Cant: {product.quantity}</span>
                    <span className="font-semibold">{formatCurrency(product.price * product.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl">{formatCurrency(order.total)}</span>
            </div>
          </Card>

          {/* Status History */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Historial de Estados</h3>
            <div className="space-y-4">
              {order.statusHistory.map((change, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        className={`${getStatusConfig(change.status).bgColor} ${getStatusConfig(change.status).color} text-xs`}
                      >
                        {getStatusConfig(change.status).label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{formatDateTime(change.timestamp)}</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">{change.userName}</span>
                      {change.notes && <span className="text-muted-foreground ml-2">- {change.notes}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Notas del Pedido</h3>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Información del Cliente</h3>
            {client && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                  <p className="font-medium">{client.businessName}</p>
                  <p className="text-sm">{client.contactName}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contacto</p>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Phone className="h-3 w-3" />
                    <span>{client.whatsapp}</span>
                  </div>
                  <p className="text-sm">{client.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dirección</p>
                  <p className="text-sm">{client.address}</p>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{client.zona}</Badge>
                  <Badge variant="outline">{client.paymentTerms}</Badge>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar Cliente
                </Button>
              </div>
            )}
          </Card>

          {/* Vendedor Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Vendedor Asignado</h3>
            <div>
              <p className="font-medium mb-1">{order.vendedorName}</p>
              <Badge variant="outline" className="text-xs">
                {order.zona}
              </Badge>
            </div>
          </Card>

          {/* Delivery Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Información de Entrega</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Fecha estimada</p>
                <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Zona de entrega</p>
                <p className="font-medium">{order.zona}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
