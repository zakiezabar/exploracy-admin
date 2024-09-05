import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary: "bg-primary-400 text-black hover:bg-primary-400/90 border-primary-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-primary-500 hover:bg-slate-100",
        secondary: "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",
        danger: "bg-rose-500 text-slate-100 hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        super: "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        ghost: "bg-white text-slate-500 border-transparent border-0 hover:bg-slate-100",
        ghostOutline: "bg-white text-slate-500 border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100",
        sidebar: "bg-white text-slate-500 font-medium hover:bg-slate-200 transition-color",
        sidebarOutline: "bg-primary-200 text-slate-600 hover:bg-primary-400 transition-color",
        link: "bg-transparent text-slate-500 border-transparent border-0 normal-case hover:text-primary-700",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-10 px-4 normal-case",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
