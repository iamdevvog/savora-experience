import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Cake, Heart } from "lucide-react";
import { Eyebrow } from "./StorySections";

type Table = { id: string; seats: number; loc: "Window" | "Center" | "Private"; available: boolean; x: number; y: number };

const TABLES: Table[] = [
  { id: "W1", seats: 2, loc: "Window", available: true, x: 8, y: 18 },
  { id: "W2", seats: 2, loc: "Window", available: false, x: 8, y: 42 },
  { id: "W3", seats: 2, loc: "Window", available: true, x: 8, y: 66 },
  { id: "C1", seats: 4, loc: "Center", available: true, x: 38, y: 28 },
  { id: "C2", seats: 4, loc: "Center", available: true, x: 38, y: 60 },
  { id: "C3", seats: 6, loc: "Center", available: false, x: 60, y: 44 },
  { id: "P1", seats: 8, loc: "Private", available: true, x: 85, y: 28 },
  { id: "P2", seats: 10, loc: "Private", available: true, x: 85, y: 64 },
];

export function EmberReservation() {
  const [table, setTable] = useState<string | null>("C1");
  const [filter, setFilter] = useState<"All" | Table["loc"]>("All");
  const [occasion, setOccasion] = useState<"None" | "Birthday" | "Anniversary">("None");
  const visible = TABLES.filter((t) => filter === "All" || t.loc === filter);

  return (
    <section id="reserve" className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow>Chapter 05 · Your Seat</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Pick your seat by the <span className="gold-gradient-text italic">fire.</span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* 3D floor map */}
          <div className="glass-strong relative rounded-3xl p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {(["All", "Window", "Center", "Private"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-xs ${
                    filter === f ? "btn-gold font-semibold" : "border border-[color:var(--border)] text-muted-foreground hover:text-[color:var(--ember)]"
                  }`}
                  data-cursor
                >
                  {f}
                </button>
              ))}
            </div>
            <div
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[color:var(--border)]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, oklch(0.22 0.05 50 / 0.7), transparent 60%), linear-gradient(180deg, oklch(0.14 0.02 40), oklch(0.1 0.02 40))",
                perspective: 1200,
              }}
            >
              {/* floor grid in 3D */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  transform: "rotateX(55deg) translateY(-10%)",
                  backgroundImage:
                    "linear-gradient(oklch(0.78 0.18 55 / 0.25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.18 55 / 0.25) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* window line */}
              <div className="absolute inset-y-4 left-2 w-1 rounded bg-[color:var(--ember)]/40" />
              <div className="absolute left-3 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Window</div>
              <div className="absolute right-3 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Private</div>
              <div className="absolute inset-x-0 bottom-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">Entrance · Wood-fire hearth</div>

              {visible.map((t) => {
                const selected = table === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => t.available && setTable(t.id)}
                    disabled={!t.available}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    data-cursor
                    className={`absolute -ml-7 -mt-7 grid h-14 w-14 place-items-center rounded-2xl text-xs transition-all ${
                      selected
                        ? "scale-110 border border-[color:var(--ember)] bg-[color:color-mix(in_oklab,var(--ember)_30%,transparent)] shadow-[0_0_24px_var(--ember)]"
                        : t.available
                        ? "border border-[color:var(--border)] bg-[color:color-mix(in_oklab,var(--surface-elev)_90%,transparent)] hover:border-[color:var(--ember)]"
                        : "cursor-not-allowed border border-dashed border-[color:var(--border)] opacity-40"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-display text-sm text-[color:var(--ember)]">{t.id}</div>
                      <div className="flex items-center justify-center gap-0.5 text-[10px] text-muted-foreground">
                        <Users className="h-2.5 w-2.5" /> {t.seats}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
            className="glass-strong rounded-3xl p-6 lg:p-8"
          >
            <h3 className="font-display text-2xl">Confirm your evening</h3>
            <p className="mt-1 text-sm text-muted-foreground">Table <span className="text-[color:var(--ember)]">{table ?? "—"}</span> selected. Instant confirmation.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <label className="block">
                <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Date</div>
                <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="input" />
              </label>
              <label className="block">
                <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Time</div>
                <select className="input" defaultValue="20:00">
                  {["19:00", "19:30", "20:00", "20:30", "21:00"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            </div>

            <div className="mt-3">
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Occasion</div>
              <div className="flex flex-wrap gap-2">
                {(["None", "Birthday", "Anniversary"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs ${
                      occasion === o ? "btn-gold font-semibold" : "border border-[color:var(--border)] text-muted-foreground hover:text-[color:var(--ember)]"
                    }`}
                    data-cursor
                  >
                    {o === "Birthday" && <Cake className="h-3 w-3" />}
                    {o === "Anniversary" && <Heart className="h-3 w-3" />}
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <input placeholder="Full name" className="input" />
              <input placeholder="Phone" className="input" />
            </div>

            <button className="btn-gold mt-6 w-full rounded-full px-6 py-3.5 text-sm font-semibold" data-cursor>
              Reserve Now
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}