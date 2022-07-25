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

export const Video = () => {
  return (
    <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
      <Box
        bg="bg-canvas"
        borderTopLeftRadius={{ base: "none", lg: "2rem" }}
        height="full"
      >
        <Container py="8" height="full">
          <Stack spacing={{ base: "8", lg: "6" }} height="full">
            <Stack
              spacing="4"
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "start", lg: "center" }}
            ></Stack>
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
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
