"use client";

import { Hamburger } from "@/types/Hamburger";
import { CartProvider } from "../context/CartContext";
import HamburgerMenu from "./HamburgerMenu";
import HamburgerConfiguration from "./HamburgerDetailsModal";
import ShoppingCart from "../components/ShoppingCart";
import { Button, useDisclosure } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";

interface Props {
  hamburgers: Hamburger[];
}

export default function Store({ hamburgers }: Props) {
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  return (
    <CartProvider hamburgers={hamburgers}>
      <HamburgerMenu hamburgers={hamburgers} />;
      <HamburgerConfiguration />
      <ShoppingCart isOpen={isCartOpen} onClose={onCartClose} />
      <Button colorScheme="red" leftIcon={<MdShoppingCart />} size={"lg"} position={"fixed"} bottom={8} right={8} onClick={onCartOpen}>
        Order
      </Button>
    </CartProvider>
  );
}
