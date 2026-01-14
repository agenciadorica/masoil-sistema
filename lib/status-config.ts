import type { StatusConfig, OrderStatus } from "./types"

export const statusConfig: Record<OrderStatus, StatusConfig> = {
  RECIBIDO: {
    status: "RECIBIDO",
    icon: "📥",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    label: "Recibido",
    description: "Pedido recibido, pendiente de confirmación",
  },
  CONFIRMADO: {
    status: "CONFIRMADO",
    icon: "✓",
    color: "text-cyan-700",
    bgColor: "bg-cyan-50 border-cyan-200",
    label: "Confirmado",
    description: "Pedido confirmado por administración",
  },
  EN_ARMADO: {
    status: "EN_ARMADO",
    icon: "🔧",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    label: "En Armado",
    description: "Pedido siendo preparado en depósito",
  },
  EN_FABRICACION: {
    status: "EN_FABRICACION",
    icon: "🏭",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    label: "En Fabricación",
    description: "Pedido customizado en proceso de fabricación",
  },
  CON_PROVEEDOR: {
    status: "CON_PROVEEDOR",
    icon: "📦",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50 border-yellow-200",
    label: "Con Proveedor",
    description: "Esperando reposición de proveedor",
  },
  SIN_STOCK: {
    status: "SIN_STOCK",
    icon: "⚠️",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
    label: "Sin Stock",
    description: "Productos agotados",
  },
  LISTO: {
    status: "LISTO",
    icon: "✅",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    label: "Listo",
    description: "Pedido listo para entrega",
  },
  EN_ENTREGA: {
    status: "EN_ENTREGA",
    icon: "🚚",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    label: "En Entrega",
    description: "Pedido en camino al cliente",
  },
  ENTREGADO: {
    status: "ENTREGADO",
    icon: "✅",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    label: "Entregado",
    description: "Pedido completado",
  },
  CANCELADO: {
    status: "CANCELADO",
    icon: "❌",
    color: "text-gray-700",
    bgColor: "bg-gray-50 border-gray-200",
    label: "Cancelado",
    description: "Pedido cancelado",
  },
}

export function getStatusConfig(status: OrderStatus): StatusConfig {
  return statusConfig[status]
}
