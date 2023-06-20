import { ExtraIngredients, Hamburgers, getXataClient } from "@/xata";
import { Hamburger } from "@/types/Hamburger";

const xata = getXataClient();

export const getHamburgers = async () => {
  const hamburgerIngredients = await xata.db.hamburgerIngredients.select(["*", "hamburger.id", "ingredient.*"]).getAll();
  const hamburgerAvailableExtraIngredients = await xata.db.hamburgerAvailableExtraIngredients
    .select(["hamburger.id", "extraIngredient.*", "extraIngredient.ingredient.*"])
    .getAll();
  const hamburgers: Hamburgers[] = await xata.db.hamburgers.getMany();

  const hamburgersWithIngredients = hamburgers.map(hamburger => {
    const ingredients = hamburgerIngredients
      .filter(hamburgerIngredient => hamburgerIngredient.hamburger?.id === hamburger.id)
      .map(hamburgerIngredient => ({ id: hamburgerIngredient.id, count: hamburgerIngredient.count, ...hamburgerIngredient.ingredient }));

    const extras = hamburgerAvailableExtraIngredients
      .filter(hamburgerAvailableExtraIngredient => hamburgerAvailableExtraIngredient.hamburger?.id === hamburger.id)
      .map(hamburgerAvailableExtraIngredient => hamburgerAvailableExtraIngredient.extraIngredient) as ExtraIngredients[];

    return {
      ...hamburger,
      ingredients,
      extras,
    };
  }) as unknown;

  return hamburgersWithIngredients as Hamburger[];
};
