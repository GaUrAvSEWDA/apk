import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { BottomSheet, MyUpiLogo, PhoneFrame, StatusBar } from "@/components/phone";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BHIM Home — MyUPI Help Flow Prototype" },
      {
        name: "description",
        content:
          "Interactive BHIM to MyUPI prototype: gift cards, travel services, UPI Help, transactions, complaints and the emergency safety switch.",
      },
      { property: "og:title", content: "BHIM Home — MyUPI Help Flow Prototype" },
      {
        property: "og:description",
        content: "Tap MyUPI Help to walk the full UPI Help journey.",
      },
    ],
  }),
  component: Home,
});

const gifts = [
  { name: "Google Play", off: "00% OFF", bg: "oklch(1 0 0)", ring: true },
  { name: "zepto", off: "20% OFF", bg: "oklch(0.45 0.22 300)" },
  { name: "blinkit", off: "5% OFF", bg: "oklch(0.8 0.17 90)" },
  { name: "KFC", off: "10% OFF", bg: "oklch(0.55 0.22 25)" },
];

const travel = [
  { label: "EV charging", emoji: "🔋" },
  { label: "NCMC recharge", emoji: "💳" },
  { label: "FasTag recarge", emoji: "🚗" },
  { label: "Metro recharge", emoji: "🚋" },
];

const quick = [
  "Split Expenses",
  "Help & Support",
  "Change App Theme",
  "Payment Methods",
  "Learn how to use upi safely",
];

function Home() {
  const [sheet, setSheet] = useState(false);
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="bg-card">
          <StatusBar />
        </div>
        <div className="no-scrollbar flex-1 overflow-y-auto bg-canvas px-3 pt-2 pb-4">
          <section className="card-soft p-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-bold">Gift Cards</h2>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                View more
                <span className="grid h-4 w-4 place-items-center rounded-full bg-primary">
                  <ArrowRight className="h-2.5 w-2.5 text-primary-foreground" />
                </span>
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gifts.map((g) => (
                <div key={g.name} className="flex flex-col items-center gap-1.5">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full text-[9px] font-bold text-white"
                    style={{
                      backgroundColor: g.bg,
                      border: g.ring ? "1px solid var(--color-border)" : undefined,
                      color: g.ring ? "var(--color-foreground)" : undefined,
                    }}
                  >
                    {g.ring ? "▶" : g.name.slice(0, 6)}
                  </span>
                  <span className="text-[10px] font-semibold text-success">{g.off}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 -mx-3 -mb-3 rounded-b-[0.875rem] bg-surface px-3 py-2 text-[11px] text-muted-foreground">
              🎁 Send the perfect gift instantly
            </p>
          </section>

          <section className="card-soft mt-3 p-3">
            <h2 className="text-[13px] font-bold">Travel &amp; Services</h2>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {travel.map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="text-[10px] leading-tight text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 -mx-3 -mb-3 rounded-b-[0.875rem] bg-surface px-3 py-2 text-[11px] text-muted-foreground">
              🌍 Travel smarter. Pay instantly
            </p>
          </section>

          <div className="mt-4 flex items-center gap-2 px-1">
            <h2 className="text-[13px] font-bold">Quick Actions with</h2>
            <span className="text-[13px] font-black tracking-tight text-primary italic">BHIM</span>
          </div>

          <button
            onClick={() => setSheet(true)}
            className="card-soft mt-2 flex w-full items-center gap-3 p-3 text-left"
          >
            <MyUpiLogo />
            <span className="h-6 w-px bg-border" />
            <span className="min-w-0 flex-1 text-[12px] leading-tight font-medium">
              Help for Payments,
              <br />
              Mandates &amp; Services
            </span>
            <span className="rounded-full bg-success px-2 py-0.5 text-[10px] font-semibold text-success-foreground">
              New
            </span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary">
              <ArrowRight className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
          </button>

          <div className="mt-3 space-y-2">
            {quick.map((q) => (
              <div key={q} className="card-soft flex items-center gap-3 px-3 py-3">
                <ChevronRight className="hidden" />
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-surface text-[11px]">
                  ▤
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px]">{q}</span>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary">
                  <ArrowRight className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-5 border-t border-border bg-card pt-2 pb-5 text-[10px]">
          {["Home", "Offers", "", "Cashback", "History"].map((l, i) =>
            l ? (
              <div
                key={l}
                className={`flex flex-col items-center gap-1 ${i === 0 ? "text-primary" : "text-muted-foreground"}`}
              >
                <span className="text-base">{["🏠", "◎", "", "◇", "🕘"][i]}</span>
                <span>{l}</span>
              </div>
            ) : (
              <div key="qr" />
            ),
          )}
          <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-2xl text-primary-foreground shadow-lg">
              ▦
            </span>
            <span className="text-[10px] font-semibold text-primary">MyUPI</span>
          </div>
        </div>
      </div>

      <BottomSheet open={sheet} onClose={() => setSheet(false)}>
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-border text-[10px] font-black text-primary italic">
            BHIM
          </span>
          <span className="text-muted-foreground">•••••••▸</span>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-border">
            <MyUpiLogo className="scale-75" />
          </span>
        </div>
        <h3 className="mt-4 text-center text-lg font-bold">Continue on MyUPI</h3>
        <p className="mt-2 text-center text-[12px] leading-relaxed text-muted-foreground">
          View your UPI transactions, manage Autopay mandates and more across all UPI apps
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => setSheet(false)}
            className="rounded-full border border-border py-3 text-[14px] font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate({ to: "/upi-help" })}
            className="rounded-full bg-primary py-3 text-[14px] font-semibold text-primary-foreground"
          >
            Continue
          </button>
        </div>
      </BottomSheet>
    </PhoneFrame>
  );
}
