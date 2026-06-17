import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { DISHES } from "@/data/menu";
import { Eyebrow } from "./StorySections";

export function EmberMenu() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="menu" className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow>Chapter 04 · The Menu</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Each plate, <span className="gold-gradient-text italic">a small ritual.</span>
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1600 }}>
          {DISHES.map((d, i) => (
            <MenuCard
              key={d.id}
              dish={d}
              index={i}
              hovered={hover === d.id}
              onEnter={() => setHover(d.id)}
              onLeave={() => setHover(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({
  dish, index, hovered, onEnter, onLeave,
}: {
  dish: typeof DISHES[number]; index: number; hovered: boolean; onEnter: () => void; onLeave: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ y: -12, rotateX: 4, rotateY: -4 }}
      data-cursor
      className="glass-strong relative cursor-pointer overflow-visible rounded-3xl p-5"
      style={{ transformStyle: "preserve-3d", boxShadow: "var(--shadow-elev)" }}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ transform: "translateZ(40px)" }}>
        <img src={dish.image} alt={dish.name} loading="lazy" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />

        {/* orbiting ingredients */}
        <AnimatePresence>
          {hovered &&
            dish.ingredients.slice(0, 5).map((ing, i) => {
              const angle = (i / 5) * Math.PI * 2;
              return (
                <motion.div
                  key={ing}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: Math.cos(angle) * 120,
                    y: Math.sin(angle) * 120,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="absolute left-1/2 top-1/2 -ml-12 -mt-4 whitespace-nowrap rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-wider"
                >
                  {ing}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
      <div className="mt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl">{dish.name}</h3>
          <span className="text-[color:var(--ember)] font-semibold">₹{dish.price}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{dish.description}</p>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="hairline my-3" />
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider">
                <Stat label="Cal" value={dish.calories.toString()} />
                <Stat label="Rating" value={`${dish.rating}★`} />
                <Stat label="Spice" value={dish.spicy > 0 ? "Mild" : "—"} />
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-2xl border border-[color:var(--border)] p-3 text-xs text-muted-foreground">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--ember)]" />
                Chef recommends pairing with our cellar-aged Pinot Noir.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-[color:var(--ember)]">
            <Star className="h-3 w-3 fill-current" /> {dish.rating}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{dish.tags[0]}</span>
        </div>
      </div>
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] py-2">
      <div className="font-display text-base text-[color:var(--ember)]">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}