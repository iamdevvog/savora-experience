import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "What should I order tonight?",
  "Best dishes under ₹1000",
  "High-protein, gluten-free options",
  "Date-night recommendations",
  "Kid-friendly dishes",
];

function smartReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("kid")) return "For kids, the Heirloom Burrata and Molten Gold Lava are crowd-pleasers — mild, sweet, and beautifully plated.";
  if (s.includes("date")) return "Date-night, hands down: Seared Scallops & Caviar to start, Truffle Wagyu to share, and finish on Molten Gold Lava. Pair with a chilled Sancerre.";
  if (s.includes("protein") || s.includes("gluten")) return "High-protein and gluten-free: Truffle Wagyu (720 kcal) and Smoked Duck Cherry (560 kcal). Both naturally GF.";
  if (s.includes("1000") || s.includes("500") || s.includes("under")) return "Under ₹1000 highlights: Heirloom Burrata (₹780) and Molten Gold Lava (₹690). Light, indulgent, and chef-favorites.";
  if (s.includes("vegan") || s.includes("vegetarian")) return "Vegetarian picks: Black Truffle Risotto and Heirloom Burrata. Let us know if you'd like a fully vegan substitution — chef happily obliges.";
  return "I'd start with the Seared Scallops & Caviar, then the Truffle Wagyu. It's our most-loved pairing, and the chef's quietly proud of both.";
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi, I'm Savora's AI sommelier. Ask me what to order, dietary needs, or pairings — I'll guide you." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: smartReply(text) }]);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI food assistant"
        className="btn-gold fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-gold)]"
      >
        <Sparkles className="h-4 w-4" />
        Ask Savora AI
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass-strong fixed bottom-6 right-6 z-50 flex h-[560px] w-[92vw] max-w-md flex-col overflow-hidden rounded-3xl"
          >
            <header className="flex items-center justify-between border-b border-[color:var(--border)] p-4">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                  <Sparkles className="h-4 w-4 text-[color:var(--primary-foreground)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Savora AI Sommelier</div>
                  <div className="text-[10px] uppercase tracking-wider text-gold">Online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-4 w-4" /></button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "btn-gold font-medium"
                        : "border border-[color:var(--border)] bg-[color:var(--surface-elev)]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-muted-foreground hover:text-gold hover:border-[color:var(--gold)]">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-[color:var(--border)] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about the menu..."
                className="input flex-1"
              />
              <button type="submit" className="btn-gold grid h-10 w-10 place-items-center rounded-full">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}