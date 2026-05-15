import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, MapPin, Calendar, Users } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import { listings, categories } from "@/lib/listings";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison — Hand-picked homes around the world" },
      {
        name: "description",
        content:
          "Discover extraordinary stays — beachfront villas, design lofts, and cabins curated for travelers who care.",
      },
      { property: "og:title", content: "Maison — Hand-picked homes around the world" },
      { property: "og:description", content: "Curated stays for design-minded travelers." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = listings.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Modern villa at golden hour"
          width={1920}
          height={1080}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px] w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-xs uppercase tracking-[0.18em] border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Spring collection · 2026
              </span>
              <h1 className="font-display text-white text-[clamp(3rem,8vw,7rem)] leading-[0.95] mt-6 text-balance">
                Where you stay <em className="text-accent">becomes</em> the trip.
              </h1>
              <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
                A small, opinionated collection of homes worth flying for —
                from cliffside glasshouses to forest cabins.
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 bg-background rounded-full shadow-2xl p-2 flex items-center gap-1 max-w-3xl"
            >
              <SearchField icon={MapPin} label="Where" placeholder="Search destinations" />
              <Divider />
              <SearchField icon={Calendar} label="When" placeholder="Add dates" />
              <Divider />
              <SearchField icon={Users} label="Who" placeholder="Add guests" />
              <Link
                to="/explore"
                className="ml-2 shrink-0 h-14 px-7 rounded-full bg-accent text-accent-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Browse by mood
              </p>
              <h2 className="font-display text-5xl md:text-6xl mt-3">
                Find your kind of <em className="text-accent">somewhere</em>.
              </h2>
            </div>
            <Link
              to="/explore"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map((cat, i) => {
              const Icon = (Icons as any)[cat.icon] ?? Icons.Sparkles;
              const img = listings.find((l) => l.category === cat.id)?.image;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to="/explore"
                    search={{ category: cat.id }}
                    className="group block relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
                  >
                    {img && (
                      <img
                        src={img}
                        alt={cat.label}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white">
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs uppercase tracking-wider">
                          Category
                        </p>
                        <h3 className="font-display text-white text-3xl mt-1">
                          {cat.label}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-12 pb-24 px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Editor's pick · Featured
              </p>
              <h2 className="font-display text-5xl md:text-6xl mt-3 max-w-2xl text-balance">
                Stays we'd book <em className="text-accent">ourselves</em>.
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {featured.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/explore"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background hover:bg-accent transition-all"
            >
              <span className="font-medium">Explore all stays</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="py-32 px-6 lg:px-10 bg-foreground text-background">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display text-4xl md:text-6xl leading-[1.1] text-balance"
          >
            "The best souvenir is a place you can't stop thinking about."
          </motion.p>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-background/60">
            — Maison Journal, Issue 04
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SearchField({
  icon: Icon,
  label,
  placeholder,
}: {
  icon: any;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex-1 min-w-0 px-5 py-2 rounded-full hover:bg-muted transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground">
            {label}
          </p>
          <p className="text-sm text-muted-foreground truncate">{placeholder}</p>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-border shrink-0" />;
}
