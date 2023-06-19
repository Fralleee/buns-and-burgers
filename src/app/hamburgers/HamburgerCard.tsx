"use client";

import { Hamburgers, Ingredients } from "@/xata";
import { Box, Text, Heading, GridItem, Button, Center } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  hamburger: Hamburgers & { ingredients: (Ingredients & { count: number })[]; extras: Ingredients[] };
  onOpen: any;
}

export default function HamburgerCard({ hamburger, onOpen }: Props) {
  return (
    <Box borderRadius={16} overflow={"hidden"} maxWidth={320} marginInline={"auto"}>
      <Box position={"relative"} aspectRatio={1}>
        <Center position={"relative"}>
          {/* <Center position={"absolute"} bg="tomato" h="100px" color="white">
            This is the Center
          </Center> */}
          <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,.7), transparent)" />
          <Image placeholder="blur" src={hamburger.imageUrl!} alt={hamburger.name!} width={480} height={480} blurDataURL={hamburger.blurDataURL!} />
        </Center>
        <Box position="absolute" bottom={8} right={8} textAlign={"right"} textShadow={"dark-lg"}>
          <Heading fontSize={[18, 24, 32]}>{hamburger.name}</Heading>
          <Heading>${hamburger.basePrice}</Heading>
        </Box>
      </Box>
      <Button width={"100%"} borderRadius={0} colorScheme="red" size={["sm", "md", "lg"]} zIndex={1} onClick={onOpen}>
        Get it
      </Button>
      {/* <Text>{hamburger.description}</Text> */}
      {/* <div>Ingredients</div>
        <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {hamburger.ingredients.filter(Boolean).map(ingredient => (
            <li key={`${hamburger.id}::ingredients${ingredient?.id}`}>
              {(ingredient?.count ?? 1) > 1 && `${ingredient.count}x `}
              {ingredient?.name}
            </li>
          ))}
        </ul>

        <div>Available extras</div>
        <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {hamburger.extras.map(ingredient => (
            <li key={`${hamburger.id}::extra${ingredient?.id}`}>{ingredient?.name}</li>
          ))}
        </ul> */}
    </Box>
  );
}
