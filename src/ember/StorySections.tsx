import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flame, Leaf, Sparkles, Star } from "lucide-react";
import chef from "@/assets/chef.jpg";
import d1 from "@/assets/dish-1.jpg";
import d2 from "@/assets/dish-2.jpg";
import d3 from "@/assets/dish-3.jpg";

export function IngredientAssembly() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ingredients = [
    { emoji: "🌿", label: "Thyme", x: -260, y: -160 },
    { emoji: "🧂", label: "Smoked salt", x: 280, y: -180 },
    { emoji: "🌶", label: "Chili", x: -300, y: 80 },
    { emoji: "🧄", label: "Garlic", x: 260, y: 140 },
    { emoji: "🍋", label: "Citrus", x: -80, y: -260 },
    { emoji: "🍷", label: "Reduction", x: 120, y: 240 },
  ];

  return (
    <section ref={ref} className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow icon={<Leaf className="h-3.5 w-3.5" />}>Chapter 01 · Origin</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Twelve ingredients. <span className="gold-gradient-text italic">One plate.</span>
        </h2>

        <div className="relative mt-24 grid place-items-center">
          <div className="relative h-[420px] w-full max-w-[640px]">
            {ingredients.map((ing, i) => {
              const x = useTransform(scrollYProgress, [0.1, 0.6], [ing.x, 0]);
              const y = useTransform(scrollYProgress, [0.1, 0.6], [ing.y, 0]);
              const opacity = useTransform(scrollYProgress, [0.1, 0.55, 0.7], [1, 1, 0]);
              const scale = useTransform(scrollYProgress, [0.1, 0.6], [1, 0.4]);
              return (
                <motion.div
                  key={i}
                  style={{ x, y, opacity, scale }}
                  className="glass-strong absolute left-1/2 top-1/2 -ml-12 -mt-8 flex items-center gap-2 rounded-full px-4 py-2 text-sm"
                >
                  <span className="text-xl">{ing.emoji}</span>
                  <span className="text-muted-foreground">{ing.label}</span>
                </motion.div>
              );
            })}
            <motion.img
              src={d3}
              alt="Assembled dish"
              loading="lazy"
              style={{
                scale: useTransform(scrollYProgress, [0.4, 0.7], [0.6, 1]),
                opacity: useTransform(scrollYProgress, [0.4, 0.7], [0, 1]),
              }}
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-[var(--shadow-ember)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChefShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow icon={<Flame className="h-3.5 w-3.5" />}>Chapter 02 · The Hand</Eyebrow>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <motion.div className="relative overflow-hidden rounded-[2rem]" style={{ scale }}>
            <motion.img src={chef} alt="Chef plating" loading="lazy" style={{ y }} className="w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
          <div>
            <h2 className="font-display text-4xl sm:text-6xl">
              The fire <span className="gold-gradient-text italic">remembers</span> every hand.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Chef Aarav Mehta cooks the way old languages are spoken — slowly,
              with reverence, and a quiet refusal to compromise. Twenty years
              across three continents, distilled into one quiet kitchen.
            </p>
            <blockquote className="mt-8 border-l-2 border-[color:var(--ember)] pl-5 font-display text-2xl italic text-foreground/90">
              "We don't cook for the plate. We cook for the silence after the first bite."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SignatureCards() {
  const dishes = [
    { img: d1, name: "Ember Wagyu", price: "₹2,400", note: "A5 wagyu, ember-charred, gold leaf." },
    { img: d2, name: "Smoked Risotto", price: "₹1,450", note: "Carnaroli, black truffle, fire-aged butter." },
    { img: d3, name: "Caviar & Flame", price: "₹1,850", note: "Diver scallops, oscietra caviar, brown butter." },
  ];
  return (
    <section className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow icon={<Star className="h-3.5 w-3.5" />}>Chapter 03 · Signatures</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Plates that <span className="gold-gradient-text italic">float</span> in memory.
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3" style={{ perspective: 1500 }}>
          {dishes.map((d, i) => (
            <TiltCard key={d.name} index={i} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ img, name, price, note, index }: { img: string; name: string; price: string; note: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(20px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <div
        ref={ref}
        className="glass-strong relative overflow-hidden rounded-3xl transition-transform duration-300 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={img} alt={name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="flex items-end justify-between">
              <h3 className="font-display text-3xl">{name}</h3>
              <span className="text-[color:var(--ember)] font-semibold">{price}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{note}</p>
          </div>
        </div>
        {/* shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
             style={{ background: "linear-gradient(120deg, transparent 30%, color-mix(in oklab, var(--ember) 30%, transparent) 50%, transparent 70%)" }} />
      </div>
    </motion.div>
  );
}

export function Eyebrow({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[color:var(--ember)]">
      {icon}
      {children}
    </div>
  );
}