"use client";

import React, { useContext } from "react";
import { SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid maxW={1280} columns={[1, 1, 2, 2, 3]} gap={[6, 12, 24]} marginBlock={[12, 24]} marginInline={"auto"} paddingInline={12}>
        {hamburgers.map(hamburger => (
          <HamburgerCard key={hamburger.id} hamburger={hamburger} />
        ))}
      </SimpleGrid>
    </OnOpenContext.Provider>
  );
}
