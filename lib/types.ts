// Core data types for Masoil Lubricantes Order Management System

export type Zona = "Norte" | "Capital" | "Sur" | "Oeste" | "GBA"

export type OrderStatus =
  | "RECIBIDO"
  | "CONFIRMADO"
  | "EN_ARMADO"
  | "EN_FABRICACION"
  | "CON_PROVEEDOR"
  | "SIN_STOCK"
  | "LISTO"
  | "EN_ENTREGA"
  | "ENTREGADO"
  | "CANCELADO"

export type ProductCategory = "Limpiadores" | "Lubricantes" | "Selladores" | "Belleza" | "Higiene"

export type UserRole = "vendedor" | "admin"

export interface Product {
  id: string
  code: string
  name: string
  category: ProductCategory
  stock: number
  price: number
  isCustomizable: boolean
  customLeadTime: number // days
  lowStockThreshold: number
  criticalStockThreshold: number
}

export interface OrderProduct {
  productId: string
  productCode: string
  productName: string
  quantity: number
  price: number
}

export interface StatusChange {
  status: OrderStatus
  timestamp: Date
  userId: string
  userName: string
  notes?: string
}

export interface Order {
  id: string
  clientId: string
  clientName: string
  vendedorId: string
  vendedorName: string
  zona: Zona
  status: OrderStatus
  products: OrderProduct[]
  total: number
  notes: string
  isCustom: boolean
  estimatedDelivery: Date
  createdAt: Date
  updatedAt: Date
  statusHistory: StatusChange[]
  isUrgent: boolean
}

export interface Client {
  id: string
  businessName: string
  contactName: string
  whatsapp: string
  email: string
  zona: Zona
  vendedorId: string
  address: string
  paymentTerms: string
  creditLimit: number
  notes: string
  lastOrderDate?: Date
  totalOrders: number
}

export interface Vendedor {
  id: string
  name: string
  email: string
  whatsapp: string
  zonas: Zona[]
  isActive: boolean
  role: UserRole
}

export interface StatusConfig {
  status: OrderStatus
  icon: string
  color: string
  bgColor: string
  label: string
  description: string
}
