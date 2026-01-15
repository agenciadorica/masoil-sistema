"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clients, products, vendedores } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, Plus, Trash2, Search, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface OrderItem {
  productId: string
  productCode: string
  productName: string
  quantity: number
  price: number
}

export default function AdminNuevoPedidoPage() {
  const router = useRouter()

  const [selectedClientId, setSelectedClientId] = useState("")
  const [selectedVendedorId, setSelectedVendedorId] = useState("")
  const [clientSearch, setClientSearch] = useState("")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [isCustom, setIsCustom] = useState(false)
  const [productSearch, setProductSearch] = useState("")

  const activeVendedores = vendedores.filter((v) => v.role === "vendedor" && v.isActive)

  // Filter clients for search
  const filteredClients = useMemo(() => {
    let filtered = clients
    if (selectedVendedorId) {
      filtered = clients.filter((c) => c.vendedorId === selectedVendedorId)
    }
    if (clientSearch) {
      filtered = filtered.filter(
        (c) =>
          c.businessName.toLowerCase().includes(clientSearch.toLowerCase()) ||
          c.contactName.toLowerCase().includes(clientSearch.toLowerCase())
      )
    }
    return filtered
  }, [clientSearch, selectedVendedorId])

  // Filter products for search
  const filteredProducts = useMemo(() => {
    if (!productSearch) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.code.toLowerCase().includes(productSearch.toLowerCase())
    )
  }, [productSearch])

  const selectedClient = clients.find((c) => c.id === selectedClientId)

  const addProduct = () => {
    const product = products.find((p) => p.id === selectedProductId)
    if (!product || quantity <= 0) return

    const existingIndex = orderItems.findIndex((item) => item.productId === selectedProductId)
    if (existingIndex >= 0) {
      const newItems = [...orderItems]
      newItems[existingIndex].quantity += quantity
      setOrderItems(newItems)
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          productCode: product.code,
          productName: product.name,
          quantity,
          price: product.price,
        },
      ])
    }

    setSelectedProductId("")
    setQuantity(1)
    setProductSearch("")
  }

  const removeProduct = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeProduct(productId)
      return
    }
    setOrderItems(
      orderItems.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item))
    )
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = () => {
    if (!selectedClientId || orderItems.length === 0) {
      alert("Por favor selecciona un cliente y agrega al menos un producto")
      return
    }

    // En un caso real, aquí se enviaría a la API
    console.log({
      clientId: selectedClientId,
      vendedorId: selectedVendedorId,
      items: orderItems,
      notes,
      isUrgent,
      isCustom,
      total: subtotal,
    })

    alert("Pedido creado exitosamente!")
    router.push("/admin/pedidos")
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/admin/pedidos">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nuevo Pedido</h1>
            <p className="text-muted-foreground">Crear un nuevo pedido manualmente</p>
          </div>
        </div>

        {/* Vendedor y Cliente */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">1. Vendedor y Cliente</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Vendedor</Label>
              <Select value={selectedVendedorId} onValueChange={setSelectedVendedorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar vendedor..." />
                </SelectTrigger>
                <SelectContent>
                  {activeVendedores.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name} - {v.zonas.join(", ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!selectedClient ? (
            <div className="space-y-3">
              <Label>Cliente</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="max-h-48 overflow-y-auto border rounded-lg">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className="w-full p-3 text-left hover:bg-muted border-b last:border-b-0 transition-colors"
                  >
                    <p className="font-medium">{client.businessName}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.contactName} • {client.zona}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Cliente</Label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{selectedClient.businessName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedClient.contactName} • {selectedClient.zona}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedClientId("")}>
                  Cambiar
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Productos */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">2. Productos</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,100px,auto] gap-3 mb-4">
            <div className="space-y-2">
              <Label>Producto</Label>
              <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar producto..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <span className="font-mono text-xs">{product.code}</span>
                      <span className="ml-2">{product.name}</span>
                      <span className="ml-2 text-muted-foreground">{formatCurrency(product.price)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cantidad</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addProduct} disabled={!selectedProductId}>
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </Button>
            </div>
          </div>

          {/* Lista de productos */}
          {orderItems.length > 0 ? (
            <div className="border rounded-lg">
              <div className="grid grid-cols-[1fr,100px,120px,80px] gap-4 p-3 bg-muted text-sm font-medium">
                <span>Producto</span>
                <span className="text-center">Cant.</span>
                <span className="text-right">Subtotal</span>
                <span></span>
              </div>
              {orderItems.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-[1fr,100px,120px,80px] gap-4 p-3 border-t items-center"
                >
                  <div>
                    <p className="font-medium text-sm">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.productCode} • {formatCurrency(item.price)} c/u
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                      className="w-20"
                    />
                  </div>
                  <p className="font-semibold text-right">{formatCurrency(item.price * item.quantity)}</p>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(item.productId)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 border-t bg-muted">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{formatCurrency(subtotal)}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-lg">
              <p>No hay productos agregados</p>
            </div>
          )}
        </Card>

        {/* Opciones adicionales */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">3. Opciones</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea
                id="notes"
                placeholder="Notas adicionales para el pedido..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="urgent"
                  checked={isUrgent}
                  onCheckedChange={(checked) => setIsUrgent(checked === true)}
                />
                <div className="flex-1">
                  <Label htmlFor="urgent" className="cursor-pointer flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Pedido Urgente
                  </Label>
                  <p className="text-sm text-muted-foreground">Prioridad en procesamiento</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="custom"
                  checked={isCustom}
                  onCheckedChange={(checked) => setIsCustom(checked === true)}
                />
                <div className="flex-1">
                  <Label htmlFor="custom" className="cursor-pointer">
                    Pedido Customizado
                  </Label>
                  <p className="text-sm text-muted-foreground">Requiere fabricación especial</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Acciones */}
        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/admin/pedidos">Cancelar</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={!selectedClientId || orderItems.length === 0}
          >
            Crear Pedido
          </Button>
        </div>
      </div>
    </div>
  )
}
