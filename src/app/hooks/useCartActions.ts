import { Hamburger } from "@/types/Hamburger";
import { useReducer } from "react";

interface State {
  orderCount: number;
  selectedHamburger: Hamburger | null | undefined;
}

interface Action {
  type: "selectHamburger" | "addToCart";
  payload?: Hamburger;
}

const initialState: State = {
  orderCount: 0,
  selectedHamburger: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "selectHamburger":
      return {
        ...state,
        selectedHamburger: action.payload,
      };
    case "addToCart":
      return {
        ...state,
        orderCount: state.orderCount + 1,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function useCartActions(hamburgers: Hamburger[]) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDetails = (id: string, onDetailsOpened: () => void) => {
    const selectedHamburger = hamburgers.find(hamburger => hamburger.id === id);
    if (selectedHamburger) {
      dispatch({ type: "selectHamburger", payload: selectedHamburger });
      if (onDetailsOpened) {
        onDetailsOpened();
      }
    }
  };

  const addToCart = (onAdded: () => void) => {
    dispatch({ type: "addToCart" });
    if (onAdded) {
      onAdded();
    }
  };

  return { state, openDetails, addToCart };
}
