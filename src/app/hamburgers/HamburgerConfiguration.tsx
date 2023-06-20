import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Heading, Text } from "@chakra-ui/react";
import { ExtraIngredientsWithCount, Hamburger, OrderHamburger } from "@/types/Hamburger";
import Extras from "./(configuration)/Extras";
import Ingredients from "./(configuration)/Ingredients";
import Price from "./(configuration)/Price";

interface Props {
  hamburger: Hamburger | null | undefined;
  isOpen: boolean;
  onClose: any;
  onAdd: (hamburger: OrderHamburger) => void;
}

export default function HamburgerConfiguration({ hamburger, isOpen, onClose, onAdd }: Props) {
  const [extras, setExtras] = useState<ExtraIngredientsWithCount[]>([]);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setExtras(hamburger?.extras.map(extra => ({ ...extra, count: 0 })) || []);
    setPrice(hamburger?.basePrice ?? 0);
  }, [hamburger]);

  const handleUpdateExtrasCount = (id: string, count: number) => {
    const updatedExtras =
      extras?.map(extra => {
        if (extra.id === id) {
          return { ...extra, count };
        }
        return extra;
      }) || [];
    setExtras(updatedExtras);
    setPrice((hamburger?.basePrice ?? 0) + updatedExtras?.reduce((acc, extra) => acc + extra.price * extra.count, 0) ?? 0);
  };

  const handleAddToCart = () => {
    const orderHamburger: OrderHamburger = {
      ...hamburger!,
      extras: extras?.filter(extra => extra.count > 0) ?? [],
      price,
    };
    onAdd(orderHamburger);
    onClose();
  };

  if (!hamburger) return null;
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background={"#080C10"} border={"1px solid gray"} boxShadow={"dark-lg"}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={"grid"} placeItems={"center"} gap={"1em"}>
            <Image placeholder="blur" src={hamburger.imageUrl!} alt={hamburger.name!} width={192} height={192} blurDataURL={hamburger.blurDataURL!} />
            <Heading>{hamburger.name}</Heading>
            <Text>{hamburger.description}</Text>
            <Ingredients ingredients={hamburger.ingredients} />
          </Box>
          <Extras extraIngredients={extras} onUpdateCount={handleUpdateExtrasCount} />
          <Price price={price} />
        </ModalBody>
        <ModalFooter>
          <Button width={"100%"} borderRadius={0} colorScheme="red" size={["sm", "md", "lg"]} zIndex={1} onClick={handleAddToCart}>
            Add to order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
