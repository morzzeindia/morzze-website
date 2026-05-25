import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "default" | "sm" | "lg" | "icon"
}

export function Spinner({ className, size = "default", ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin text-primary",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "lg",
          "h-6 w-6": size === "default",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      {...props}
    />
  )
}
