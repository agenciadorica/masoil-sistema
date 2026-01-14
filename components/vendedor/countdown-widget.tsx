import { Card } from "@/components/ui/card"
import { getDaysRemaining, formatDate } from "@/lib/utils"

interface CountdownWidgetProps {
  estimatedDelivery: Date
}

export function CountdownWidget({ estimatedDelivery }: CountdownWidgetProps) {
  const daysRemaining = getDaysRemaining(estimatedDelivery)

  return (
    <Card className="p-6 border-purple-200 bg-purple-50">
      <div className="text-center space-y-2">
        <div className="text-2xl">🏭</div>
        <div className="text-sm font-semibold text-purple-900">Pedido Customizado</div>
        <div className="text-4xl font-bold text-purple-700">{daysRemaining}</div>
        <div className="text-sm font-medium text-purple-900">DÍAS RESTANTES</div>
        <div className="text-xs text-purple-700 pt-2 border-t border-purple-200">
          Fecha estimada: {formatDate(estimatedDelivery)}
        </div>
      </div>
    </Card>
  )
}
