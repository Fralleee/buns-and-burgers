"use client";

import { Hamburger } from "@/types/Hamburger";
import { Box, Heading, Button, Center } from "@chakra-ui/react";
import Image from "next/image";
import { useOnOpen } from "../context/OnOpenContext";

interface Props {
  hamburger: Hamburger;
}

export default function HamburgerCard({ hamburger }: Props) {
  const onOpen = useOnOpen();

  const handleOpen = (): void => {
    onOpen(hamburger.id);
  };

  const imageUrl = hamburger.imageUrl || "/placeholder-image.jpg";
  const blurDataURL = hamburger.blurDataURL || "";
  const name = hamburger.name || "Unknown Hamburger";

  return (
    <Box onClick={handleOpen} as="button" borderRadius={16} overflow={"hidden"} maxWidth={320} marginInline={"auto"}>
      <Box position={"relative"} aspectRatio={1}>
        <Center position={"relative"}>
          <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,.7), transparent)" />
          <Image placeholder="blur" src={imageUrl} alt={`Image of ${name}`} width={480} height={480} blurDataURL={blurDataURL} />
        </Center>
        <Box position="absolute" bottom={8} right={8} textAlign={"right"} textShadow={"dark-lg"}>
          <Heading fontSize={[18, 24, 32]}>{name}</Heading>
          <Heading>${hamburger.basePrice}</Heading>
        </Box>
      </Box>
      <Button colorScheme="red" width={"100%"} borderRadius={0} size={["sm", "md", "lg"]} zIndex={1}>
        Get it
      </Button>
    </Box>
  );
}
