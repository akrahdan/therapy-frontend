import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactPlayer from "react-player";
import type { Media } from "services/media";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  songs: Media[];
};

export const EventsVideoModal = ({
  onClose,
  onOpen,
  isOpen,
  songs = [],
}: ModalProps) => {
  const [playing, setPlaying] = useState<boolean>(true);
  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
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
              {songs.length && (<ReactPlayer
                url={songs[0]?.url}
                width="100%"
                height="100%"
                controls
                onPlay={() => setPlaying(true)}
                playing={playing}
                onPause={() => setPlaying(false)}
                alt={songs[0].name}
              />)}
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
