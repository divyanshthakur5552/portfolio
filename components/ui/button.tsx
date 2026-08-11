import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantStyles = {
  default: "bg-white text-black hover:bg-zinc-200",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-white",
  secondary: "bg-white/10 text-white hover:bg-white/15",
  ghost: "hover:bg-zinc-800 text-white",
  link: "text-white underline-offset-4 hover:underline",
};

const sizeStyles = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8 text-base",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
