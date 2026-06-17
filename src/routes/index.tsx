import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MenuExplorer } from "@/components/MenuExplorer";
import { Reservation } from "@/components/Reservation";
import { Events, Gallery, Chef, Reviews, Loyalty, Contact, Footer } from "@/components/Sections";
import { AIChat } from "@/components/AIChat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Savora — Modern Fine Dining" },
      { name: "description", content: "Reserve a table, explore the chef's menu, and discover events at Savora — a modern luxury restaurant." },
      { property: "og:title", content: "Savora — Modern Fine Dining" },
      { property: "og:description", content: "Reserve, explore, and experience unforgettable dining." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh">
      <Nav />
      <main>
        <Hero />
        <MenuExplorer />
        <Reservation />
        <Events />
        <Chef />
        <Gallery />
        <Reviews />
        <Loyalty />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}
