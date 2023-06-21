"use client";

import Image from "next/image";
import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Price from "../hamburgers/(configuration)/Price";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("/api/orders");
        const json = await response.json();
        const data = json.map((order: any) => ({ id: order.id, ...JSON.parse(order.rawData) }));
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <Box position={"relative"} minHeight={"100vh"}>
      <Box textAlign={"center"} display={"flex"} flexDirection={"column"} alignItems={"center"} zIndex={1} paddingBlockStart={16}>
        <Image src="/header.svg" alt="Logo" width={128} height={128} priority />
        <Heading opacity={0.7} fontSize={{ base: "48px", lg: "64px", xl: "96px" }}>
          ORDER HISTORY
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
          Where Past Cravings and Regretful Choices Unite!
        </Heading>
      </Box>
      <VStack spacing={4} align="start" maxWidth={720} marginInline={"auto"} marginBlock={"3em"}>
        {orderHistory.map((order: any) => (
          <Box key={order.id} borderWidth={1} borderRadius="md" padding={4} width="100%">
            <Text fontWeight="bold">Order ID: {order.id}</Text>
            <Divider my={2} />
            <VStack spacing={4} align="start" mt={4} gap={0}>
              {order.orderHamburgers.map((hamburger: any, index: number) => (
                <Box key={hamburger.id + index}>
                  <Text fontWeight="bold">{hamburger.name}</Text>
                  {hamburger.extras.length > 0 && (
                    <VStack spacing={2} align="start" gap={0}>
                      {hamburger.extras.map((extraIngredient: any, index: number) => (
                        <Text key={hamburger.id + extraIngredient.id + index}>
                          + {extraIngredient.ingredient.name} {extraIngredient.count > 0 && `(${extraIngredient.count})`}
                        </Text>
                      ))}
                    </VStack>
                  )}
                  <Divider my={2} />
                </Box>
              ))}
              <Price price={order.totalCost} />
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default OrderHistory;
