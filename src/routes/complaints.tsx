import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Info, Menu, Star } from "lucide-react";
import { MyUpiLogo, PhoneFrame, Screen, StatusBar, BankAvatar } from "@/components/phone";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "My Complaints — MyUPI" },
      {
        name: "description",
        content:
          "Track your UPI complaint status step by step, from raised to resolution, and rate your experience.",
      },
      { property: "og:title", content: "My Complaints — MyUPI" },
      { property: "og:description", content: "Follow every stage of your complaint resolution." },
    ],
  }),
  component: Complaints,
});

const steps = [
  {
    title: "Complaint Raised",
    note: "We have received your complaint and shared it with your bank for review",
  },
  {
    title: "Your Bank Review",
    note: "Your bank has completed its review and forwarded your complaint to the beneficiary bank",
  },
  {
    title: "Beneficiary Bank Review",
    note: "The beneficiary bank has accepted your complaint.",
  },
  { title: "Complaint Resolution", note: "Your refund is being processed." },
];

function Complaints() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <StatusBar />
          <div className="flex items-center justify-between px-4 pt-1 pb-2">
            <Menu className="h-5 w-5" />
            <MyUpiLogo />
          </div>
          <div className="flex items-center gap-3 px-4 pb-4">
            <button onClick={() => navigate({ to: "/complaint" })} aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h1 className="text-[15px] font-semibold">My Complaints</h1>
          </div>
        </div>

        <Screen className="px-4 pt-4 pb-8">
          <section className="card-soft p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-bold">Netflix</p>
                <p className="text-[10px] text-muted-foreground">Complaint : #867327648237</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Status</p>
                <span className="mt-1 inline-block rounded bg-accent px-2 py-0.5 text-[9px] font-semibold tracking-wide text-info">
                  UNDER REVIEW
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-y-3 text-[11px]">
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium">₹3,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Transaction date</p>
                <p className="font-medium">11th June 26, 5:00pm</p>
              </div>
              <div>
                <p className="text-muted-foreground">Debited from</p>
                <p className="flex items-center gap-1.5 font-medium">
                  <BankAvatar name="SBI Bank" /> SBI Bank
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Transaction id</p>
                <p className="font-medium">652326749278</p>
              </div>
            </div>
          </section>

          <div className="mt-3 rounded-xl bg-accent p-3 text-[11px]">
            <p className="text-muted-foreground">Reason</p>
            <p className="font-medium">Account debited but no merchant confirmation</p>
            <p className="mt-2 text-muted-foreground">Raised on</p>
            <p className="font-medium">11th June 26, 5:00pm</p>
          </div>

          <h2 className="mt-5 text-[13px] font-semibold">Status</h2>
          <ol className="mt-3 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3">
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  {i < steps.length - 1 && <span className="mt-1 w-px flex-1 bg-success/40" />}
                </div>
                <div>
                  <p className="text-[12px] font-semibold">{s.title}</p>
                  <p className="text-[10px] text-muted-foreground">23rd July 2027</p>
                  <p className="mt-2 flex gap-2 rounded-lg bg-surface p-2 text-[10px] leading-relaxed text-muted-foreground">
                    <Info className="mt-px h-3 w-3 shrink-0" />
                    {s.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <p className="text-[12px] font-semibold">Rate your experience</p>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} aria-label={`Rate ${n}`}>
                  <Star
                    className={`h-6 w-6 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-4 text-[12px] font-semibold">Your feedback</p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value.slice(0, 600))}
              placeholder="Share your experience..."
              className="mt-2 h-24 w-full resize-none rounded-xl border border-border bg-card p-3 text-[12px] outline-none focus:ring-2 focus:ring-ring/40"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                {feedback.trim() ? feedback.trim().split(/\s+/).length : 0}/100 words
              </span>
              <button
                disabled={!rating}
                className="rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground disabled:opacity-50"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </Screen>
      </div>
    </PhoneFrame>
  );
}
