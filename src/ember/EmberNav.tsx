import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Flame } from "lucide-react";
import { Magnetic } from "./Magnetic";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#reserve", label: "Reserve" },
  { href: "#chef", label: "Chef" },
  { href: "#contact", label: "Contact" },
];

export function EmberNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}>
          <Link to="/" className="flex items-center gap-2" data-cursor>
            <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--gradient-ember)" }}>
              <Flame className="h-4 w-4 text-[color:var(--primary-foreground)]" />
            </div>
            <span className="font-display text-2xl tracking-[0.2em]">AURUM</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} data-cursor className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--ember)]">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Magnetic>
              <a href="#reserve" className="btn-gold inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold">
                Reserve
              </a>
            </Magnetic>
          </div>
          <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="glass-strong mt-3 rounded-2xl p-4 md:hidden">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm">
                {l.label}
              </a>
            ))}
            <a href="#reserve" onClick={() => setOpen(false)} className="btn-gold mt-2 block rounded-full px-5 py-2.5 text-center text-sm font-semibold">
              Reserve
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export function EmberFooter() {
  return (
    <footer id="contact" className="relative z-10 border-t border-[color:var(--border)] py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--gradient-ember)" }}>
              <Flame className="h-4 w-4 text-[color:var(--primary-foreground)]" />
            </div>
            <span className="font-display text-2xl tracking-[0.2em]">AURUM</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A wood-fired tasting room. Reservations only. One seating, two services, every night.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--ember)]">Visit</div>
          <p className="mt-3 text-sm text-muted-foreground">18 Lotus Lane,<br />Bandra West, Mumbai</p>
          <p className="mt-3 text-sm text-muted-foreground">+91 98765 43210</p>
          <p className="text-sm text-muted-foreground">hello@aurum.dining</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--ember)]">Hours</div>
          <p className="mt-3 text-sm text-muted-foreground">Tue – Sun · 7:00pm – 11:30pm</p>
          <p className="text-sm text-muted-foreground">Mondays · Closed</p>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} AURUM. Crafted in fire.</p>
    </footer>
  );
}