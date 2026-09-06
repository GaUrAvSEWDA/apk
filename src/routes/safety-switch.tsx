import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AppHeader, BankAvatar, BottomSheet, MyUpiLogo, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/safety-switch")({
  head: () => ({
    meta: [
      { title: "Emergency Safety Switch — MyUPI" },
      {
        name: "description",
        content:
          "Temporarily stop UPI payments from selected bank accounts if you think someone has unauthorized access.",
      },
      { property: "og:title", content: "Emergency Safety Switch — MyUPI" },
      { property: "og:description", content: "Pause outgoing UPI debits in an emergency." },
    ],
  }),
  component: SafetySwitch,
});

const facts = [
  {
    n: "01",
    t: "Only your bank can undo it",
    d: "We can pause it. Your bank has to resume it  you'll need to raise the request with them.",
  },
  {
    n: "02",
    t: "Every debit stops, auto-pay too",
    d: "Mandates for EMIs, insurance, SIPs and subscriptions will fail. A missed EMI hits your credit score, a missed premium can lapse your policy.",
  },
  {
    n: "03",
    t: "This stops UPI, not the account",
    d: "Pausing UPI doesn't secure the account itself — it stays open in every other way.",
  },
];

const accounts = [
  { name: "Axis Bank", num: "XX-8953" },
  { name: "Central Bank Of India", num: "XX-8953" },
  { name: "Bandhan Bank", num: "XX-1253" },
];

type Stage = "select" | "disclaimer" | "otp" | "paused";

function SafetySwitch() {
  const [stage, setStage] = useState<Stage>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (stage !== "otp") return;
    setSeconds(60);
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [stage]);

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  const otpFull = otp.every((d) => d !== "");
  const pausedBank = selected[0] ?? "Axis Bank";

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader backTo="/upi-help" />
          <div className="flex items-start gap-3 px-4 pb-5">
            <div className="min-w-0 flex-1">
              <h1 className="text-[15px] font-bold">Emergency Safety Switch</h1>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Temporarily stop UPI payments from selected bank accounts if you think someone has
                unauthorized access
              </p>
            </div>
            <span className="text-4xl">🏛️</span>
          </div>
        </div>

        <Screen className="pb-2">
          <section className="mx-4 mt-3 rounded-xl bg-surface p-3">
            <h2 className="text-[12px] font-bold">4 Things you should know before you pause</h2>
            <ul className="mt-3 space-y-3">
              {facts.map((f) => (
                <li key={f.n} className="grid grid-cols-[24px_minmax(0,1fr)] gap-2">
                  <span className="text-[11px] font-bold text-info">{f.n}</span>
                  <span>
                    <span className="block text-[11px] font-semibold">{f.t}</span>
                    <span className="block text-[10px] leading-relaxed text-muted-foreground">
                      {f.d}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-center gap-2 border-t border-border pt-3 text-[11px] font-medium">
              More details
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary">
                <ArrowRight className="h-2.5 w-2.5 text-primary-foreground" />
              </span>
            </div>
          </section>

          <div className="mt-4 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[12px] font-semibold">Choose accounts to stop</h2>
              <button
                onClick={() =>
                  setSelected(selected.length === accounts.length ? [] : accounts.map((a) => a.name))
                }
                className="flex items-center gap-1.5 text-[11px] font-medium text-primary"
              >
                <span
                  className={`grid h-3.5 w-3.5 place-items-center rounded-[3px] border ${
                    selected.length === accounts.length
                      ? "border-primary bg-primary text-[9px] text-primary-foreground"
                      : "border-primary"
                  }`}
                >
                  {selected.length === accounts.length ? "✓" : ""}
                </span>
                Select all
              </button>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Note: Only banks live for this feature are visible here
            </p>

            <div className="mt-3 space-y-2">
              {accounts.map((a) => {
                const on = selected.includes(a.name);
                return (
                  <button
                    key={a.name}
                    onClick={() => toggle(a.name)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                      on ? "border-info/40 bg-accent" : "border-border bg-card"
                    }`}
                  >
                    <BankAvatar name={a.name} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold">{a.name}</span>
                      <span className="block text-[10px] text-muted-foreground">{a.num}</span>
                    </span>
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border text-[10px] ${
                        on
                          ? "border-foreground bg-foreground text-background"
                          : "border-muted-foreground/50"
                      }`}
                    >
                      {on ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="h-4" />
        </Screen>

        <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 pb-5">
          <div>
            <p className="text-[11px]">
              Selected :{" "}
              <span className="font-semibold text-primary">
                {selected.length} {selected.length === 1 ? "Accounts" : "accounts"}
              </span>
            </p>
            <p className="text-[10px] text-muted-foreground">At least one account is required</p>
          </div>
          <button
            disabled={selected.length === 0}
            onClick={() => setStage("disclaimer")}
            className="rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
          >
            Pause UPI Payments
          </button>
        </div>
      </div>

      <BottomSheet open={stage === "disclaimer"} onClose={() => setStage("select")}>
        <div className="flex items-center gap-3">
          <BankAvatar name={pausedBank} />
          <div>
            <p className="text-[14px] font-semibold">{pausedBank}</p>
            <p className="text-[11px] text-muted-foreground">XX53</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border p-3 text-[9.5px] leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Disclaimer</p>
          <p className="mt-1">
            1. This will pause outgoing UPI payments (debits), on the account(s) you have selected.
            Incoming payments (credits) shall continue to work as usual. Your UPI profile is not
            blocked or deactivated.
          </p>
          <p>
            2. Certain UPI debits will be allowed, in line with settlement obligations like IPO
            (Initial Public Offering), SBMD (Single Block Multiple Debits), and Retail Direct Scheme
            payments.
          </p>
          <p>
            3. This works on a best-effort basis. If you suspect your account is compromised, please
            contact your bank immediately.
          </p>
          <p>
            4. UPI Payments cannot be re-enabled from UPI Help. To resume debits, you must contact
            your bank directly.
          </p>
          <p>
            5. Once an account is re-enabled through your bank, it cannot be stopped again using UPI
            Help for 24 hours.
          </p>
          <p>
            6. This request may take some time to take effect. During this period, UPI Help is not
            liable for any transactions that are processed before the block is applied. Please
            continue to monitor your account.
          </p>
        </div>
        <label className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 accent-[oklch(0.65_0.19_42)]"
          />
          By proceeding, I agree to pause UPI payments (debits only) on the selected account(s).
        </label>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setStage("select")}
            className="rounded-full border border-border py-3 text-[13px] font-semibold"
          >
            Not Now
          </button>
          <button
            disabled={!agree}
            onClick={() => setStage("otp")}
            className="rounded-full bg-primary py-3 text-[13px] font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
          >
            Get OTP
          </button>
        </div>
      </BottomSheet>

      <BottomSheet open={stage === "otp"} onClose={() => setStage("select")}>
        <h3 className="text-[15px] font-semibold">Enter OTP</h3>
        <p className="mt-1 text-[11px] text-muted-foreground">OTP sent on **7452</p>
        <div className="mt-4 flex justify-between gap-2">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setOtp((o) => o.map((x, idx) => (idx === i ? v : x)));
                if (v && i < 5) refs.current[i + 1]?.focus();
              }}
              className="h-11 w-11 rounded-lg border border-border text-center text-[16px] font-semibold outline-none focus:ring-2 focus:ring-ring/40"
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">
            Resend OTP in 0:{String(seconds).padStart(2, "0")}
          </span>
          <button onClick={() => setSeconds(60)} className="font-medium">
            Resend OTP
          </button>
        </div>
        <button
          disabled={!otpFull}
          onClick={() => setStage("paused")}
          className="mt-6 w-full rounded-full bg-primary py-3 text-[14px] font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
        >
          Proceed
        </button>
      </BottomSheet>

      <BottomSheet open={stage === "paused"} className="pt-0">
        <div className="-mx-5 mb-4 flex items-center justify-center rounded-t-3xl bg-gradient-to-r from-[oklch(0.95_0.06_140)] via-[oklch(0.97_0.05_90)] to-[oklch(0.95_0.06_40)] py-2">
          <MyUpiLogo />
        </div>
        <div className="text-center">
          <span className="text-4xl">🏛️</span>
          <h3 className="mt-2 text-[17px] font-bold">UPI Payments Paused</h3>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">{pausedBank} - XX5645</span> account has
            been paused for outgoing UPI payments. Contact your bank directly to enable UPI payments.
          </p>
          <button
            onClick={() => navigate({ to: "/upi-help" })}
            className="mt-5 w-full rounded-full bg-primary py-3 text-[14px] font-semibold text-primary-foreground"
          >
            Okay got it
          </button>
        </div>
      </BottomSheet>
    </PhoneFrame>
  );
}
