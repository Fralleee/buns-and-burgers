"use client";

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  return (
    <Box marginInline={"auto"} fontSize={"2xl"} fontWeight={"bold"}>
      <Breadcrumb separator={<BreadcrumbSeparator>|</BreadcrumbSeparator>}>
        <BreadcrumbItem isCurrentPage={pathname === "/"}>
          <BreadcrumbLink href="/">Start</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage={pathname === "/hamburgers"}>
          <BreadcrumbLink href="/hamburgers">Hamburgers</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage={pathname === "/orders"}>
          <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
};

export default Breadcrumbs;
