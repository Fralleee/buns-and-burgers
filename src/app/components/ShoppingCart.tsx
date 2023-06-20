"use client";

import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, Text, VStack, Divider, Button, Heading } from "@chakra-ui/react";
import React, { use, useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import { ExtraIngredientsWithCount } from "@/types/Hamburger";
import Price from "../hamburgers/(configuration)/Price";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart = ({ isOpen, onClose }: Props) => {
  const { state, removeFromCart, placeOrder } = useContext(CartContext);

  return (
    <Drawer isOpen={isOpen} blockScrollOnMount={false} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent background={"#080C10"}>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Your Order</Heading>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {state.orderHamburgers.map((orderHamburger, index) => (
              <Box position={"relative"} key={index}>
                <Text>{orderHamburger.name}</Text>
                <Text>Base Price: ${orderHamburger.basePrice}</Text>
                {(orderHamburger.extras as ExtraIngredientsWithCount[]).map((extra, index) => (
                  <Text key={index}>
                    {extra.ingredient?.name} (x{extra.count}): ${extra.price * extra.count}
                  </Text>
                ))}
                <Text>Total: ${(Math.round(orderHamburger.price * 100) / 100).toFixed(2)}</Text>
                <Button position={"absolute"} bottom={"1em"} right={0} colorScheme="red" onClick={() => removeFromCart(index)}>
                  Remove
                </Button>
                <Divider />
              </Box>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter display={"flex"} flexDirection={"column"}>
          <Price price={state.totalCost} />
          <Box>
            <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={placeOrder}>
              Place order
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCart;
