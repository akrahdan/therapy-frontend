import {
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
import * as React from "react";
import { FiPlay } from "react-icons/fi";
import ReactPlayer from "react-player";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

import { useGetEventsQuery } from "services/event";
import { useDeleteEventMutation } from "services/event";
import { useAppSelector } from "store/hooks";
import { selectEvents } from "state/event/eventSlice";
import { useEffect } from "react";
import type { Event } from "services/event";
import { useState } from "react";

export const EventsTable = (props: TableProps) => {
  const { data: eventsQuery } = useGetEventsQuery();
  const [deleteEvent] = useDeleteEventMutation();
  const selectedEvents = useAppSelector(selectEvents);
  const [events, setEvents] = useState<Event[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
     try {
      const response = await deleteEvent(id).unwrap();
     } catch (error) {
      console.log('Error: ', error);
     }
  }

  useEffect(() => {
    setEvents(selectedEvents);
  }, [selectedEvents]);

  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>Title</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>

          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>Description</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>

          <Th>Photos</Th>
          <Th>Songs</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {events.map((event) => (
          <Tr key={event.id}>
            <Td>
              <HStack spacing="3">
                <Checkbox />
                <Avatar name={event.Title} src={""} boxSize="10" />
                <Box>
                  <Text fontWeight="medium">{event.Title}</Text>
                  {/* <Text color="muted">{member.handle}</Text> */}
                </Box>
              </HStack>
            </Td>

            <Td>
              <Text fontWeight="medium">{event.Description}</Text>
            </Td>

            <Td>
              <HStack spacing="3">
                <Avatar
                  name={event.Photos[0]?.name}
                  src={`http://localhost:1337${event.Photos[0]?.url}`}
                  boxSize="10"
                />
              </HStack>
            </Td>

            <Td>
              <HStack spacing="3">
                <ReactPlayer
                  url={`http://localhost:1337${event.Songs[0]?.url}`}
                  width="100%"
                  height="100%"
                  controls
                  onPlay={() => setPlaying(true)}
                  playing={playing}
                  onPause={() => setPlaying(false)}
                  // playIcon={<FiPlay />}
                  onReady={() => console.log("Ready")}
                  onStart={() => console.log("Started")}
                  light
                  alt={event.Songs[0]?.name}
                />
              </HStack>
            </Td>

            <Td>
              <HStack spacing="1">
                <IconButton
                  onClick={() => handleDelete(event.id)}
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Delete Event"
                />
                <IconButton
                  icon={<FiEdit2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Edit Event"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
