import d1 from "@/assets/dish-1.jpg";
import d2 from "@/assets/dish-2.jpg";
import d3 from "@/assets/dish-3.jpg";
import d4 from "@/assets/dish-4.jpg";
import d5 from "@/assets/dish-5.jpg";
import d6 from "@/assets/dish-6.jpg";

export type Tag = "Vegetarian" | "Vegan" | "High Protein" | "Gluten Free" | "Spicy" | "Chef's Special";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number; // INR
  image: string;
  tags: Tag[];
  rating: number;
  calories: number;
  ingredients: string[];
  allergens: string[];
  spicy: 0 | 1 | 2 | 3;
  category: "Starters" | "Mains" | "Desserts";
};

export const DISHES: Dish[] = [
  {
    id: "wagyu",
    name: "Truffle Wagyu",
    description: "A5 wagyu, black truffle jus, charred shallots, 24k gold leaf.",
    price: 2400,
    image: d1,
    tags: ["High Protein", "Gluten Free", "Chef's Special"],
    rating: 4.9,
    calories: 720,
    ingredients: ["Wagyu beef", "Black truffle", "Shallots", "Butter", "Sea salt"],
    allergens: ["Dairy"],
    spicy: 0,
    category: "Mains",
  },
  {
    id: "risotto",
    name: "Black Truffle Risotto",
    description: "Slow-stirred carnaroli rice, aged parmesan, fresh shaved truffle.",
    price: 1450,
    image: d2,
    tags: ["Vegetarian", "Chef's Special"],
    rating: 4.8,
    calories: 610,
    ingredients: ["Carnaroli rice", "Parmesan", "Truffle", "Butter", "Stock"],
    allergens: ["Dairy"],
    spicy: 0,
    category: "Mains",
  },
  {
    id: "scallops",
    name: "Seared Scallops & Caviar",
    description: "Pan-seared diver scallops, Oscietra caviar, brown butter.",
    price: 1850,
    image: d3,
    tags: ["High Protein", "Gluten Free"],
    rating: 4.9,
    calories: 380,
    ingredients: ["Scallops", "Caviar", "Butter", "Lemon"],
    allergens: ["Shellfish", "Dairy"],
    spicy: 0,
    category: "Starters",
  },
  {
    id: "lava",
    name: "Molten Gold Lava",
    description: "Warm chocolate fondant, raspberry coulis, edible gold dust.",
    price: 690,
    image: d4,
    tags: ["Vegetarian"],
    rating: 4.9,
    calories: 540,
    ingredients: ["Chocolate", "Eggs", "Flour", "Raspberry"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    spicy: 0,
    category: "Desserts",
  },
  {
    id: "burrata",
    name: "Heirloom Burrata",
    description: "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic.",
    price: 780,
    image: d5,
    tags: ["Vegetarian", "Gluten Free"],
    rating: 4.7,
    calories: 320,
    ingredients: ["Burrata", "Tomato", "Basil", "Olive oil"],
    allergens: ["Dairy"],
    spicy: 0,
    category: "Starters",
  },
  {
    id: "duck",
    name: "Smoked Duck Cherry",
    description: "Rosé-pink duck breast, dark cherry reduction, micro-thyme.",
    price: 1620,
    image: d6,
    tags: ["High Protein", "Gluten Free", "Spicy"],
    rating: 4.8,
    calories: 560,
    ingredients: ["Duck", "Cherry", "Red wine", "Thyme"],
    allergens: [],
    spicy: 1,
    category: "Mains",
  },
];

export const ALL_TAGS: Tag[] = [
  "Vegetarian",
  "Vegan",
  "High Protein",
  "Gluten Free",
  "Spicy",
  "Chef's Special",
];