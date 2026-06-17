import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Flame } from "lucide-react";
import { useEffect } from "react";
import hero from "@/assets/ember-hero.png";
import { Magnetic } from "./Magnetic";

export function EmberHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotX = useTransform(sy, (v) => -v * 20);
  const rotY = useTransform(sx, (v) => v * 20);
  const tx = useTransform(sx, (v) => v * 30);
  const ty = useTransform(sy, (v) => v * 30);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative z-10 min-h-[100dvh] overflow-hidden pt-24" style={{ perspective: 1400 }}>
      <div className="relative mx-auto grid min-h-[calc(100dvh-6rem)] max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[color:var(--ember)]"
          >
            <Flame className="h-3.5 w-3.5" />
            Wood-fired · Reservation only
          </motion.div>

          <h1 className="font-display mt-6 text-6xl leading-[0.95] sm:text-7xl lg:text-[7.5rem]">
            <WordReveal text="Dining" />
            <br />
            <span className="gold-gradient-text italic">
              <WordReveal text="Reimagined." delay={0.3} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            A culinary experience crafted for the senses — sparks, smoke, and
            silence; flavor that lingers long after the candle is out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#reserve" className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
                Reserve Table
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

        {/* 3D floating dish */}
        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[560px]"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        >
          {/* glow */}
          <motion.div
            className="absolute inset-10 rounded-full blur-3xl"
            style={{ x: tx, y: ty, background: "var(--gradient-ember)", opacity: 0.45 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.img
            src={hero}
            alt="A glowing ember-fired dessert"
            width={1024}
            height={1024}
            fetchPriority="high"
            className="relative z-10 size-full drop-shadow-[0_30px_60px_rgba(255,120,40,0.45)]"
            animate={{ y: [0, -16, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* orbiting embers */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[color:var(--ember)] shadow-[0_0_18px_var(--ember)]"
              style={{ marginLeft: -4, marginTop: -4 }}
              animate={{
                x: [Math.cos((i / 6) * Math.PI * 2) * 220, Math.cos((i / 6) * Math.PI * 2 + Math.PI * 2) * 220],
                y: [Math.sin((i / 6) * Math.PI * 2) * 220, Math.sin((i / 6) * Math.PI * 2 + Math.PI * 2) * 220],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-x-0 bottom-8 mx-auto w-fit text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll · Begin the experience
      </motion.div>
    </section>
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