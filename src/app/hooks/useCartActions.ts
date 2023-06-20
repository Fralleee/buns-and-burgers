import { CartState } from "@/types/Cart";
import { Hamburger, OrderHamburger } from "@/types/Hamburger";
import { useCallback, useReducer } from "react";

interface Action {
  type: "selectHamburger" | "addToCart";
  payload?: Hamburger | OrderHamburger;
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "selectHamburger":
      return {
        ...state,
        selectedHamburger: action.payload,
      };
    case "addToCart":
      if (!action.payload) throw new Error("No payload provided");
      const orderHamburger = action.payload as OrderHamburger;
      return {
        ...state,
        orderCount: state.orderCount + 1,
        orderHamburgers: [...state.orderHamburgers, orderHamburger],
        totalCost: state.totalCost + orderHamburger.price,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function useCartActions(hamburgers: Hamburger[], initialState: CartState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectHamburger = useCallback(
    (id: string | null) => {
      const selectedHamburger = hamburgers.find(hamburger => hamburger.id === id);
      dispatch({ type: "selectHamburger", payload: selectedHamburger });
    },
    [hamburgers]
  );

  const addToCart = useCallback((orderHamburger: OrderHamburger) => {
    dispatch({ type: "addToCart", payload: orderHamburger });
  }, []);

  return { state, selectHamburger, addToCart };
}
