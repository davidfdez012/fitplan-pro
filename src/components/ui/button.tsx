import * as React from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 px-5 py-2.5";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-black hover:bg-accent/90 focus-visible:ring-accent",
  outline:
    "border border-accent text-accent hover:bg-accent/10 focus-visible:ring-accent/60",
  ghost:
    "text-muted-foreground hover:bg-muted focus-visible:ring-accent/60",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

