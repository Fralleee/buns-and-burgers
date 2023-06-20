import { CartState } from "@/types/Cart";
import { ExtraIngredientsWithCount, Hamburger, OrderHamburger } from "@/types/Hamburger";
import { useCallback, useReducer } from "react";

interface Action {
  type: "selectHamburger" | "addToCart" | "removeFromCart" | "clearCart";
  payload?: Hamburger | OrderHamburger | number;
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
    case "removeFromCart":
      if (typeof action.payload !== "number") throw new Error("Invalid payload for removeFromCart");
      const newOrderHamburgers = [...state.orderHamburgers];
      const removedItem = newOrderHamburgers.splice(action.payload, 1)[0];
      return {
        ...state,
        orderCount: state.orderCount - 1,
        orderHamburgers: newOrderHamburgers,
        totalCost: state.totalCost - removedItem.price,
      };
    case "clearCart":
      return {
        ...state,
        orderCount: 0,
        orderHamburgers: [],
        totalCost: 0,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function useCartActions(hamburgers: Hamburger[], initialState: CartState, openCart: () => void) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectHamburger = useCallback(
    (id: string | null) => {
      const selectedHamburger = hamburgers.find(hamburger => hamburger.id === id);
      dispatch({ type: "selectHamburger", payload: selectedHamburger });
    },
    [hamburgers]
  );

  const addToCart = useCallback(
    (orderHamburger: OrderHamburger) => {
      dispatch({ type: "addToCart", payload: orderHamburger });
      openCart();
    },
    [openCart]
  );

  const removeFromCart = useCallback((index: number) => {
    dispatch({ type: "removeFromCart", payload: index });
  }, []);

  const placeOrder = async () => {
    const cleanedState = {
      totalPrice: state.totalCost,
      orderHamburgers: state.orderHamburgers.map(orderHamburger => {
        return {
          id: orderHamburger.id,
          extraIngredients: ((orderHamburger.extras || []) as ExtraIngredientsWithCount[]).map(extraIngredient => {
            return {
              id: extraIngredient.id,
              count: extraIngredient.count,
            };
          }),
        };
      }),
    };

    const orderData = { ...cleanedState, rawData: JSON.stringify(state) };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        dispatch({ type: "clearCart" });
      } else {
        throw new Error("Unable to place order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { state, selectHamburger, addToCart, removeFromCart, placeOrder };
}
