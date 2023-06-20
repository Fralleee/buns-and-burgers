"use client";

import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, Text, VStack, Divider, Button, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { ExtraIngredientsWithCount } from "@/types/Hamburger";
import Price from "../hamburgers/(configuration)/Price";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart = ({ isOpen, onClose }: Props) => {
  const { state } = useContext(CartContext);

  return (
    <Drawer isOpen={isOpen} blockScrollOnMount={false} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent background={"#080C10"}>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Your Order</Heading>
        </DrawerHeader>

        <DrawerBody display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
          <VStack spacing={4} align="stretch">
            {state.orderHamburgers.map((orderHamburger, index) => (
              <Box key={index}>
                <Text>{orderHamburger.name}</Text>
                <Text>Base Price: ${orderHamburger.basePrice}</Text>
                {(orderHamburger.extras as ExtraIngredientsWithCount[]).map((extra, index) => (
                  <Text key={index}>
                    {extra.ingredient?.name} (x{extra.count}): ${extra.price * extra.count}
                  </Text>
                ))}
                <Text>Total: ${orderHamburger.price}</Text>
                <Divider />
              </Box>
            ))}
          </VStack>
          <Price price={state.totalCost} />
        </DrawerBody>
        <DrawerFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red">Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCart;
