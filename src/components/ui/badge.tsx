import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Badge = ({ className = "", ...props }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent ${className}`}
    {...props}
  />
);

