import { Box, Text } from "@chakra-ui/react";
import { Ingredients } from "@/xata";

interface Props {
  ingredients: (Ingredients & { count: number })[];
}

export default function Ingredients({ ingredients }: Props) {
  return (
    <Box>
      <Text>
        <strong>Ingredients: </strong>
        <em>
          {ingredients
            .filter(Boolean)
            .map(ingredient => `${ingredient?.name} (${ingredient?.count ?? 1})`)
            .join(", ")}
        </em>
      </Text>
    </Box>
  );
}
