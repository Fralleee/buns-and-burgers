"use client";

import React, { useContext } from "react";
import { Box, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import CartContext from "../context/CartContext";
import OnOpenContext from "../context/OnOpenContext";
import HamburgerCard from "./HamburgerCard";
import { Hamburger } from "@/types/Hamburger";

interface Props {
  hamburgers: Hamburger[];
}

export default function HamburgerMenu({ hamburgers }: Props) {
  const { selectHamburger } = useContext(CartContext);

  const handleHamburgerClick = (id: string) => {
    selectHamburger(id);
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
      </Box>
    </OnOpenContext.Provider>
  );
}
