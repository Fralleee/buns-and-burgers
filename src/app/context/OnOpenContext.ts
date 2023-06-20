import { createContext, useContext } from "react";

const OnOpenContext = createContext(console.log);

export function useOnOpen() {
  return useContext(OnOpenContext);
}

export default OnOpenContext;
