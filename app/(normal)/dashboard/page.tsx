import { AddressCard } from "@/components/dashboard/AddressCard"
import { RecentOrders } from "@/components/dashboard/RecentOrders"
import { IconHeart, IconStar, IconMapPin, IconPackage } from "@tabler/icons-react"


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-white">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Wishlist", icon: IconHeart, count: 0 },
          { label: "Reviews", icon: IconStar, count: 0 },
          { label: "Addresses", icon: IconMapPin, count: 0 },
          { label: "Orders", icon: IconPackage, count: 0 },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0F0F0F] border border-zinc-900 p-5 rounded-xl flex flex-col justify-between h-[120px]">
            <div className="flex justify-between">
               <stat.icon className="text-[#FFB800]" size={20} />
               <span className="text-zinc-800">→</span>
            </div>
            <div>
              <div className="text-2xl text-white font-medium">{stat.count}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content: Orders and Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recent Orders (8 columns on desktop) */}
        <div className="lg:col-span-8">
          <RecentOrders />
        </div>

        {/* Right Side: Address (4 columns on desktop) */}
        <div className="lg:col-span-4">
          <AddressCard />
        </div>
      </div>
    </div>
  )
}