import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { categories } from "@/lib/listings";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

export function CategoryRail({ active, onChange }: Props) {
  return (
    <div className="relative">
      <div className="flex gap-8 overflow-x-auto no-scrollbar pb-3">
        {categories.map((cat, i) => {
          const Icon = (Icons as any)[cat.icon] ?? Icons.Sparkles;
          const isActive = active === cat.id;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              onClick={() => onChange(cat.id)}
              className={`relative flex flex-col items-center gap-2 shrink-0 pb-2 transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs font-medium whitespace-nowrap">
                {cat.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="cat-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
