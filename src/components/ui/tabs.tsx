import * as React from "react";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className="space-y-4">{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = ({ className = "", ...props }: TabsListProps) => (
  <div
    className={`inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 text-xs ${className}`}
    {...props}
  />
);

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = ({
  value,
  className = "",
  children,
  ...props
}: TabsTriggerProps) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within <Tabs>");
  const isActive = ctx.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
        isActive
          ? "bg-accent text-black shadow-[0_0_20px_rgba(173,250,29,0.4)]"
          : "text-muted-foreground hover:bg-white/[0.04]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = ({
  value,
  className = "",
  ...props
}: TabsContentProps) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within <Tabs>");
  if (ctx.value !== value) return null;

  return (
    <div className={`mt-2 ${className}`} {...props} />
  );
};

