import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("py-16 md:py-24", className)}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Section }
