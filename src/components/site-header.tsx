import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Globe, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = path === "/";
  const transparent = isHome && !scrolled;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-xl border-b border-border/60"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-display text-xl">
            ô
          </div>
          <span
            className={`font-display text-2xl tracking-tight ${
              transparent ? "text-white" : "text-foreground"
            }`}
          >
            Maison
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {[
            { to: "/", label: "Stays" },
            { to: "/explore", label: "Explore" },
            { to: "/explore", label: "Experiences" },
            { to: "/explore", label: "Concierge" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={`relative font-medium transition-colors ${
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            className={`hidden sm:flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border transition-all ${
              transparent
                ? "border-white/30 bg-white/10 backdrop-blur text-white hover:bg-white/20"
                : "border-border bg-card hover:shadow-md"
            }`}
          >
            <span className="text-sm font-medium">Anywhere</span>
            <span className="w-px h-4 bg-current opacity-30" />
            <span className="text-sm opacity-70">Any week</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
              <Search className="w-4 h-4" />
            </div>
          </Link>

          <button
            className={`hidden md:flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border transition-all ${
              transparent
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border hover:shadow-md"
            }`}
          >
            <Menu className="w-4 h-4" />
            <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
