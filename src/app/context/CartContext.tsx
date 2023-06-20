import React, { createContext } from "react";
import { useCartActions } from "../hooks/useCartActions";
import { Hamburger, OrderHamburger } from "@/types/Hamburger";
import { CartState } from "@/types/Cart";

interface CartProviderProps {
  hamburgers: Hamburger[];
  children: React.ReactNode;
}

interface CartContextProps {
  state: CartState;
  selectHamburger: (id: string | null) => void;
  addToCart: (orderHamburger: OrderHamburger) => void;
}

const initialState: CartState = {
  orderCount: 0,
  selectedHamburger: null,
  orderHamburgers: [],
  totalCost: 0,
};

const CartContext = createContext<CartContextProps>({
  state: initialState,
  selectHamburger: () => console.log("selectHamburger has not been initialized"),
  addToCart: () => console.log("addToCart has not been initialized"),
});

export function CartProvider({ children, hamburgers }: CartProviderProps) {
  const cartActions = useCartActions(hamburgers, initialState);
  return <CartContext.Provider value={cartActions}>{children}</CartContext.Provider>;
}

export default CartContext;
