import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/lib/listings";

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/5]">
        <motion.img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {listing.superhost && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[11px] font-semibold tracking-wide uppercase">
            Superhost
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/30 backdrop-blur-md hover:bg-background/60 transition-all"
          aria-label="Save"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              liked ? "fill-accent text-accent scale-110" : "fill-black/30 text-white"
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground leading-snug truncate">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0 text-sm">
            <Star className="w-3.5 h-3.5 fill-foreground" />
            <span className="font-medium">{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          {listing.location}, {listing.country}
        </p>
        <p className="text-sm text-muted-foreground">
          {listing.beds} beds · {listing.guests} guests
        </p>
        <p className="mt-2 text-sm">
          <span className="font-semibold text-foreground">${listing.price}</span>
          <span className="text-muted-foreground"> / night</span>
        </p>
      </div>
    </motion.article>
  );
}
