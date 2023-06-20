"use client";

import { Box, Button, Divider, Heading, SimpleGrid, useDisclosure, Badge } from "@chakra-ui/react";
import Image from "next/image";
import OnOpenContext from "../context/OnOpenContext";
import HamburgerCard from "./HamburgerCard";
import HamburgerConfiguration from "./HamburgerConfiguration";
import { Hamburger } from "@/types/Hamburger";
import ShoppingCart from "../components/ShoppingCart";
import { MdShoppingCart } from "react-icons/md";
import { useCartActions } from "../hooks/useCartActions";

interface Props {
  hamburgers: Hamburger[];
}

export default function HamburgerMenu({ hamburgers }: Props) {
  const { state, openDetails, addToCart } = useCartActions(hamburgers);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();

  const handleHamburgerClick = (id: string) => {
    openDetails(id, onModalOpen);
  };

  const addHamburgerToCart = () => {
    addToCart(onCartOpen);
  };

  return (
    <OnOpenContext.Provider value={handleHamburgerClick}>
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
        <SimpleGrid maxW={1280} columns={[1, 1, 2, 2, 3]} gap={[6, 12, 24]} marginBlock={[12, 24]} marginInline={"auto"} paddingInline={12}>
          {hamburgers.map(hamburger => (
            <HamburgerCard key={hamburger.id} hamburger={hamburger} />
          ))}
        </SimpleGrid>
        <Button leftIcon={<MdShoppingCart />} size={"lg"} position={"fixed"} bottom={8} right={8} colorScheme="red" onClick={onCartOpen}>
          Order
          {state.orderCount > 0 && (
            <Badge marginInline={"1em"} colorScheme="red" variant="subtle" size={"md"}>
              {state.orderCount}
            </Badge>
          )}
        </Button>
        <HamburgerConfiguration hamburger={state.selectedHamburger} isOpen={isModalOpen} onClose={onModalClose} onAdd={addHamburgerToCart} />
        <ShoppingCart isOpen={isCartOpen} onClose={onCartClose} />
      </Box>
    </OnOpenContext.Provider>
  );
}
