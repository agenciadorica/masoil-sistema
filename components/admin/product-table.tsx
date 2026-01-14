"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StockIndicator } from "@/components/vendedor/stock-indicator"
import { formatCurrency, cn } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { Edit, Trash2 } from "lucide-react"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className="w-32">Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-32 text-right">Precio</TableHead>
            <TableHead className="w-24 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const isCritical = product.stock < product.criticalStockThreshold && product.stock > 0
            const isLow = product.stock < product.lowStockThreshold && product.stock >= product.criticalStockThreshold
            const isOutOfStock = product.stock === 0 && !product.isCustomizable

            return (
              <TableRow
                key={product.id}
                className={cn(
                  isCritical && "bg-red-50",
                  isLow && "bg-yellow-50",
                  isOutOfStock && "bg-gray-50 opacity-60",
                )}
              >
                <TableCell className="font-mono text-sm font-medium">{product.code}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-lg">{product.stock}</TableCell>
                <TableCell>
                  <StockIndicator product={product} showCount={false} />
                </TableCell>
                <TableCell className="text-right font-semibold">{formatCurrency(product.price)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
