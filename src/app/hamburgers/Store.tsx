"use client";

import Image from "next/image";
import { Hamburger } from "@/types/Hamburger";
import { CartProvider } from "../context/CartContext";
import HamburgerMenu from "./HamburgerMenu";
import HamburgerConfiguration from "./HamburgerDetailsModal";
import ShoppingCart from "../components/ShoppingCart";
import { Box, Button, Divider, Heading, useDisclosure } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";

interface Props {
  hamburgers: Hamburger[];
}

export default function Store({ hamburgers }: Props) {
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  return (
    <CartProvider hamburgers={hamburgers} openCart={onCartOpen}>
      <Box position={"relative"} minHeight={"100vh"}>
        <Box textAlign={"center"} display={"flex"} flexDirection={"column"} alignItems={"center"} zIndex={1} paddingBlockStart={16}>
          <Image src="/header.svg" alt="Logo" width={128} height={128} priority />
          <Heading opacity={0.7} fontSize={{ base: "48px", lg: "64px", xl: "96px" }}>
            HAMBURGERS
          </Heading>
          <Divider marginBlock={"1em"} />
          <Heading
            opacity={0.8}
            textShadow={"0 0 6px #000"}
            fontSize={{ base: "18px", lg: "24px", xl: "36px" }}
            fontWeight={"thin"}
            textAlign={"center"}
            marginInline={"auto"}
            maxW={"35ch"}>
            Discover a Burger Haven: Unleash Your Cravings, One Bite at a Time!
          </Heading>
        </Box>
        <HamburgerMenu hamburgers={hamburgers} />;
      </Box>
      <HamburgerConfiguration />
      <ShoppingCart isOpen={isCartOpen} onClose={onCartClose} />
      <Button zIndex={10} colorScheme="red" leftIcon={<MdShoppingCart />} size={"lg"} position={"fixed"} bottom={8} right={8} onClick={onCartOpen}>
        Order
      </Button>
    </CartProvider>
  );
}
