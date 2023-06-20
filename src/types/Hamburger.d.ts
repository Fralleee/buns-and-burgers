import { ExtraIngredients, Hamburgers, Ingredients } from "@/xata";

type Hamburger = Hamburgers & { ingredients: (Ingredients & { count: number })[]; extras: ExtraIngredients[] };

type OrderHamburger = Hamburger & { price: number; extras: ExtraIngredientsWithCount[] };

type ExtraIngredientsWithCount = ExtraIngredients & { count: number };
