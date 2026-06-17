import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DISHES } from "@/data/menu";
import { Eyebrow } from "./StorySections";

type Mood = "Romantic" | "Adventurous" | "Comforting" | "Celebratory";

export function DishFinder() {
  const [budget, setBudget] = useState(1500);
  const [appetite, setAppetite] = useState<"Light" | "Hearty" | "Feast">("Hearty");
  const [diet, setDiet] = useState<"Any" | "Vegetarian" | "Vegan">("Any");
  const [mood, setMood] = useState<Mood>("Romantic");
  const [spice, setSpice] = useState(1);
  const [reveal, setReveal] = useState(false);

  const pick = useMemo(() => {
    let pool = DISHES.filter((d) => d.price <= budget);
    if (diet === "Vegetarian") pool = pool.filter((d) => d.tags.includes("Vegetarian") || d.tags.includes("Vegan"));
    if (diet === "Vegan") pool = pool.filter((d) => d.tags.includes("Vegan"));
    if (appetite === "Light") pool = pool.filter((d) => d.calories <= 500);
    if (appetite === "Feast") pool = pool.filter((d) => d.calories >= 500);
    pool = pool.filter((d) => d.spicy <= spice);
    if (!pool.length) pool = DISHES;
    const moodBias: Record<Mood, string[]> = {
      Romantic: ["scallops", "lava"],
      Adventurous: ["duck", "wagyu"],
      Comforting: ["risotto", "burrata"],
      Celebratory: ["wagyu", "scallops"],
    };
    const bias = moodBias[mood];
    return [...pool].sort((a, b) => bias.indexOf(b.id) - bias.indexOf(a.id) || b.rating - a.rating)[0];
  }, [budget, appetite, diet, mood, spice]);

  return (
    <section className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow icon={<Sparkles className="h-3.5 w-3.5" />}>Find My Perfect Dish</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Tell us your mood. <span className="gold-gradient-text italic">We'll do the rest.</span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass-strong rounded-3xl p-6 lg:p-8">
            <Group label={`Budget · ₹${budget}`}>
              <input
                type="range" min={500} max={2500} step={100} value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[color:var(--ember)]"
              />
            </Group>
            <Group label="Appetite">
              <Chips value={appetite} onChange={setAppetite} options={["Light", "Hearty", "Feast"] as const} />
            </Group>
            <Group label="Diet">
              <Chips value={diet} onChange={setDiet} options={["Any", "Vegetarian", "Vegan"] as const} />
            </Group>
            <Group label="Mood">
              <Chips value={mood} onChange={setMood} options={["Romantic", "Adventurous", "Comforting", "Celebratory"] as const} />
            </Group>
            <Group label={`Spice · ${["None", "Mild", "Medium", "Hot"][spice]}`}>
              <input
                type="range" min={0} max={3} step={1} value={spice}
                onChange={(e) => setSpice(Number(e.target.value))}
                className="w-full accent-[color:var(--ember)]"
              />
            </Group>
            <button
              onClick={() => setReveal(true)}
              className="btn-gold mt-2 w-full rounded-full px-6 py-3.5 text-sm font-semibold"
              data-cursor
            >
              Reveal My Dish
            </button>
          </div>

          <div className="glass relative min-h-[420px] overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              {!reveal ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid h-full place-items-center p-10 text-center text-muted-foreground"
                >
                  <div>
                    <Sparkles className="mx-auto h-8 w-8 text-[color:var(--ember)]" />
                    <p className="mt-3 text-sm">Adjust your taste profile, then reveal.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={pick.id}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-full"
                >
                  <img src={pick.image} alt={pick.name} className="absolute inset-0 size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
                  <div className="relative flex h-full flex-col justify-end p-8">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--ember)]">For your mood: {mood}</div>
                    <h3 className="font-display mt-2 text-4xl">{pick.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">{pick.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <span className="text-[color:var(--ember)] font-semibold">₹{pick.price}</span>
                      <span className="text-muted-foreground">{pick.calories} kcal</span>
                      <span className="text-muted-foreground">★ {pick.rating}</span>
                    </div>
                    <button className="btn-gold mt-5 w-fit rounded-full px-6 py-2.5 text-xs font-semibold">Add to Order</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function Chips<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: readonly T[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full px-4 py-1.5 text-xs transition-all ${
            value === o ? "btn-gold font-semibold" : "border border-[color:var(--border)] text-muted-foreground hover:text-[color:var(--ember)]"
          }`}
          data-cursor
        >
          {o}
        </button>
      ))}
    </div>
  );
}