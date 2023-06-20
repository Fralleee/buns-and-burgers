"use client";

import Image from "next/image";
import { Box, Divider, Heading, List, ListItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
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
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <List>
          {orderHistory.map((order: { id: number; totalPrice: number; rawData: string }) => (
            <ListItem key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total Price: {order.totalPrice}</p>
              <Box maxWidth={600}>
                <pre>{JSON.stringify(JSON.parse(order.rawData), null, 2)}</pre>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default OrderHistory;
