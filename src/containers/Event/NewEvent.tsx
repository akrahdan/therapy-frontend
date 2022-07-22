import {
  AspectRatio,
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
  Image,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Select,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FiPlay } from "react-icons/fi";
import * as React from "react";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Dropzone } from "./Dropzone";
import { useAppSelector } from "store/hooks";
import { selectResidents } from "state/resident/residentSlice";
import { useGetResidentsQuery } from "services/resident";
import { useCreateEventMutation } from "services/event";
import type { Resident } from "services/resident";
import { useSaveMediaMutation } from "services/media";

type ResidentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewEvent = ({ isOpen, onClose }: ResidentProps) => {
  const { data: residentQuery } = useGetResidentsQuery();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [resident, setResident] = useState<number>();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [playing, setPlaying] = useState<boolean>(true);

  const selectedResidents = useAppSelector(selectResidents);

  const [saveMedia, { data: mediaData, error }] = useSaveMediaMutation();
  const [createEvent] = useCreateEventMutation();

  const submitEvent = async () => {
    if (title) {
      try {
        const response = await createEvent({
          data: {
            Title: title,
            resident,
            Description: description,
          },
        }).unwrap();
        if (photos.length) {
          let formData = new FormData();
          formData.append("ref", "api::event.event");
          formData.append("refId", `${response.data.id}`);
          formData.append("field", "Photos");
      
         
          const result = await handleUpload(photos, formData);
        }
        if (songs.length) {
          const formData = new FormData();
          formData.append("ref", "api::event.event");
          formData.append("refId", `${response.data.id}`);
          formData.append("field", "Songs");
          const result = await handleUpload(songs, formData);
        }
        onClose();
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  const handleUpload = async (files = [], formData: FormData) => {
    
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const response = await saveMedia(formData).unwrap();
      console.log(response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  React.useEffect(() => {
    setResidents(selectedResidents);
  }, [selectedResidents]);

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
                    New Event
                  </Text>
                </Box>
              </Stack>
              <Divider />
              <Stack spacing="5" divider={<StackDivider />}>
                <FormControl id="title">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "1" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Event Title</FormLabel>
                    <Input
                      maxW={{ md: "3xl" }}
                      placeholder="Event title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </Stack>
                </FormControl>

                <FormControl id="description">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "1" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Event Description</FormLabel>
                    <Textarea
                      maxW={{ md: "3xl" }}
                      placeholder="A short descripion of event"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Stack>
                </FormControl>
                <FormControl id="resident">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "1" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Event By</FormLabel>
                    <Select
                      maxW={{ md: "3xl" }}
                      value={resident}
                      placeholder="Select resident"
                      onChange={(event) =>
                        setResident(Number(event.target.value))
                      }
                    >
                      {residents.map((resident) => (
                        <option value={resident.id}>
                          {resident.ResidentId}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                </FormControl>

                <FormControl id="picture">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "1" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Photos</FormLabel>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={{ base: "1.5", md: "1" }}
                      justify="right"
                    >
                      {photos.map((photo) => (
                        <Image
                          boxSize="100px"
                          objectFit="cover"
                          borderRadius="full"
                          src={photo.preview}
                          alt={photo.name}
                        />
                      ))}
                    </Stack>
                    {!photos.length && (
                      <Stack
                        spacing={{ base: "3", md: "5" }}
                        direction={{ base: "column", sm: "row" }}
                        width="full"
                        maxW={{ md: "3xl" }}
                      >
                        <Dropzone width="full" onFileUpload={setPhotos} />
                      </Stack>
                    )}
                  </Stack>
                </FormControl>

                <FormControl id="videos">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: "1.5", md: "1" }}
                    justify="space-between"
                  >
                    <FormLabel variant="inline">Songs</FormLabel>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={{ base: "1.5", md: "1" }}
                      justify="right"
                    >
                      {songs.map((song) => (
                        <ReactPlayer
                          url={song.preview}
                          width="100%"
                          height="100%"
                          controls
                          onPlay={() => setPlaying(true)}
                          playing={playing}
                          onPause={() => setPlaying(false)}
                          playIcon={<FiPlay />}
                          onReady={() => console.log("Ready")}
                          onStart={() => console.log("Started")}
                          pip
                          alt={song.name}
                        />
                      ))}
                    </Stack>
                    {!songs.length && (
                      <Stack
                        spacing={{ base: "3", md: "5" }}
                        direction={{ base: "column", sm: "row" }}
                        width="full"
                        maxW={{ md: "3xl" }}
                      >
                        <Dropzone width="full" onFileUpload={setSongs} />
                      </Stack>
                    )}
                  </Stack>
                </FormControl>

                <Flex direction="row-reverse">
                  <Button onClick={submitEvent} variant="primary">Save</Button>
                </Flex>
              </Stack>
            </Stack>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
