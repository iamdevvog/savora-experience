import { motion } from "framer-motion";
import { ArrowRight, Star, UtensilsCrossed } from "lucide-react";
import hero from "@/assets/hero-dish.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-28">
      {/* Background image with parallax-feel */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Plated fine dining dish with gold accents"
          className="absolute inset-0 size-full object-cover opacity-70"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      </div>

      {/* Floating gold orb */}
      <div className="pointer-events-none absolute -right-32 top-1/3 size-[420px] rounded-full opacity-30 blur-3xl animate-float-slow"
           style={{ background: "var(--gradient-gold)" }} />

      <div className="relative mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            Michelin-recognized · Est. 2014
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display mt-6 text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
          >
            Every meal <br />
            tells a <span className="gold-gradient-text italic">story.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Reserve, explore, and experience unforgettable dining — crafted by
            world-class chefs, served in an atmosphere built for memory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#reserve" className="btn-gold group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
              Reserve a Table
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#menu" className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
              <UtensilsCrossed className="h-4 w-4" />
              Explore the Menu
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6"
          >
            {[
              { k: "12+", v: "Years of craft" },
              { k: "4.9★", v: "2,400 reviews" },
              { k: "40+", v: "Seasonal dishes" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-4 py-4">
                <div className="font-display text-3xl gold-gradient-text">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}