import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { vendedores } from "@/lib/mock-data"
import { Settings, Users, MapPin, Package, Bell } from "lucide-react"

export default function AdminConfiguracionPage() {
  const activeVendedores = vendedores.filter((v) => v.role === "vendedor")

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración del Sistema</h1>
        <p className="text-muted-foreground">Administra la configuración general</p>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Usuarios</h3>
              <p className="text-sm text-muted-foreground">{vendedores.length} usuarios</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Zonas</h3>
              <p className="text-sm text-muted-foreground">5 zonas activas</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Productos</h3>
              <p className="text-sm text-muted-foreground">Categorías y stock</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Notificaciones</h3>
              <p className="text-sm text-muted-foreground">Alertas y avisos</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Management */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
          <Button>Agregar Usuario</Button>
        </div>
        <div className="space-y-3">
          {vendedores.map((vendedor) => (
            <div key={vendedor.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {vendedor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium">{vendedor.name}</p>
                  <p className="text-sm text-muted-foreground">{vendedor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={vendedor.role === "admin" ? "default" : "secondary"}>
                  {vendedor.role === "admin" ? "Administrador" : "Vendedor"}
                </Badge>
                {vendedor.role === "vendedor" && (
                  <div className="text-sm text-muted-foreground">{vendedor.zonas.join(", ")}</div>
                )}
                <Badge variant={vendedor.isActive ? "outline" : "secondary"}>
                  {vendedor.isActive ? "Activo" : "Inactivo"}
                </Badge>
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Zone Configuration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Configuración de Zonas</h3>
          <Button variant="outline">Editar Zonas</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {["Norte", "Capital", "Sur", "Oeste", "GBA"].map((zona) => (
            <Card key={zona} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">{zona}</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {activeVendedores.filter((v) => v.zonas.includes(zona as any)).length} vendedores
              </p>
            </Card>
          ))}
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Configuraciones del Sistema</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Alertas de Stock Bajo</p>
              <p className="text-sm text-muted-foreground">Umbral predeterminado: 25 unidades</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Alertas de Stock Crítico</p>
              <p className="text-sm text-muted-foreground">Umbral predeterminado: 10 unidades</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Tiempo de Fabricación Customizado</p>
              <p className="text-sm text-muted-foreground">Predeterminado: 15 días</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notificaciones por Email</p>
              <p className="text-sm text-muted-foreground">Estado de pedidos y alertas</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
