import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Search, Send } from "lucide-react";
import { AppHeader, PhoneFrame, Screen } from "@/components/phone";

export const Route = createFileRoute("/ask-ai")({
  head: () => ({
    meta: [
      { title: "Ask AI — MyUPI" },
      {
        name: "description",
        content: "Chat with the MyUPI assistant to do anything in the app just by asking.",
      },
      { property: "og:title", content: "Ask AI — MyUPI" },
      { property: "og:description", content: "Do anything in the app just by chatting." },
    ],
  }),
  component: AskAI,
});

const suggestions = [
  "Show my last 5 transactions",
  "Pause a recurring mandate",
  "Check if a UPI ID is safe",
  "Raise a complaint for a payment",
];

function AskAI() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="phone-header">
          <AppHeader backTo="/upi-help" />
          <div className="px-4 pb-5">
            <h1 className="text-[17px] font-bold">Ask AI</h1>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Do anything in the app just by chatting.
            </p>
          </div>
        </div>
        <Screen className="px-4 pt-4">
          <div className="space-y-2">
            {suggestions.map((s) => (
              <div key={s} className="card-soft px-3 py-3 text-[12px]">
                {s}
              </div>
            ))}
          </div>
        </Screen>
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-[12px] text-muted-foreground">Ask the AI assistant...</span>
            <Paperclip className="h-4 w-4 text-muted-foreground" />
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary">
              <Send className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
