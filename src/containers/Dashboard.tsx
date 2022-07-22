import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
  } from "@chakra-ui/react";

import { images } from "./_data";
import { Gallery } from "./Gallery";

export const Dashboard = () => {
    return (
        <Box
        bg="bg-surface"
        borderRadius="lg"
        borderWidth="1px"
        // height="full"
        // maxW="3xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Gallery images={images} />
      </Box>
    );
}