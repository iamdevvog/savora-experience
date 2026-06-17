import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Cake, Heart, Users, Sun, Moon } from "lucide-react";
import { SectionHeading } from "./MenuExplorer";

type Table = { id: string; seats: number; loc: "Window" | "Center" | "Patio" | "Private"; available: boolean };

const TABLES: Table[] = [
  { id: "T1", seats: 2, loc: "Window", available: true },
  { id: "T2", seats: 2, loc: "Window", available: false },
  { id: "T3", seats: 4, loc: "Center", available: true },
  { id: "T4", seats: 4, loc: "Center", available: true },
  { id: "T5", seats: 6, loc: "Center", available: false },
  { id: "T6", seats: 4, loc: "Patio", available: true },
  { id: "T7", seats: 2, loc: "Patio", available: true },
  { id: "T8", seats: 8, loc: "Private", available: true },
];

const TIMES = ["12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

export function Reservation() {
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("20:00");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [table, setTable] = useState<string | null>("T3");
  const [occasion, setOccasion] = useState<"None" | "Birthday" | "Anniversary">("None");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="reserve" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reservations"
          title="Choose your table, set the mood"
          subtitle="Real-time availability. Window seats, private rooms, birthdays — we've got it all."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Floor map */}
          <div className="glass relative overflow-hidden rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">Floor map</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Legend color="var(--gold)" label="Selected" />
                <Legend color="color-mix(in oklab, var(--gold) 40%, transparent)" label="Available" />
                <Legend color="color-mix(in oklab, var(--foreground) 15%, transparent)" label="Booked" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
              {TABLES.map((t) => {
                const selected = table === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => t.available && setTable(t.id)}
                    disabled={!t.available}
                    className={`relative aspect-square rounded-2xl border text-left text-xs transition-all ${
                      selected
                        ? "border-[color:var(--gold)] bg-[color:color-mix(in_oklab,var(--gold)_18%,transparent)]"
                        : t.available
                        ? "border-[color:var(--border)] hover:border-[color:var(--gold)] hover:bg-[color:color-mix(in_oklab,var(--gold)_8%,transparent)]"
                        : "cursor-not-allowed border-dashed border-[color:var(--border)] opacity-40"
                    }`}
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="font-display text-xl text-gold">{t.id}</div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-muted-foreground">
                          <Users className="h-3 w-3" /> {t.seats}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1 left-1 right-1 truncate text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t.loc}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[color:var(--border)] p-4 text-sm">
              <div className="flex items-center gap-2">
                <Cake className="h-4 w-4 text-gold" />
                <span className="text-muted-foreground">No table for your party? </span>
              </div>
              <button className="btn-outline-gold rounded-full px-4 py-2 text-xs">
                Join the waitlist · ~22 min
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="glass-strong rounded-3xl p-6 lg:p-8"
          >
            <h3 className="font-display text-2xl">Reserve in 30 seconds</h3>
            <p className="mt-1 text-sm text-muted-foreground">Instant confirmation by email & WhatsApp.</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Field label="Date" icon={<Calendar className="h-4 w-4" />}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
              </Field>
              <Field label="Guests" icon={<Users className="h-4 w-4" />}>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="input">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Time</div>
              <div className="grid grid-cols-4 gap-2">
                {TIMES.map((t) => {
                  const isEve = Number(t.split(":")[0]) >= 18;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTime(t)}
                      className={`inline-flex items-center justify-center gap-1 rounded-full px-2 py-2 text-xs transition ${
                        time === t
                          ? "btn-gold font-semibold"
                          : "border border-[color:var(--border)] text-muted-foreground hover:text-gold"
                      }`}
                    >
                      {isEve ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />} {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Occasion</div>
              <div className="flex flex-wrap gap-2">
                {(["None", "Birthday", "Anniversary"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs ${
                      occasion === o
                        ? "btn-gold font-semibold"
                        : "border border-[color:var(--border)] text-muted-foreground hover:text-gold"
                    }`}
                  >
                    {o === "Birthday" && <Cake className="h-3 w-3" />}
                    {o === "Anniversary" && <Heart className="h-3 w-3" />}
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Field label="Name">
                <input required placeholder="Your full name" className="input" />
              </Field>
              <Field label="Phone">
                <input required placeholder="+91 98765 43210" className="input" />
              </Field>
            </div>

            <div className="mt-6 rounded-2xl border border-[color:var(--border)] p-3 text-xs text-muted-foreground">
              Table <span className="text-gold">{table ?? "—"}</span> · {guests} guests · {date} at {time}
            </div>

            <button type="submit" className="btn-gold mt-6 w-full rounded-full px-6 py-3.5 text-sm font-semibold">
              {submitted ? "Reserved ✓ — confirmation sent" : "Confirm Reservation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      {children}
    </label>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}