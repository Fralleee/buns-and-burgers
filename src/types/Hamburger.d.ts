import { ExtraIngredients, Hamburgers, Ingredients } from "@/xata";

type Hamburger = Hamburgers & { ingredients: (Ingredients & { count: number })[]; extras: ExtraIngredients[] };

type OrderHamburger = Hamburgers & { price: number; ingredients: (Ingredients & { count: number })[]; extras: ExtraIngredientsWithCount[] };

type ExtraIngredientsWithCount = ExtraIngredients & { count: number };
