import * as React from "react";

interface AccordionItemData {
  value: string;
}

interface AccordionContextValue {
  openItem: string | null;
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined,
);

interface AccordionProps {
  type?: "single";
  defaultValue?: string;
  children: React.ReactNode;
}

export const Accordion = ({
  defaultValue = "",
  children,
}: AccordionProps) => {
  const [openItem, setOpenItem] = React.useState<string | null>(
    defaultValue || null,
  );

  const toggleItem = (value: string) => {
    setOpenItem((current) => (current === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className="space-y-3">{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AccordionItemData {}

export const AccordionItem = ({
  value,
  className = "",
  ...props
}: AccordionItemProps) => (
  <div
    data-value={value}
    className={`overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] ${className}`}
    {...props}
  />
);

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const AccordionTrigger = ({
  value,
  className = "",
  children,
  ...props
}: AccordionTriggerProps) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionTrigger must be used within <Accordion>");
  const isOpen = ctx.openItem === value;

  return (
    <button
      type="button"
      onClick={() => ctx.toggleItem(value)}
      className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white transition-colors ${
        isOpen ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs transition-transform ${
          isOpen ? "rotate-45 bg-accent text-black" : "bg-transparent"
        }`}
      >
        +
      </span>
    </button>
  );
};

interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionContent = ({
  value,
  className = "",
  ...props
}: AccordionContentProps) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionContent must be used within <Accordion>");
  const isOpen = ctx.openItem === value;
  if (!isOpen) return null;

  return (
    <div
      className={`border-t border-white/5 px-5 py-4 text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
};

