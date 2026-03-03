import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className = "", ...props }: CardProps) => (
  <div
    className={`rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
    {...props}
  />
);

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = ({ className = "", ...props }: CardHeaderProps) => (
  <div className={`mb-4 flex flex-col gap-1 ${className}`} {...props} />
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = ({ className = "", ...props }: CardTitleProps) => (
  <h3
    className={`text-lg font-semibold tracking-tight text-white ${className}`}
    {...props}
  />
);

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = ({
  className = "",
  ...props
}: CardDescriptionProps) => (
  <p
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({
  className = "",
  ...props
}: CardContentProps) => (
  <div className={`text-sm text-muted-foreground ${className}`} {...props} />
);

