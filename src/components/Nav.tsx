import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#reserve", label: "Reserve" },
  { href: "#events", label: "Events" },
  { href: "#chef", label: "Chef" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-[var(--shadow-elev)]" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
              <span className="font-display text-lg font-bold text-[color:var(--primary-foreground)]">S</span>
            </div>
            <span className="font-display text-2xl tracking-wide">Savora</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#reserve" className="btn-gold inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold">
              Reserve a Table
            </a>
          </div>

          <button
            aria-label="Open menu"
            className="md:hidden text-foreground"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="glass-strong mt-3 rounded-2xl p-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-[color:var(--surface-elev)]"
                >
                  {l.label}
                </a>
              ))}
              <a href="#reserve" onClick={() => setOpen(false)} className="btn-gold mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold">
                Reserve a Table
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}