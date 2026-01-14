import { Card } from "@/components/ui/card"

interface QuickStatsProps {
  todayOrders: number
  pendingOrders: number
  urgentOrders: number
}

export function QuickStats({ todayOrders, pendingOrders, urgentOrders }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="p-4 border-primary/20 bg-primary/5">
        <div className="text-xs font-medium text-muted-foreground mb-1">HOY</div>
        <div className="text-2xl font-bold text-primary">{todayOrders}</div>
      </Card>
      <Card className="p-4 border-amber-500/20 bg-amber-500/5">
        <div className="text-xs font-medium text-muted-foreground mb-1">PENDIENTES</div>
        <div className="text-2xl font-bold text-amber-600">{pendingOrders}</div>
      </Card>
      <Card className="p-4 border-red-500/20 bg-red-500/5">
        <div className="text-xs font-medium text-muted-foreground mb-1">URGENTES</div>
        <div className="text-2xl font-bold text-red-600">{urgentOrders}</div>
      </Card>
    </div>
  )
}
