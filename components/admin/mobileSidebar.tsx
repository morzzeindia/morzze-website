// components/admin/mobile-sidebar.tsx
"use client"

import { Menu } from "lucide-react"
import { Sidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:text-yellow-400"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-64 bg-zinc-950 border-zinc-800">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
