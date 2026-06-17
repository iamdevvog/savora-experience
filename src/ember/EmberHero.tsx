import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Flame, Star, UtensilsCrossed, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import pasta from "@/assets/best-pasta.png";
import pizza from "@/assets/best-pizza.png";
import burger from "@/assets/best-burger.png";
import { Magnetic } from "./Magnetic";

type Best = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  calories: number;
  badge: string;
  ingredients: { label: string; emoji: string }[];
  chef: string;
};

const BEST: Best[] = [
  {
    id: "pasta",
    name: "Truffle Pasta",
    image: pasta,
    price: 1280,
    rating: 4.9,
    calories: 540,
    badge: "#1 Most Loved",
    chef: "Hand-rolled tagliolini, finished with shaved Alba truffle.",
    ingredients: [
      { label: "Truffle", emoji: "🍄" },
      { label: "Parmesan", emoji: "🧀" },
      { label: "Butter", emoji: "🧈" },
      { label: "Egg yolk", emoji: "🥚" },
      { label: "Black pepper", emoji: "🌶️" },
      { label: "Sea salt", emoji: "🧂" },
    ],
  },
  {
    id: "pizza",
    name: "Wood Fired Pizza",
    image: pizza,
    price: 890,
    rating: 4.8,
    calories: 720,
    badge: "Signature",
    chef: "72-hour cold ferment dough, blistered in a 480°C oak oven.",
    ingredients: [
      { label: "Mozzarella", emoji: "🧀" },
      { label: "Basil", emoji: "🌿" },
      { label: "Tomato", emoji: "🍅" },
      { label: "Olive oil", emoji: "🫒" },
      { label: "Garlic", emoji: "🧄" },
      { label: "Flour", emoji: "🌾" },
    ],
  },
  {
    id: "burger",
    name: "Chef Special Burger",
    image: burger,
    price: 760,
    rating: 4.9,
    calories: 820,
    badge: "Chef's Pick",
    chef: "Dry-aged short rib patty, aged cheddar, brioche brushed with bone-marrow butter.",
    ingredients: [
      { label: "Beef", emoji: "🥩" },
      { label: "Cheddar", emoji: "🧀" },
      { label: "Lettuce", emoji: "🥬" },
      { label: "Tomato", emoji: "🍅" },
      { label: "Onion", emoji: "🧅" },
      { label: "Brioche", emoji: "🍞" },
    ],
  },
];

export function EmberHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const [open, setOpen] = useState<Best | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative z-10 min-h-[100dvh] overflow-hidden pt-28" style={{ perspective: 1800 }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-[color:var(--ember)]"
          >
            <Flame className="h-3.5 w-3.5" />
            Best Sellers · Tonight
          </motion.div>

          <h1 className="font-display mt-6 text-5xl leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
            <WordReveal text="Taste Beyond" />
            <br />
            <span className="gold-gradient-text italic">
              <WordReveal text="Expectations." delay={0.25} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Discover our award-winning signature dishes — floating in the
            quiet glow of our wood-fired tasting room.
          </motion.p>
        </div>

        {/* 3 floating dishes */}
        <div
          className="relative mx-auto mt-16 grid h-[460px] max-w-6xl grid-cols-3 items-center sm:h-[560px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {BEST.map((d, i) => {
            const isCenter = i === 1;
            const offset = i - 1; // -1, 0, 1
            const depthX = useTransform(sx, (v) => v * (isCenter ? 40 : 25));
            const depthY = useTransform(sy, (v) => v * (isCenter ? 30 : 18));
            const rotY = useTransform(sx, (v) => v * (isCenter ? -16 : -10) + offset * 8);
            const rotX = useTransform(sy, (v) => v * 14);
            return (
              <motion.button
                key={d.id}
                type="button"
                data-cursor
                onMouseEnter={() => setHover(d.id)}
                onMouseLeave={() => setHover((h) => (h === d.id ? null : h))}
                onClick={() => setOpen(d)}
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  x: depthX,
                  y: depthY,
                  rotateX: rotX,
                  rotateY: rotY,
                  transformStyle: "preserve-3d",
                  zIndex: isCenter ? 30 : 10,
                }}
                className="group relative mx-auto flex items-center justify-center bg-transparent p-0"
              >
                {/* glow */}
                <motion.div
                  className="absolute inset-6 rounded-full blur-3xl"
                  style={{ background: "var(--gradient-ember)", opacity: isCenter ? 0.55 : 0.35 }}
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 4 + i, repeat: Infinity }}
                />
                {/* floating */}
                <motion.div
                  animate={{ y: [0, isCenter ? -22 : -14, 0] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.img
                    src={d.image}
                    alt={d.name}
                    width={1024}
                    height={1024}
                    fetchPriority={isCenter ? "high" : "low"}
                    className={`relative z-10 drop-shadow-[0_30px_60px_rgba(255,140,40,0.45)] transition-all duration-500 ${
                      isCenter ? "w-[340px] sm:w-[440px]" : "w-[220px] sm:w-[280px] opacity-90"
                    } ${hover === d.id ? "scale-110" : ""}`}
                    style={{ filter: hover === d.id ? "drop-shadow(0 0 40px rgba(255,180,80,0.6))" : undefined }}
                  />
                  {/* reflection */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 top-[88%] h-12 rounded-[50%] blur-xl"
                    style={{ background: "radial-gradient(ellipse, rgba(255,150,40,0.5), transparent 70%)" }}
                  />
                </motion.div>

                {/* floating price tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.15 }}
                  className="glass-strong absolute -top-2 right-2 rounded-full px-3 py-1 text-xs font-semibold text-[color:var(--ember)] sm:right-6"
                  style={{ transform: "translateZ(60px)" }}
                >
                  ₹{d.price}
                </motion.div>
                {/* badge */}
                <div
                  className="glass absolute -bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider sm:left-6"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <Flame className="h-3 w-3 text-[color:var(--ember)]" />
                  {d.badge}
                </div>

                {/* hover panel */}
                <AnimatePresence>
                  {hover === d.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="glass-strong pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 rounded-2xl p-4 text-left"
                      style={{ transform: "translate(-50%, 0) translateZ(80px)" }}
                    >
                      <div className="font-display text-lg">{d.name}</div>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 text-[color:var(--ember)]">
                          <Star className="h-3 w-3 fill-current" /> {d.rating}
                        </span>
                        <span>{d.calories} cal</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{d.chef}</p>
                      <div className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[color:var(--ember)]">
                        <Zap className="h-3 w-3" /> Click to explode
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a href="#reserve" className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
              Reserve a Table
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#menu" className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
              <UtensilsCrossed className="h-4 w-4" />
              Explore Menu
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* DISH EXPLOSION MODAL */}
      <AnimatePresence>{open && <DishExplosion dish={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

function DishExplosion({ dish, onClose }: { dish: Best; onClose: () => void }) {
  const [phase, setPhase] = useState<"explode" | "reassemble">("explode");
  useEffect(() => {
    const t = setTimeout(() => setPhase("reassemble"), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-background/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="glass-strong absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full"
      >
        <X className="h-4 w-4" />
      </button>

      <div
        className="relative h-[80vh] w-full max-w-3xl"
        style={{ perspective: 1600 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* zoom + spin dish */}
        <motion.div
          initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          <motion.div
            className="absolute h-[60%] w-[60%] rounded-full blur-3xl"
            style={{ background: "var(--gradient-ember)", opacity: 0.6 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.img
            src={dish.image}
            alt={dish.name}
            width={1024}
            height={1024}
            className="relative z-10 max-h-[70%] drop-shadow-[0_40px_80px_rgba(255,140,40,0.6)]"
            animate={{ rotate: [0, 4, -4, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* exploding ingredients */}
        {dish.ingredients.map((ing, i) => {
          const total = dish.ingredients.length;
          const angle = (i / total) * Math.PI * 2;
          const explodeR = 360;
          const orbitR = 240;
          const isExplode = phase === "explode";
          return (
            <motion.div
              key={ing.label}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
              animate={{
                x: Math.cos(angle) * (isExplode ? explodeR : orbitR),
                y: Math.sin(angle) * (isExplode ? explodeR : orbitR),
                opacity: 1,
                scale: isExplode ? 1.3 : 1,
                rotate: isExplode ? [0, 180, 360] : 0,
              }}
              transition={{
                duration: isExplode ? 1.3 : 1.1,
                ease: isExplode ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
                delay: isExplode ? i * 0.04 : 0,
              }}
              className="glass-strong pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs"
            >
              <span className="mr-1.5 text-base">{ing.emoji}</span>
              {ing.label}
            </motion.div>
          );
        })}

        {/* details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === "reassemble" ? 1 : 0, y: phase === "reassemble" ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-md text-center"
        >
          <div className="font-display text-3xl">{dish.name}</div>
          <p className="mt-2 text-sm text-muted-foreground">{dish.chef}</p>
          <div className="mt-4 inline-flex items-center gap-4 rounded-full glass-strong px-5 py-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[color:var(--ember)]">
              <Star className="h-3 w-3 fill-current" /> {dish.rating}
            </span>
            <span className="text-muted-foreground">{dish.calories} cal</span>
            <span className="font-semibold text-[color:var(--ember)]">₹{dish.price}</span>
          </div>
          <div className="mt-4">
            <a href="#reserve" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold">
              Order at Table
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}