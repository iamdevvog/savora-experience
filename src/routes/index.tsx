import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { EmberNav, EmberFooter } from "@/ember/EmberNav";
import { EmberHero } from "@/ember/EmberHero";
import { IngredientAssembly, ChefShowcase, SignatureCards } from "@/ember/StorySections";
import { EmberMenu } from "@/ember/EmberMenu";
import { DishFinder } from "@/ember/DishFinder";
import { EmberReservation } from "@/ember/EmberReservation";
import { CustomCursor } from "@/ember/CustomCursor";

const EmberScene = lazy(() => import("@/ember/EmberScene").then((m) => ({ default: m.EmberScene })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EMBER — Dining Reimagined" },
      { name: "description", content: "EMBER is an immersive wood-fired fine dining experience — reservations, signatures, and an interactive 3D menu." },
      { property: "og:title", content: "EMBER — Dining Reimagined" },
      { property: "og:description", content: "A culinary experience crafted for the senses." },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-dvh">
      {mounted && (
        <Suspense fallback={null}>
          <EmberScene />
        </Suspense>
      )}
      <CustomCursor />
      <EmberNav />
      <main className="relative z-10">
        <EmberHero />
        <IngredientAssembly />
        <ChefShowcase />
        <SignatureCards />
        <EmberMenu />
        <DishFinder />
        <EmberReservation />
      </main>
      <EmberFooter />
    </div>
  );
}
