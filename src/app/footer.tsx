"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      backgroundImage="./texture_3.jpg"
      backgroundRepeat={"repeat"}
      minHeight={450}
      display={"flex"}
      gap={"3em"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      paddingBlockStart={"2em"}
      flexWrap={"wrap"}>
      <Box backgroundColor={"black"} borderRadius={100} overflow={"hidden"} display={["none", "none", "block"]}>
        <Image alt="One of our many juicy burgers" src={"/footer/thumb1.png"} width={160} height={240} />
      </Box>
      <Box backgroundColor={"black"} borderRadius={100} overflow={"hidden"} display={["none", "none", "block"]}>
        <Image alt="Why settle for less" src={"/footer/thumb2.png"} width={160} height={240} />
      </Box>
      <Box backgroundColor={"black"} borderRadius={100} overflow={"hidden"} display={["none", "none", "block"]}>
        <Image alt="When you can have it all" src={"/footer/thumb3.png"} width={160} height={240} />
      </Box>

      <Box paddingInline={"2em"} marginInlineStart={["0", "0", "4em"]} maxWidth={"45ch"}>
        <Heading textShadow={"dark-lg"} marginBlockEnd={"0.25em"}>
          Indulge in Burger Bliss: Savor Every Bite!
        </Heading>
        <Text textShadow={"dark-lg"} fontSize={"sm"} marginBlock={"1em"}>
          We believe in serving you the best of the best. We take pride in our commitment to using only the freshest ingredients in every burger we create.Our juicy, handcrafted
          patties are made from 100% premium beef, sourced from local farms known for their high-quality meat.
        </Text>
        <Text fontSize={"sm"}>Discover a world of burger bliss at our restaurant, where fresh ingredients meet culinary excellence!</Text>
      </Box>
    </Box>
  );
}
