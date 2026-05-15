import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Map } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import { CategoryRail } from "@/components/category-rail";
import { listings } from "@/lib/listings";

type Search = { category?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Explore stays — Maison" },
      {
        name: "description",
        content:
          "Browse hand-picked homes worldwide. Filter by category, price, beds and guests.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const search = Route.useSearch();
  const [category, setCategory] = useState<string>(search.category ?? "all");
  const [priceMax, setPriceMax] = useState(1000);
  const [beds, setBeds] = useState(0);
  const [guests, setGuests] = useState(0);
  const [superhostOnly, setSuperhostOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (l.price > priceMax) return false;
      if (l.beds < beds) return false;
      if (l.guests < guests) return false;
      if (superhostOnly && !l.superhost) return false;
      return true;
    });
  }, [category, priceMax, beds, guests, superhostOnly]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* sticky filter bar */}
      <div className="pt-24 sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-6">
          <CategoryRail active={category} onChange={setCategory} />
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "home" : "homes"} ·{" "}
              <span className="hidden sm:inline">Prices include all fees</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:shadow-md transition-all text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:shadow-md transition-all text-sm font-medium">
                <Map className="w-4 h-4" />
                Show map
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 lg:px-10 pt-10 pb-20">
        <div className="mx-auto max-w-[1400px]">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <h3 className="font-display text-3xl">No stays match your filters.</h3>
                <p className="mt-2 text-muted-foreground">Try widening your criteria.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
              >
                {filtered.map((l, i) => (
                  <ListingCard key={l.id} listing={l} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        beds={beds}
        setBeds={setBeds}
        guests={guests}
        setGuests={setGuests}
        superhostOnly={superhostOnly}
        setSuperhostOnly={setSuperhostOnly}
        count={filtered.length}
      />

      <SiteFooter />
    </div>
  );
}

function FilterSheet(props: {
  open: boolean;
  onClose: () => void;
  priceMax: number;
  setPriceMax: (n: number) => void;
  beds: number;
  setBeds: (n: number) => void;
  guests: number;
  setGuests: (n: number) => void;
  superhostOnly: boolean;
  setSuperhostOnly: (b: boolean) => void;
  count: number;
}) {
  return (
    <AnimatePresence>
      {props.open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={props.onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl">Filters</h2>
              <button
                onClick={props.onClose}
                className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
                  Price range
                </h3>
                <p className="text-2xl font-display">Up to ${props.priceMax}<span className="text-sm text-muted-foreground"> / night</span></p>
                <input
                  type="range"
                  min={50}
                  max={1500}
                  step={10}
                  value={props.priceMax}
                  onChange={(e) => props.setPriceMax(Number(e.target.value))}
                  className="w-full mt-4 accent-[var(--clay)]"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$50</span>
                  <span>$1,500</span>
                </div>
              </div>

              <FilterCounter
                label="Bedrooms"
                value={props.beds}
                onChange={props.setBeds}
              />
              <FilterCounter
                label="Guests"
                value={props.guests}
                onChange={props.setGuests}
              />

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
                  Highlights
                </h3>
                <button
                  onClick={() => props.setSuperhostOnly(!props.superhostOnly)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    props.superhostOnly
                      ? "border-foreground bg-muted"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <p className="font-medium">Superhost</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stays with hosts known for great reviews.
                  </p>
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-border flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  props.setPriceMax(1000);
                  props.setBeds(0);
                  props.setGuests(0);
                  props.setSuperhostOnly(false);
                }}
                className="text-sm font-medium underline underline-offset-4"
              >
                Clear all
              </button>
              <button
                onClick={props.onClose}
                className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-accent transition-colors"
              >
                Show {props.count} {props.count === 1 ? "home" : "homes"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FilterCounter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold uppercase tracking-wide">{label}</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:border-foreground transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center font-medium">
          {value === 0 ? "Any" : `${value}+`}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
