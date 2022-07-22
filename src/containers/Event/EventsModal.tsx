import {
  Box,
  Modal,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { images } from "./_data";
import { Gallery } from "./Gallery";
import type { Media } from "services/media";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  images: Media[]
};

export const EventsModal = ({ onClose, onOpen, isOpen, images }: ModalProps) => {
  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
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
              <ModalCloseButton />
              <Gallery images={images} />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
