import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Listing = {
  id: string;
  title: string;
  location: string;
  country: string;
  price: number;
  rating: number;
  reviews: number;
  beds: number;
  baths: number;
  guests: number;
  category: string;
  image: string;
  superhost?: boolean;
};

export const categories = [
  { id: "all", label: "All", icon: "Sparkles" },
  { id: "beach", label: "Beachfront", icon: "Waves" },
  { id: "cabin", label: "Cabins", icon: "Trees" },
  { id: "city", label: "City", icon: "Building2" },
  { id: "countryside", label: "Countryside", icon: "Mountain" },
  { id: "design", label: "Design", icon: "Palette" },
  { id: "desert", label: "Desert", icon: "Sun" },
  { id: "luxe", label: "Luxe", icon: "Gem" },
] as const;

export const listings: Listing[] = [
  {
    id: "1",
    title: "Sunlit Loft in Old Town",
    location: "Copenhagen",
    country: "Denmark",
    price: 248,
    rating: 4.96,
    reviews: 312,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "design",
    image: p1,
    superhost: true,
  },
  {
    id: "2",
    title: "Casa del Mar — Oceanfront Retreat",
    location: "Tulum",
    country: "Mexico",
    price: 412,
    rating: 4.92,
    reviews: 187,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "beach",
    image: p2,
    superhost: true,
  },
  {
    id: "3",
    title: "Pinewood Cabin with Fireplace",
    location: "Banff",
    country: "Canada",
    price: 189,
    rating: 4.89,
    reviews: 421,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "cabin",
    image: p3,
  },
  {
    id: "4",
    title: "Skyline Penthouse · Floor 47",
    location: "New York",
    country: "USA",
    price: 689,
    rating: 4.98,
    reviews: 96,
    beds: 3,
    baths: 3,
    guests: 6,
    category: "city",
    image: p4,
    superhost: true,
  },
  {
    id: "5",
    title: "Vineyard Stone Villa",
    location: "Tuscany",
    country: "Italy",
    price: 524,
    rating: 4.94,
    reviews: 256,
    beds: 5,
    baths: 4,
    guests: 10,
    category: "countryside",
    image: p5,
  },
  {
    id: "6",
    title: "Brutalist Desert House",
    location: "Joshua Tree",
    country: "USA",
    price: 372,
    rating: 4.87,
    reviews: 143,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "desert",
    image: p6,
    superhost: true,
  },
  {
    id: "7",
    title: "Glasshouse on the Cliff",
    location: "Mallorca",
    country: "Spain",
    price: 920,
    rating: 4.99,
    reviews: 78,
    beds: 4,
    baths: 4,
    guests: 8,
    category: "luxe",
    image: p2,
    superhost: true,
  },
  {
    id: "8",
    title: "Arctic A-Frame Hideaway",
    location: "Tromsø",
    country: "Norway",
    price: 264,
    rating: 4.91,
    reviews: 198,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "cabin",
    image: p3,
  },
  {
    id: "9",
    title: "Atelier Loft in Le Marais",
    location: "Paris",
    country: "France",
    price: 318,
    rating: 4.93,
    reviews: 289,
    beds: 1,
    baths: 1,
    guests: 2,
    category: "design",
    image: p1,
  },
];
