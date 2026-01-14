import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { vendedores } from "@/lib/mock-data"
import { Mail, Phone, MapPin, LogOut } from "lucide-react"

export default function VendedorPerfilPage() {
  const currentVendedor = vendedores[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Mi Perfil</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl font-bold text-primary">
                {currentVendedor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <h2 className="text-xl font-bold">{currentVendedor.name}</h2>
            <Badge variant="secondary" className="mt-2">
              Vendedor
            </Badge>
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{currentVendedor.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{currentVendedor.whatsapp}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Zonas: {currentVendedor.zonas.join(", ")}</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Configuración</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Notificaciones
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Ayuda y soporte
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
