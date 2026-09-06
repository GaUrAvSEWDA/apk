import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronUp, Info, SlidersHorizontal, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AppHeader, BankAvatar, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "All Transactions — MyUPI" },
      {
        name: "description",
        content:
          "Consolidated view of your UPI activity across payment apps, with transaction replay and complaint raising.",
      },
      { property: "og:title", content: "All Transactions — MyUPI" },
      { property: "og:description", content: "Find a payment and raise a complaint directly." },
    ],
  }),
  component: Transactions,
});

const txns = [
  { id: 1, name: "AXXXA KXXXR", amount: "₹00", date: "18 Aug 2026, 11:16 am" },
  { id: 2, name: "AXXXA KXXXR", amount: "₹00", date: "18 Aug 2026, 11:16 am" },
  { id: 3, name: "Merchant ABC", amount: "₹00", date: "18 Aug 2026, 11:16 am" },
  { id: 4, name: "AXXXA KXXXR", amount: "₹00", date: "18 Aug 2026, 11:16 am" },
];

function Transactions() {
  const [open, setOpen] = useState<number | null>(3);

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader backTo="/upi-help" />
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-[17px] font-bold">All Transactions</h1>
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                Filters <SlidersHorizontal className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-2 flex gap-2 text-[11px] text-muted-foreground">
              <Info className="mt-px h-3.5 w-3.5 shrink-0" />
              Consolidated view of your UPI activity across payment apps
            </p>
          </div>
        </div>

        <Screen>
          <div className="mx-4 mt-3 rounded-xl bg-surface p-3">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              If you face any transaction-related issue, locate and click the transaction and raise a
              complaint directly.
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] font-medium">Not able to find a your transaction?</span>
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                Find Now ⟳
              </span>
            </div>
          </div>

          <div className="mt-3 bg-accent px-4 py-2 text-[11px] font-semibold tracking-wide text-muted-foreground">
            AUGUST 2026
          </div>

          <div className="divide-y divide-border bg-card">
            {txns.map((t) => (
              <div key={t.id}>
                <button
                  onClick={() => setOpen(open === t.id ? null : t.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface">
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] text-muted-foreground">Paid to</span>
                    <span className="block truncate text-[13px] font-semibold">{t.name}</span>
                    <span className="block text-[10px] text-muted-foreground">{t.date}</span>
                  </span>
                  <span className="text-[13px] font-semibold">{t.amount}</span>
                  {open === t.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {open === t.id && (
                  <div className="border-t border-dashed border-border px-4 py-3">
                    <p className="flex items-center gap-2 text-[13px] font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Payment successful
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-y-3">
                      <Field label="Transaction ID" value="928376484322" />
                      <Field label="Transaction mode" value="Bank account" />
                      <div>
                        <p className="text-[10px] text-muted-foreground">Debited account</p>
                        <p className="mt-1 flex items-center gap-2 text-[12px] font-medium">
                          <BankAvatar name="Bank A" />
                          <span>
                            Bank A
                            <span className="block text-[10px] text-muted-foreground">
                              XXXXX XXX123
                            </span>
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Debited account</p>
                        <p className="mt-2 text-[12px] font-black text-primary italic">BHIM App</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Link
                        to="/complaint"
                        className="rounded-full border border-border py-2.5 text-center text-[13px] font-semibold"
                      >
                        Raise A Complaint
                      </Link>
                      <button className="rounded-full bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground">
                        Pay Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="h-8" />
        </Screen>
      </div>
    </PhoneFrame>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-[12px] font-medium">{value}</p>
    </div>
  );
}
