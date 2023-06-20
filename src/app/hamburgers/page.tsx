import { getHamburgers } from "@/app/api/hamburgers/route";
import Store from "./Store";

export default async function Page() {
  const hamburgers = await getHamburgers();
  return <Store hamburgers={hamburgers} />;
}
