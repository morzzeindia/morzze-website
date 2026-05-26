import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  iconBg?: string
  subtitleVariant?: "positive" | "negative" | "neutral"
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-primary/10 text-primary",
  subtitleVariant = "neutral",
  
}: StatCardProps) {
  return (
    <Card className="border border-zinc-800 bg-zinc-950 hover:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-center justify-between px-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-400">
            {title}
          </p>

          <p className="text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>

          <p
            className={cn(
              "text-xs font-medium",
              subtitleVariant === "positive" &&
                "text-emerald-400",
              subtitleVariant === "negative" &&
                "text-red-400",
              subtitleVariant === "neutral" &&
                "text-zinc-500"
            )}
          >
            {subtitle}
          </p>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
