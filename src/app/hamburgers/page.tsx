import { Hamburgers, Ingredients, getXataClient } from "@/xata";
import HamburgerOptions from "./HamburgerOptions";

const xata = getXataClient();

const getHamburgers = async () => {
  const hamburgerIngredients = await xata.db.hamburgerIngredients.select(["*", "hamburger.id", "ingredient.*"]).getAll();
  const hamburgerAvailableExtraIngredients = await xata.db.hamburgerAvailableExtraIngredients.select(["hamburger.id", "ingredient.ingredient.*"]).getAll();
  const hamburgers: Hamburgers[] = await xata.db.hamburgers.getMany();

  const hamburgersWithIngredients = hamburgers.map(hamburger => {
    const ingredients = hamburgerIngredients
      .filter(hamburgerIngredient => hamburgerIngredient.hamburger?.id === hamburger.id)
      .map(hamburgerIngredient => ({ id: hamburgerIngredient.id, count: hamburgerIngredient.count, ...hamburgerIngredient.ingredient }));

    const extras = hamburgerAvailableExtraIngredients
      .filter(extraIngredient => extraIngredient.hamburger?.id === hamburger.id)
      .map(extraIngredient => extraIngredient.ingredient?.ingredient);

    return {
      ...hamburger,
      ingredients,
      extras,
    };
  });

  return hamburgersWithIngredients as (Hamburgers & { ingredients: (Ingredients & { count: number })[]; extras: Ingredients[] })[];
};

export default async function Page() {
  const hamburgers = await getHamburgers();
  return <HamburgerOptions hamburgers={hamburgers} />;
}
