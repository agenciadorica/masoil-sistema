import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Masoil Lubricantes</h1>
          <p className="text-muted-foreground">Sistema de Gestión de Pedidos e Inventario</p>
        </div>

        <div className="space-y-3 pt-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/vendedor">Acceso Vendedor</Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
            <Link href="/admin">Acceso Administrador</Link>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground pt-4">
          <p>20+ años distribuyendo calidad</p>
        </div>
      </Card>
    </div>
  )
}
