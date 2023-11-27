import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWrapper = ({
    className,
    children
}: {
    className?: string,
    children: ReactNode
}) => {
  return (
    <div className={cn("w-full mx-auto p-2.5 md:p-20 max-w-6xl", className)}>
        {children}
    </div>
  )
}

export default MaxWrapper