import ShoppingCart from "../components/ShoppingCart";
import HamburgerMenu from "./HamburgerMenu";
import { getHamburgers } from "@/app/api/hamburgers";

export default async function Page() {
  const hamburgers = await getHamburgers();
  return <HamburgerMenu hamburgers={hamburgers} />;
}
