import {
  Avatar,
  Box,
  Button,
  Container,
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
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import * as React from "react";

import { Dropzone } from "../Event/Dropzone";
import { useCreateResidentMutation } from "services/resident";
import { useState } from "react";

type ResidentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewResident = ({ isOpen, onClose }: ResidentProps) => {
  const [createResident, { data, error }] = useCreateResidentMutation();
  const [residentId, setResidentId] = useState<string>();
  const [roomNo, setRoomNo] = useState<string>();

  const handleSubmit = async () => {
    if (residentId && roomNo) {
      try {
        const response = await createResident({
          data: {
            ResidentId: residentId,
            RoomNo: roomNo,
          },
        }).unwrap();
        console.log(response);
        onClose()
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container py={{ base: "4", md: "8" }}>
            <Stack spacing="5">
              <Stack
                spacing="4"
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
              >
                <Box>
                  <Text fontSize="lg" fontWeight="medium">
                    New Resident
                  </Text>
                </Box>
              </Stack>
              <Divider />
              <Stack spacing="5" divider={<StackDivider />}>
                <FormControl id="name">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "8" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Resident ID</FormLabel>
                    <Input
                      maxW={{ md: "3xl" }}
                      value={residentId}
                      onChange={event => setResidentId(event.target.value)}
                      placeholder="Resident ID"
                    />
                  </Stack>
                </FormControl>
                <FormControl id="email">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "8" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Room Number</FormLabel>
                    <Input
                      type="email"
                      maxW={{ md: "3xl" }}
                      value={roomNo}
                      onChange={event => setRoomNo(event.target.value)}
                      placeholder="Room Number"
                    />
                  </Stack>
                </FormControl>
               

                <Flex direction="row-reverse">
                  <Button onClick={handleSubmit} variant="primary">
                    Save
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
