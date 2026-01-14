"use client"

import type React from "react"
import { SidebarNav } from "@/components/admin/sidebar-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
