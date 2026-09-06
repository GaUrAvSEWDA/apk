import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, FileText, Send, Paperclip, Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { AppHeader, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/complaint")({
  head: () => ({
    meta: [
      { title: "Raise a Complaint — MyUPI" },
      {
        name: "description",
        content:
          "Pick the issue you faced, attach supporting proofs and raise a UPI complaint with your bank for review.",
      },
      { property: "og:title", content: "Raise a Complaint — MyUPI" },
      { property: "og:description", content: "Raise and track a UPI complaint in a few taps." },
    ],
  }),
  component: Complaint,
});

const issues = [
  "Goods / services not provided",
  "Credit not processed for cancelled/returned goods",
  "Account debited but no merchant confirmation",
  "Paid by alternate means / duplicate payment",
];

function Complaint() {
  const [step, setStep] = useState<"issue" | "proof" | "done">("issue");
  const [issue, setIssue] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader showMenu />
          <div className="flex items-center gap-3 px-4 pb-4">
            <button
              onClick={() => (step === "issue" ? navigate({ to: "/transactions" }) : setStep("issue"))}
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-[15px] font-bold">Raise a complaint</h1>
              <p className="text-[11px] text-muted-foreground">Merchant ABC . ₹00</p>
            </div>
          </div>
        </div>

        <Screen className="px-4 pt-4 pb-6">
          {step !== "done" && (
            <div className="rounded-xl bg-surface p-3">
              <p className="text-[12px] font-semibold">What issue are you facing?</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Select the most relevant option below to raise your complaint.
              </p>
            </div>
          )}

          {step === "issue" && (
            <div className="mt-3 space-y-2">
              {issues.map((label, i) => (
                <button
                  key={label}
                  onClick={() => {
                    setIssue(label);
                    setStep("proof");
                  }}
                  className="card-soft flex w-full items-center gap-3 px-3 py-3 text-left"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-[11px] font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-[12px] leading-tight">{label}</span>
                </button>
              ))}
              <div className="flex gap-3 pt-1 text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <ThumbsDown className="h-4 w-4" />
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-[12px] text-muted-foreground">
                  Ask the AI assistant...
                </span>
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary">
                  <Send className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              </div>
            </div>
          )}

          {step === "proof" && (
            <div className="mt-3">
              <div className="rounded-lg bg-surface px-3 py-2 text-center text-[12px]">{issue}</div>
              <p className="mt-4 text-[12px] font-semibold">Do you have any supporting proofs?</p>
              <button
                onClick={() => setStep("done")}
                className="mt-2 rounded-full border border-border px-4 py-1.5 text-[12px] font-medium"
              >
                Skip
              </button>
              <p className="mt-4 text-[11px] text-muted-foreground">You can upload below documents</p>
              <div className="mt-2 space-y-2">
                {["PAYMENT CONFIRMATION", "ORDER STATUS"].map((d) => (
                  <div key={d} className="card-soft flex items-center gap-3 px-3 py-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-[11px] font-semibold tracking-wide">{d}</span>
                    <button
                      onClick={() => setStep("done")}
                      className="rounded-full border border-border px-3 py-1 text-[11px]"
                    >
                      Upload +
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-3 text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <ThumbsDown className="h-4 w-4" />
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="mt-1">
              <div className="rounded-lg bg-surface px-3 py-2 text-[12px]">
                I didn&apos;t receive good/services that I paid for
              </div>
              <p className="mt-5 flex items-center gap-2 text-[14px] font-semibold">
                <Check className="h-4 w-4 text-success" /> Complaint raised successfully
              </p>
              <dl className="mt-4 space-y-3 text-[12px]">
                <Row k="Ticket No :" v="UPI762372622761527" />
                <Row k="Merchant :" v="Uber india systems private limited" />
                <Row k="Amount :" v="360.32" />
                <Row k="Reason :" v="amount debited but no merchant confirmation" />
              </dl>
              <p className="mt-5 text-center text-[12px]">
                You can also track this Ticket No (CRN No) with your Bank.
              </p>
              <Link
                to="/complaints"
                className="mt-4 block rounded-lg bg-primary py-3 text-center text-[13px] font-semibold text-primary-foreground"
              >
                Track Complaint
              </Link>
              <div className="mt-3 flex gap-3 text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <ThumbsDown className="h-4 w-4" />
              </div>
            </div>
          )}
        </Screen>
      </div>
    </PhoneFrame>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
