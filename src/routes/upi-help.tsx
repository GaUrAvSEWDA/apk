import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppHeader, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/upi-help")({
  head: () => ({
    meta: [
      { title: "About UPI Help — MyUPI" },
      {
        name: "description",
        content:
          "A quick guide to everything UPI Help can do: Autopay, transactions, Ask AI, Pay Safe and the Safety Switch.",
      },
      { property: "og:title", content: "About UPI Help — MyUPI" },
      { property: "og:description", content: "Tap any feature to open it." },
    ],
  }),
  component: UpiHelp,
});

const items = [
  {
    to: "/autopay",
    title: "UPI Autopay",
    desc: "Pause, resume or cancel your recurring payments.",
    emoji: "💰",
  },
  {
    to: "/transactions",
    title: "Transactions",
    desc: "Your last 60 days of payments, with filters.",
    emoji: "🏦",
  },
  { to: "/ask-ai", title: "Ask AI", desc: "Do anything in the app just by chatting.", emoji: "✨" },
  {
    to: "/pay-safe",
    title: "Pay Safe",
    desc: "Check a UPI ID, number or QR before you send money.",
    emoji: "🛡️",
  },
  {
    to: "/safety-switch",
    title: "Safety Switch",
    desc: "Stop UPI payments on your accounts in an emergency.",
    emoji: "🏛️",
  },
] as const;

function UpiHelp() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader backTo="/" />
          <div className="px-4 pb-5">
            <h1 className="text-[17px] font-bold">About UPI Help</h1>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              A quick guide to everything UPI Help can do. Tap any feature to open it.
            </p>
          </div>
        </div>
        <Screen className="space-y-3 px-4 pt-4 pb-6">
          {items.map((i) => (
            <Link
              key={i.title}
              to={i.to}
              className="card-soft flex items-center gap-3 px-3 py-3.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface text-lg">
                {i.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold">{i.title}</span>
                <span className="block text-[11px] leading-tight text-muted-foreground">
                  {i.desc}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </Screen>
      </div>
    </PhoneFrame>
  );
}
