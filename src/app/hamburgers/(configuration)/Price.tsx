import { Box, Stat, StatNumber } from "@chakra-ui/react";

interface Props {
  price: number;
}

export default function Price({ price }: Props) {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
      <Stat>
        <StatNumber fontSize={"5xl"} fontWeight={"bold"}>
          ${(Math.round(price * 100) / 100).toFixed(2)}
        </StatNumber>
      </Stat>
    </Box>
  );
}
