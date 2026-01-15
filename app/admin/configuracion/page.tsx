import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { vendedores } from "@/lib/mock-data"
import { Settings, Users, MapPin, Package, Bell } from "lucide-react"

export default function AdminConfiguracionPage() {
  const activeVendedores = vendedores.filter((v) => v.role === "vendedor")

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Configuración del Sistema</h1>
        <p className="text-sm md:text-base text-muted-foreground">Administra la configuración general</p>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 md:p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Usuarios</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{vendedores.length} usuarios</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Zonas</h3>
              <p className="text-xs md:text-sm text-muted-foreground">5 zonas activas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Productos</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Categorías y stock</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Notificaciones</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Alertas y avisos</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Management */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-6">
          <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
          <Button className="w-full md:w-auto">Agregar Usuario</Button>
        </div>
        <div className="space-y-3">
          {vendedores.map((vendedor) => (
            <div key={vendedor.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border rounded-lg gap-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                  {vendedor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{vendedor.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{vendedor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-wrap ml-13 md:ml-0">
                <Badge variant={vendedor.role === "admin" ? "default" : "secondary"} className="text-xs">
                  {vendedor.role === "admin" ? "Admin" : "Vendedor"}
                </Badge>
                {vendedor.role === "vendedor" && (
                  <div className="text-xs md:text-sm text-muted-foreground hidden md:block">{vendedor.zonas.join(", ")}</div>
                )}
                <Badge variant={vendedor.isActive ? "outline" : "secondary"} className="text-xs">
                  {vendedor.isActive ? "Activo" : "Inactivo"}
                </Badge>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Zone Configuration */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-6">
          <h3 className="text-lg font-semibold">Configuración de Zonas</h3>
          <Button variant="outline" className="w-full md:w-auto">Editar Zonas</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {["Norte", "Capital", "Sur", "Oeste", "GBA"].map((zona) => (
            <Card key={zona} className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm md:text-base">{zona}</h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                {activeVendedores.filter((v) => v.zonas.includes(zona as any)).length} vendedores
              </p>
            </Card>
          ))}
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 md:mb-6">Configuraciones del Sistema</h3>
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border rounded-lg gap-3">
            <div>
              <p className="font-medium text-sm md:text-base">Alertas de Stock Bajo</p>
              <p className="text-xs md:text-sm text-muted-foreground">Umbral predeterminado: 25 unidades</p>
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              Configurar
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border rounded-lg gap-3">
            <div>
              <p className="font-medium text-sm md:text-base">Alertas de Stock Crítico</p>
              <p className="text-xs md:text-sm text-muted-foreground">Umbral predeterminado: 10 unidades</p>
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              Configurar
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border rounded-lg gap-3">
            <div>
              <p className="font-medium text-sm md:text-base">Tiempo de Fabricación Customizado</p>
              <p className="text-xs md:text-sm text-muted-foreground">Predeterminado: 15 días</p>
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              Configurar
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border rounded-lg gap-3">
            <div>
              <p className="font-medium text-sm md:text-base">Notificaciones por Email</p>
              <p className="text-xs md:text-sm text-muted-foreground">Estado de pedidos y alertas</p>
            </div>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              Configurar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
