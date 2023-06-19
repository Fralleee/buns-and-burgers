"use client";

import { Hamburgers, Ingredients } from "@/xata";
import { Box, Divider, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import HamburgerCard from "./HamburgerCard";
import HamburgerConfiguration from "./HamburgerConfiguration";

interface Props {
  hamburgers: (Hamburgers & { ingredients: (Ingredients & { count: number })[]; extras: Ingredients[] })[];
}

export default function HamburgerOptions({ hamburgers }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box position={"relative"} minHeight={"100vh"}>
      <Box textAlign={"center"} display={"flex"} flexDirection={"column"} alignItems={"center"} zIndex={1} paddingBlockStart={16}>
        <Image src="/header.svg" alt="Vercel Logo" width={128} height={128} priority />
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
        {hamburgers.map((record, index) => (
          <HamburgerCard key={record.id} hamburger={record} onOpen={onOpen} />
        ))}
      </SimpleGrid>
      {/* <Grid marginBlock={24} maxW={1280} marginInline={"auto"} templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={24}>

      </Grid> */}
      <HamburgerConfiguration isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
