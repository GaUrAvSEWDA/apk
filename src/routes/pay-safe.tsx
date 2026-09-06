import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { AppHeader, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/pay-safe")({
  head: () => ({
    meta: [
      { title: "Pay Safe — MyUPI" },
      {
        name: "description",
        content: "Check a UPI ID, mobile number or QR code for risk signals before you send money.",
      },
      { property: "og:title", content: "Pay Safe — MyUPI" },
      { property: "og:description", content: "Verify before you pay." },
    ],
  }),
  component: PaySafe,
});

function PaySafe() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader backTo="/upi-help" />
          <div className="px-4 pb-5">
            <h1 className="text-[17px] font-bold">Pay Safe</h1>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Check a UPI ID, number or QR before you send money.
            </p>
          </div>
        </div>
        <Screen className="px-4 pt-4">
          <div className="card-soft p-4">
            <input
              placeholder="Enter UPI ID or mobile number"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-[12px] outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button className="mt-3 w-full rounded-full bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground">
              Check now
            </button>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-surface p-3 text-[11px] leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-success" />
            We look for reported fraud, new accounts and mismatched names before you pay.
          </p>
        </Screen>
      </div>
    </PhoneFrame>
  );
}
