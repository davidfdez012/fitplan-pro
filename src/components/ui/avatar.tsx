import * as React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
}

export const Avatar = ({
  initials = "FP",
  className = "",
  ...props
}: AvatarProps) => (
  <div
    className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-sm font-semibold text-white ring-2 ring-accent/70 ${className}`}
    {...props}
  >
    {initials}
  </div>
);

