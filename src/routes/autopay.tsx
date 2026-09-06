import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppHeader, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/autopay")({
  head: () => ({
    meta: [
      { title: "UPI Autopay — MyUPI" },
      {
        name: "description",
        content: "Pause, resume or cancel your recurring UPI mandates across payment apps.",
      },
      { property: "og:title", content: "UPI Autopay — MyUPI" },
      { property: "og:description", content: "Manage every recurring UPI mandate in one place." },
    ],
  }),
  component: Autopay,
});

const mandates = [
  { name: "Netflix", amount: "₹649", next: "Next debit 12 Sep 2026" },
  { name: "Spotify", amount: "₹119", next: "Next debit 18 Sep 2026" },
  { name: "SIP - Index Fund", amount: "₹5,000", next: "Next debit 01 Oct 2026" },
];

function Autopay() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader backTo="/upi-help" />
          <div className="px-4 pb-5">
            <h1 className="text-[17px] font-bold">UPI Autopay</h1>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Pause, resume or cancel your recurring payments.
            </p>
          </div>
        </div>
        <Screen className="space-y-2 px-4 pt-4">
          {mandates.map((m) => (
            <div key={m.name} className="card-soft flex items-center gap-3 px-3 py-3">
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold">{m.name}</span>
                <span className="block text-[10px] text-muted-foreground">{m.next}</span>
              </span>
              <span className="text-[13px] font-semibold">{m.amount}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </Screen>
      </div>
    </PhoneFrame>
  );
}
