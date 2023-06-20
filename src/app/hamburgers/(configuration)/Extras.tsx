import { Table, Thead, Tbody, Text, Tr, Th, Td, TableCaption, TableContainer, Button, Box } from "@chakra-ui/react";
import { ExtraIngredientsWithCount } from "@/types/Hamburger";

interface Props {
  extraIngredients: ExtraIngredientsWithCount[] | undefined;
  onUpdateCount: (id: string, count: number) => void;
}

export default function Extras({ extraIngredients, onUpdateCount }: Props) {
  return (
    <Box marginBlockStart={"2em"}>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Elevate Your Burger with Extra Ingredients</TableCaption>
          <Thead>
            <Tr>
              <Th>Ingredient</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {extraIngredients?.map(extraIngredient => (
              <Tr key={extraIngredient.id}>
                <Td>{extraIngredient.ingredient?.name}</Td>
                <Td isNumeric>{extraIngredient.price}</Td>
                <Td isNumeric display={"flex"} justifyContent={"flex-end"} gap={"0.5em"}>
                  <Button colorScheme="red" variant={"outline"} size={"xs"} onClick={() => onUpdateCount(extraIngredient.id, Math.max(extraIngredient.count - 1, 0))}>
                    -
                  </Button>
                  <Text>{extraIngredient.count}</Text>
                  <Button colorScheme="red" variant={"outline"} size={"xs"} onClick={() => onUpdateCount(extraIngredient.id, extraIngredient.count + 1)}>
                    +
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
