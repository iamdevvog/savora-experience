import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Search, Sparkles, Star, X, GitCompareArrows } from "lucide-react";
import { ALL_TAGS, DISHES, type Dish, type Tag } from "@/data/menu";

export function MenuExplorer() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Tag[]>([]);
  const [open, setOpen] = useState<Dish | null>(null);
  const [compare, setCompare] = useState<Dish[]>([]);

  const toggle = (t: Tag) =>
    setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));

  const filtered = useMemo(() => {
    return DISHES.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
      const matchT = active.length === 0 || active.every((t) => d.tags.includes(t));
      return matchQ && matchT;
    });
  }, [query, active]);

  const aiPick = useMemo(() => {
    // tiny "AI" rec: highest-rated dish matching filters/query
    const pool = filtered.length ? filtered : DISHES;
    return [...pool].sort((a, b) => b.rating - a.rating)[0];
  }, [filtered]);

  const addCompare = (d: Dish) => {
    setCompare((c) => {
      if (c.find((x) => x.id === d.id)) return c.filter((x) => x.id !== d.id);
      if (c.length >= 2) return [c[1], d];
      return [...c, d];
    });
  };

  return (
    <section id="menu" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Smart Menu Explorer"
          title="Curated by the chef, picked by you"
          subtitle="Search, filter, and compare. Let our AI recommend a dish that fits your mood."
        />

        {/* Search + filters */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, ingredients, allergens..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="glass flex items-center gap-2 rounded-full px-3 py-2">
            <Sparkles className="ml-2 h-4 w-4 text-gold" />
            <span className="text-xs text-muted-foreground">AI picks: </span>
            <span className="truncate text-sm text-foreground">{aiPick?.name}</span>
            <button
              onClick={() => setOpen(aiPick)}
              className="btn-outline-gold ml-2 rounded-full px-3 py-1.5 text-xs"
            >
              See dish
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {ALL_TAGS.map((t) => {
            const isActive = active.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`rounded-full px-4 py-1.5 text-xs transition-all ${
                  isActive
                    ? "btn-gold font-semibold"
                    : "border border-[color:var(--border)] text-muted-foreground hover:text-gold hover:border-[color:var(--gold)]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <motion.article
                layout
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group glass relative overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    width={900}
                    height={675}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    {d.tags.includes("Chef's Special") && (
                      <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--primary-foreground)]">
                        Chef's Special
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addCompare(d)}
                    aria-label="Add to compare"
                    className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full transition-all ${
                      compare.find((x) => x.id === d.id)
                        ? "btn-gold"
                        : "glass-strong text-gold hover:text-foreground"
                    }`}
                  >
                    <GitCompareArrows className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl">{d.name}</h3>
                    <span className="text-gold font-semibold">₹{d.price}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-gold">
                      <Star className="h-3.5 w-3.5 fill-current" /> {d.rating}
                    </span>
                    {d.spicy > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-muted-foreground">
                        {Array.from({ length: d.spicy }).map((_, i) => (
                          <Flame key={i} className="h-3 w-3 text-[color:var(--gold)]" />
                        ))}
                      </span>
                    )}
                    <button
                      onClick={() => setOpen(d)}
                      className="text-gold underline-offset-4 hover:underline"
                    >
                      View details →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">No dishes match your filters.</div>
        )}
      </div>

      {/* Compare floating panel */}
      <AnimatePresence>
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl"
          >
            <div className="glass-strong flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <GitCompareArrows className="h-4 w-4 text-gold" />
                {compare.map((c) => c.name).join("  vs  ")}
                {compare.length === 1 && <span className="text-muted-foreground">— pick one more</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCompare([])} className="text-xs text-muted-foreground hover:text-foreground">
                  Clear
                </button>
                {compare.length === 2 && (
                  <button
                    onClick={() => setOpen({ ...compare[0], id: "__compare__" } as Dish)}
                    className="btn-gold rounded-full px-4 py-1.5 text-xs font-semibold"
                  >
                    Compare
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <DishModal
            dish={open.id === "__compare__" ? null : open}
            compare={open.id === "__compare__" ? compare : null}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function DishModal({ dish, compare, onClose }: { dish: Dish | null; compare: Dish[] | null; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full glass-strong">
          <X className="h-4 w-4" />
        </button>
        {dish && <DishDetails dish={dish} />}
        {compare && (
          <div className="p-8">
            <h3 className="font-display text-3xl">Comparison</h3>
            <div className="hairline my-4" />
            <div className="grid grid-cols-2 gap-6">
              {compare.map((d) => (
                <div key={d.id}>
                  <img src={d.image} alt={d.name} className="aspect-square w-full rounded-2xl object-cover" />
                  <h4 className="font-display mt-3 text-2xl">{d.name}</h4>
                  <Row label="Price" value={`₹${d.price}`} />
                  <Row label="Calories" value={`${d.calories} kcal`} />
                  <Row label="Rating" value={`${d.rating} ★`} />
                  <Row label="Ingredients" value={d.ingredients.join(", ")} />
                  <Row label="Allergens" value={d.allergens.length ? d.allergens.join(", ") : "None"} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function DishDetails({ dish }: { dish: Dish }) {
  return (
    <div className="grid gap-0 md:grid-cols-2">
      <img src={dish.image} alt={dish.name} className="size-full max-h-[60vh] object-cover" />
      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-4xl">{dish.name}</h3>
          <span className="text-gold font-display text-3xl">₹{dish.price}</span>
        </div>
        <p className="mt-3 text-muted-foreground">{dish.description}</p>
        <div className="hairline my-5" />
        <Row label="Calories" value={`${dish.calories} kcal`} />
        <Row label="Rating" value={`${dish.rating} ★`} />
        <Row label="Ingredients" value={dish.ingredients.join(", ")} />
        <Row label="Allergens" value={dish.allergens.length ? dish.allergens.join(", ") : "None"} />
        <div className="mt-2 flex flex-wrap gap-2 pt-2">
          {dish.tags.map((t) => (
            <span key={t} className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <button className="btn-gold mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold">
          Add to Order
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</div>
      <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
      <div className="hairline mx-auto mt-6 max-w-xs" />
    </motion.div>
  );
}