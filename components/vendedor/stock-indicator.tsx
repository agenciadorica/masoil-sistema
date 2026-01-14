import { Badge } from "@/components/ui/badge"
import { getStockStatus } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface StockIndicatorProps {
  product: Product
  showCount?: boolean
}

export function StockIndicator({ product, showCount = false }: StockIndicatorProps) {
  const status = getStockStatus(product.stock, product.lowStockThreshold, product.criticalStockThreshold)

  if (product.isCustomizable && product.stock === 0) {
    return (
      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-medium">
        🏭 Bajo pedido (15 días)
      </Badge>
    )
  }

  switch (status) {
    case "sin-stock":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">
          ❌ Sin stock
        </Badge>
      )
    case "critico":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">
          ⚠️ Stock crítico {showCount && `(${product.stock})`}
        </Badge>
      )
    case "bajo":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-medium">
          ⚠️ Stock bajo {showCount && `(${product.stock})`}
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
          ✅ En stock {showCount && `(${product.stock})`}
        </Badge>
      )
  }
}
