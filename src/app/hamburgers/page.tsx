import { getHamburgers } from "@/app/api/hamburgers";
import Store from "./Store";

export default async function Page() {
  const hamburgers = await getHamburgers();
  return <Store hamburgers={hamburgers} />;
}
