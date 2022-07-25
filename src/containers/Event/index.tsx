import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  InputLeftElement,
  Avatar,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  // Modal,
  // ModalOverlay,
  // ModalBody,
  // ModalContent,
  // ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import * as React from "react";

import { FiSearch, FiPlus, FiDownloadCloud } from "react-icons/fi";
import { EventsTable } from "./EventsTable";
import { NewEvent } from "./NewEvent";
import { Dropzone } from "./Dropzone";
export const Event = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { onOpen, isOpen, onClose } = useDisclosure();
  //  console.log("Open: ", isOpen)
  return (
    <>
      <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
        <Box
          bg="bg-canvas"
          borderTopLeftRadius={{ base: "none", lg: "2rem" }}
          height="full"
        >
          {/* <Container py="8" height="full">
                <Stack spacing={{ base: "8", lg: "6" }} height="full">
                  <Stack
                    spacing="4"
                    direction={{ base: "column", lg: "row" }}
                    justify="space-between"
                    align={{ base: "start", lg: "center" }}
                  ></Stack>
                 
                </Stack>
              </Container> */}

          <Container py={{ base: "4", md: "8" }} px={{ base: "0", md: 8 }}>
            <Stack spacing={{ base: "8", lg: "6" }} height="full">
              <Stack
                spacing="4"
                direction={{ base: "column", lg: "row" }}
                justify="space-between"
                align={{ base: "start", lg: "center" }}
              >
                <Stack spacing="1"></Stack>
                <HStack spacing="3">
                  <Button
                    leftIcon={<FiPlus />}
                    variant="secondary"
                    onClick={onOpen}
                  >
                    New Event
                  </Button>
                </HStack>
              </Stack>
              <Box
                bg="bg-surface"
                boxShadow={{
                  base: "none",
                  md: useColorModeValue("sm", "sm-dark"),
                }}
                borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
              >
                <Stack spacing="5">
                  <Box px={{ base: "4", md: "6" }} pt="5">
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      justify="space-between"
                    >
                      <Text fontSize="lg" fontWeight="medium">
                        Events
                      </Text>
                      <InputGroup maxW="xs">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiSearch} color="muted" boxSize="5" />
                        </InputLeftElement>
                        <Input placeholder="Search" />
                      </InputGroup>
                    </Stack>
                  </Box>
                  <Box overflowX="auto">
                    <EventsTable />
                  </Box>
                  <Box px={{ base: "4", md: "6" }} pb="5">
                    <HStack spacing="3" justify="space-between">
                      {!isMobile && (
                        <Text color="muted" fontSize="sm">
                          Showing 1 to 5 of 42 results
                        </Text>
                      )}
                      <ButtonGroup
                        spacing="3"
                        justifyContent="space-between"
                        width={{ base: "full", md: "auto" }}
                        variant="secondary"
                      >
                        <Button>Previous</Button>
                        <Button>Next</Button>
                      </ButtonGroup>
                    </HStack>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Container>
          <NewEvent isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
    </>
  );
};
