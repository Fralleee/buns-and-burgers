"use client";

import { Box, Divider, Heading, Button } from "@chakra-ui/react";
import { MdShoppingBasket } from "react-icons/md";
import Image from "next/image";
import NextLink from "next/link";

const blurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAFRSURBVChTHZDLSgNBEEVPT2cyz0xACQQFH4mgEsHHVj9AP8GFa3d+Q3b5JsG1C3EjCooohIAaUGLM5DVJZtpKuhZNFbfuvXWVG0bGGIVlKTwnT6fXJwo8ZmkGxpBmGUrKmvfy4whoOJlx3bji/HgftEZZWggsMsyCCN915lgOtyv8/sXM0NSq66QCULKgBaxtx6vbOWlkMJcbxzH3by264yln5QK9WcZfMsVSyjAcjthcLuAJbZoqbJ2n2fpcsG2HeZEWJ6XAr2s7x8l+jYI9pnFxyEaui79Upj0Wb57P53cHtVosmsujKi92wOPzK5VA85MkiCX2tqq8dxNu7h7QRuXqlZUSThhxsLvMKO3z1B7w3Z+iHR9X1FSvJwnkfXO6s8Zt84vIdZlIdvPnyoGjZIISaT2IUVEQmt2iJxFoHjoxI2MtospkIRDwTmjzMUz4B2K0eJ/NAoybAAAAAElFTkSuQmCC";

export default function Home() {
  return (
    <Box position={"relative"} display={"flex"} paddingTop={[4, 6, 8, 12, 16, 20, 24]} marginInline={"auto"} width={"100%"} minHeight={480} aspectRatio={3 / 2} maxWidth={"1600"}>
      <Box display={"flex"} flexDirection={"column"} marginInline={["auto", "auto", 0]} alignItems={"center"} zIndex={1} paddingBlockStart={16}>
        <Image src="/header.svg" alt="Vercel Logo" width={128} height={128} priority />
        <Heading opacity={0.7} fontSize={{ base: "32px", md: "48px", lg: "64px", xl: "80px", "2xl": "96px" }}>
          BUNS AND BURGERS
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
          Where Artisan Buns and Handcrafted Burgers Create a Taste Sensation!
        </Heading>
        <Button colorScheme="red" marginBlockStart={"2em"} rightIcon={<MdShoppingBasket />} size={"lg"} as={NextLink} href="hamburgers">
          Order now
        </Button>
      </Box>

      <Box
        position={"absolute"}
        width={["100%", "100%", 512, 640, 720, 1000]}
        right={0}
        top={0}
        bottom={0}
        zIndex={-1}
        backgroundSize={"contain"}
        backgroundRepeat={"no-repeat"}
        opacity={[0.4, 0.4, 1]}
        boxShadow={"inset"}
        backgroundPosition={["bottom center", "bottom center", "bottom right"]}
        backgroundImage={"https://res.cloudinary.com/dugkeawjq/image/upload/f_auto,q_auto/coadzsqs4lmmzercbhuk"}></Box>
    </Box>
  );
}
