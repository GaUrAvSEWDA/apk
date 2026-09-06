import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Menu } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MyUpiLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-1", className)}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M4 20 14 2l1.4 6.6L6 20Z" fill="oklch(0.62 0.16 152)" />
        <path d="M10 20 20 2l-1 12-4 6Z" fill="oklch(0.65 0.19 42)" />
      </svg>
      <span className="text-[13px] font-bold tracking-tight">MyUPI</span>
    </span>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-0 sm:p-6">
      <div className="relative h-[100svh] w-full overflow-hidden bg-background sm:h-[812px] sm:w-[375px] sm:rounded-[2.25rem] sm:border-[10px] sm:border-black sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pt-3 pb-1 text-[13px] font-semibold",
        className,
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 18 12" className="h-3 w-4 fill-current">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-3 w-4 fill-current">
          <path d="M8 11.5 5.6 8.9a3.4 3.4 0 0 1 4.8 0L8 11.5Zm0-5.2c-1.7 0-3.3.7-4.5 1.9L1.9 6.6a8.6 8.6 0 0 1 12.2 0l-1.6 1.6A6.3 6.3 0 0 0 8 6.3Z" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-3 w-6">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="3"
            className="fill-none stroke-current"
            strokeWidth="1"
          />
          <rect x="2" y="2" width="19" height="8" rx="1.8" className="fill-current" />
          <rect x="24" y="4" width="2" height="4" rx="1" className="fill-current" />
        </svg>
      </span>
    </div>
  );
}

export function AppHeader({
  backTo,
  onBack,
  showMenu,
}: {
  backTo?: string;
  onBack?: () => void;
  showMenu?: boolean;
}) {
  return (
    <div className="phone-header">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1 pb-3">
        {showMenu ? (
          <Menu className="h-5 w-5" />
        ) : onBack ? (
          <button onClick={onBack} aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link to={backTo ?? "/"} aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        <MyUpiLogo />
      </div>
    </div>
  );
}

export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("no-scrollbar flex-1 overflow-y-auto bg-canvas", className)}>{children}</div>
  );
}

const tabs = [
  { to: "/ask-ai", label: "Ask AI" },
  { to: "/autopay", label: "UPI Autopay" },
  { to: "/transactions", label: "Transactions" },
  { to: "/pay-safe", label: "Pay safe" },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="grid grid-cols-4 border-t border-border bg-card pt-2 pb-5">
      {tabs.map((t) => {
        const active = path.startsWith(t.to);
        return (
          <Link
            key={t.to}
            to={t.to}
            className={cn(
              "flex flex-col items-center gap-1 text-[10px]",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <TabIcon name={t.label} active={active} />
            <span>{t.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

function TabIcon({ name, active }: { name: string; active: boolean }) {
  const cls = cn("h-[18px] w-[18px]", active ? "text-primary" : "text-muted-foreground");
  if (name === "Ask AI")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
    );
  if (name === "UPI Autopay")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2" strokeLinecap="round" />
      </svg>
    );
  if (name === "Transactions")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5.2l3.4 2" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.2-7 8.5-4.1-1.3-7-4.3-7-8.5V6l7-2.5Z" />
    </svg>
  );
}

export function BottomSheet({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div
        className={cn(
          "animate-in slide-in-from-bottom absolute inset-x-0 bottom-0 max-h-[85%] overflow-y-auto rounded-t-3xl bg-card p-5 pb-7 duration-300",
          "no-scrollbar shadow-[var(--shadow-sheet)]",
          className,
        )}
      >
        {children}
        <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-foreground/70" />
      </div>
    </div>
  );
}

export function BankAvatar({ name }: { name: string }) {
  const map: Record<string, { bg: string; fg: string; label: string }> = {
    "Axis Bank": { bg: "oklch(0.96 0.01 0)", fg: "oklch(0.45 0.18 20)", label: "A" },
    "Central Bank Of India": { bg: "oklch(0.96 0.02 20)", fg: "oklch(0.55 0.2 15)", label: "C" },
    "Bandhan Bank": { bg: "oklch(0.96 0.02 20)", fg: "oklch(0.5 0.2 25)", label: "B" },
    "Bank A": { bg: "oklch(0.95 0.01 260)", fg: "oklch(0.35 0.02 260)", label: "A" },
    "SBI Bank": { bg: "oklch(0.95 0.03 250)", fg: "oklch(0.5 0.16 255)", label: "S" },
  };
  const m = map[name] ?? { bg: "oklch(0.95 0.01 260)", fg: "oklch(0.4 0.02 260)", label: name[0] };
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold"
      style={{ backgroundColor: m.bg, color: m.fg }}
    >
      {m.label}
    </span>
  );
}
