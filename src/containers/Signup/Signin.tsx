import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  DarkMode,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { SignInForm } from "./SignInForm";

export const Signin = () => {
  const navigate = useNavigate();
 
  return (
    <Flex
      minH={{ base: "auto", md: "100vh" }}
      bgGradient={useBreakpointValue({
        md: mode(
          "linear(to-r, blue.600 50%, white 50%)",
          "linear(to-r, blue.600 50%, gray.900 50%)"
        ),
      })}
    >
      <Flex maxW="8xl" mx="auto" width="full">
        <Box flex="1" display={{ base: "none", md: "block" }}>
          <DarkMode>
            <Flex
              direction="column"
              px={{ base: "4", md: "8" }}
              height="full"
              color="on-accent"
            >
              <Flex align="center" h="24">
                {/* <Logo /> */}
              </Flex>
              <Flex flex="1" align="center">
                <Stack spacing="8">
                  <Stack spacing="6">
                    <Heading size={useBreakpointValue({ md: "lg", xl: "xl" })}>
                      Reminiscence Therapy for Elderly Care
                    </Heading>
                    <Text fontSize="lg" maxW="md" fontWeight="medium">
                      Login to administer the therapy
                    </Text>
                  </Stack>
                  <HStack spacing="4">
                    <AvatarGroup
                      size="md"
                      max={useBreakpointValue({ base: 2, lg: 5 })}
                      borderColor="on-accent"
                    >
                      <Avatar
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                      />
                      <Avatar
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                      <Avatar
                        name="Prosper Otemuyiwa"
                        src="https://bit.ly/prosper-baba"
                      />
                      <Avatar
                        name="Christian Nwamba"
                        src="https://bit.ly/code-beast"
                      />
                    </AvatarGroup>
                  </HStack>
                </Stack>
              </Flex>
              <Flex align="center" h="24">
                <Text color="on-accent-subtle" fontSize="sm">
                  © 2022 DECRS. All rights reserved.
                </Text>
              </Flex>
            </Flex>
          </DarkMode>
        </Box>
        <Center flex="1">
          <SignInForm
            px={{ base: "4", md: "8" }}
            py={{ base: "12", md: "48" }}
            width="full"
            maxW="md"
          />
        </Center>
      </Flex>
    </Flex>
  );
};
