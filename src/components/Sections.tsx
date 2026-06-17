import { motion } from "framer-motion";
import { Award, Calendar, MapPin, Phone, Mail, Music, Mic2, Sparkles, Star } from "lucide-react";
import chef from "@/assets/chef.jpg";
import interior from "@/assets/interior.jpg";
import d1 from "@/assets/dish-1.jpg";
import d2 from "@/assets/dish-2.jpg";
import d3 from "@/assets/dish-3.jpg";
import d4 from "@/assets/dish-4.jpg";
import d5 from "@/assets/dish-5.jpg";
import d6 from "@/assets/dish-6.jpg";
import { SectionHeading } from "./MenuExplorer";

export function Events() {
  const events = [
    { date: "Fri · Mar 14", title: "Jazz & Wine Pairing", icon: <Music />, desc: "Live trio paired with sommelier-selected wines." },
    { date: "Sat · Mar 22", title: "Stand-up Comedy Night", icon: <Mic2 />, desc: "Headliners under candlelight, three-course menu included." },
    { date: "Sun · Mar 30", title: "Chef's Table Experience", icon: <Sparkles />, desc: "10 seats. 12 courses. One unforgettable evening." },
  ];
  return (
    <section id="events" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Event Hub" title="Evenings worth remembering" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass group relative overflow-hidden rounded-3xl p-7"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                   style={{ background: "var(--gradient-gold)" }} />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl glass-strong text-gold">
                  {e.icon}
                </div>
                <div className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">{e.date}</div>
                <h3 className="font-display mt-2 text-2xl">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                <button className="btn-outline-gold mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
                  <Calendar className="h-3.5 w-3.5" /> Book seats
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const imgs = [d1, d5, interior, d3, d6, d2, chef, d4];
  return (
    <section id="gallery" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Virtual Tour" title="A glimpse inside Savora" subtitle="Take a walk through our kitchen, dining room, and signature plates." />
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {imgs.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl ${i === 0 || i === 4 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            >
              <img src={src} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Chef() {
  return (
    <section id="chef" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img src={chef} alt="Chef Aarav Mehta plating a dish" loading="lazy" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="glass-strong absolute -bottom-6 -right-6 hidden rounded-2xl px-5 py-4 sm:block">
              <Award className="h-6 w-6 text-gold" />
              <div className="font-display mt-1 text-xl">12 Awards</div>
              <div className="text-xs text-muted-foreground">incl. James Beard 2023</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-gold">About the Chef</div>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">A lifetime in <span className="gold-gradient-text italic">flavor</span></h2>
            <p className="mt-5 text-muted-foreground">
              Chef Aarav Mehta trained in Paris, Tokyo, and Copenhagen before
              opening Savora to bring world cuisine home — without compromise.
              Every plate is a quiet love letter to seasonality, technique, and
              the people who sit across the table from one another.
            </p>
            <blockquote className="hairline-l mt-6 border-l-2 border-[color:var(--gold)] pl-5 font-display text-xl italic text-foreground/90">
              "The best meals don't end. They linger — long after the candle is out."
            </blockquote>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "20 yrs", v: "Of craft" },
                { k: "3", v: "Continents trained" },
                { k: "12", v: "Industry awards" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl gold-gradient-text">{s.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const reviews = [
    { name: "Ananya Sharma", role: "Food Critic, Conde Nast", text: "Savora is what fine dining was always meant to be — emotional, generous, exact.", rating: 5 },
    { name: "Rohan Kapoor", role: "Regular guest", text: "The truffle wagyu ruined every other steak for me. I keep coming back.", rating: 5 },
    { name: "Meera Iyer", role: "Anniversary diner", text: "They made our 10th feel like our first date. Thoughtful from the door to dessert.", rating: 5 },
  ];
  return (
    <section id="reviews" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Guest Stories" title="Loved by 2,400+ diners" subtitle="Rated 4.9 on Google · Featured in Vogue, GQ, and Eater." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass relative rounded-3xl p-7"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="font-display mt-4 text-xl leading-snug">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                  <span className="font-display text-sm text-[color:var(--primary-foreground)]">{r.name[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Loyalty() {
  return (
    <section id="loyalty" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-strong grain relative overflow-hidden rounded-[2rem] p-10 lg:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
               style={{ background: "var(--gradient-gold)" }} />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Savora Gold Club</div>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">Dine more. <span className="gold-gradient-text">Receive more.</span></h2>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Earn points on every visit, unlock complimentary chef's plates,
                receive priority reservations, and surprise gifts on your special days.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">Join free</button>
                <button className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold">How it works</button>
              </div>
            </div>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="glass-strong relative aspect-[16/10] w-full overflow-hidden rounded-3xl p-6"
                style={{ background: "linear-gradient(135deg, oklch(0.22 0.02 60), oklch(0.16 0.02 60))" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl">Savora</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">Gold</span>
                </div>
                <div className="mt-12 font-display text-3xl tracking-widest text-foreground/80">
                  •••• •••• •••• 2024
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Member</div>
                    <div className="text-sm">Your Name</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-muted-foreground">Points</div>
                    <div className="text-gold font-display text-xl">1,240</div>
                  </div>
                </div>
                <div className="shimmer-gold absolute inset-x-0 bottom-0 h-px" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Visit Us" title="Find your seat at Savora" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: <MapPin />, title: "Address", lines: ["18 Lotus Lane,", "Bandra West, Mumbai"] },
            { icon: <Phone />, title: "Reservations", lines: ["+91 98765 43210", "Daily, 11am – 11pm"] },
            { icon: <Mail />, title: "Email", lines: ["hello@savora.dining", "events@savora.dining"] },
          ].map((c) => (
            <div key={c.title} className="glass rounded-3xl p-7">
              <div className="grid h-12 w-12 place-items-center rounded-2xl glass-strong text-gold">{c.icon}</div>
              <h3 className="font-display mt-5 text-2xl">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="text-sm text-muted-foreground">{l}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
            <span className="font-display text-sm font-bold text-[color:var(--primary-foreground)]">S</span>
          </div>
          <span className="font-display text-xl">Savora</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Savora Restaurant. Crafted with care.</p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-gold">Instagram</a>
          <a href="#" className="hover:text-gold">Privacy</a>
          <a href="#" className="hover:text-gold">Terms</a>
        </div>
      </div>
    </footer>
  );
}