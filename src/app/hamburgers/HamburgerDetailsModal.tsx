import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Heading, Text } from "@chakra-ui/react";
import { ExtraIngredientsWithCount, Hamburger, OrderHamburger } from "@/types/Hamburger";
import Extras from "./(configuration)/Extras";
import Ingredients from "./(configuration)/Ingredients";
import Price from "./(configuration)/Price";
import CartContext from "../context/CartContext";

export default function HamburgerConfiguration() {
  const { state, addToCart, selectHamburger } = useContext(CartContext);
  const [extras, setExtras] = useState<ExtraIngredientsWithCount[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (state.selectedHamburger) {
      const initialExtras = (state.selectedHamburger.extras as ExtraIngredientsWithCount[]).map(extra => ({ ...extra, count: 0 }));
      setExtras(initialExtras);
      setPrice(state.selectedHamburger.basePrice);
    }
    setIsOpen(!!state.selectedHamburger);
  }, [state.selectedHamburger]);

  const handleUpdateExtrasCount = (id: string, count: number) => {
    const updatedExtras =
      extras?.map(extra => {
        if (extra.id === id) {
          return { ...extra, count };
        }
        return extra;
      }) || [];
    setExtras(updatedExtras);
    setPrice((state.selectedHamburger?.basePrice ?? 0) + updatedExtras?.reduce((acc, extra) => acc + extra.price * extra.count, 0) ?? 0);
  };

  const handleAddToCart = () => {
    const orderHamburger: OrderHamburger = {
      ...state.selectedHamburger,
      extras: extras?.filter(extra => extra.count > 0) ?? [],
      price,
    };
    addToCart(orderHamburger);
    close();
  };

  const close = () => {
    selectHamburger(null);
  };

  if (!state.selectedHamburger) return null;
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent background={"#080C10"} border={"1px solid gray"} boxShadow={"dark-lg"}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={"grid"} placeItems={"center"} gap={"1em"}>
            <Image
              placeholder="blur"
              src={state.selectedHamburger.imageUrl!}
              alt={state.selectedHamburger.name!}
              width={192}
              height={192}
              blurDataURL={state.selectedHamburger.blurDataURL!}
            />
            <Heading>{state.selectedHamburger.name}</Heading>
            <Text>{state.selectedHamburger.description}</Text>
            <Ingredients ingredients={state.selectedHamburger.ingredients} />
          </Box>
          <Extras extraIngredients={extras} onUpdateCount={handleUpdateExtrasCount} />
          <Price price={price} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" width={"100%"} borderRadius={0} size={["sm", "md", "lg"]} zIndex={1} onClick={handleAddToCart}>
            Add to order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
