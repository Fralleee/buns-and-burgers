import { ExtraIngredients, Hamburgers, Ingredients } from "@/xata";

type CartState = {
  orderCount: number;
  selectedHamburger: Hamburger | null | undefined;
  orderHamburgers: OrderHamburger[];
  totalCost: number;
};
