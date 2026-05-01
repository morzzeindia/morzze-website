"use client"
import * as React from "react"
import { 
  IconLayoutDashboard, IconUser, IconShoppingBag, 
  IconAddressBook, IconHeart, IconStar, 
  IconBell, IconLogout, IconChevronRight 
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Dashboard", icon: IconLayoutDashboard, active: true },
  { title: "Profile Settings", icon: IconUser },
  { title: "My Orders", icon: IconShoppingBag },
  { title: "Address Book", icon: IconAddressBook },
  { title: "Wishlist", icon: IconHeart },
  { title: "Reviews & Ratings", icon: IconStar },
  { title: "Notifications", icon: IconBell },
]

export function AppSidebar() {
  return (
    <div className="w-[280px] border-r border-zinc-900 bg-[#0A0A0A] flex flex-col p-4 h-screen sticky top-0">
      {/* Profile Card */}
      <div className="bg-[#111111] rounded-xl p-6 mb-6 text-center border border-zinc-900">
        <div className="w-12 h-12 bg-zinc-800 rounded-full mx-auto mb-3 flex items-center justify-center">
          <IconUser className="text-[#FFB800]" size={24} />
        </div>
        <h3 className="text-white font-medium text-sm">John Doe</h3>
        <p className="text-zinc-500 text-[10px] mt-1">johndoe333@gmail.com</p>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.title}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group",
              item.active 
                ? "bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20" 
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className={item.active ? "text-[#FFB800]" : "text-zinc-500"} />
              <span className="text-[13px] font-medium">{item.title}</span>
            </div>
            <IconChevronRight size={14} className="opacity-40" />
          </button>
        ))}
      </nav>

      {/* Sign Out */}
      <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-lg transition-all mt-auto border-t border-zinc-900 pt-6">
        <IconLogout size={18} />
        <span className="text-[13px] font-medium">Sign Out</span>
      </button>
    </div>
  )
}