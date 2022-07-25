import {
  Box,
  Stack,
  SimpleGrid,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import * as React from "react";
import { useAppSelector } from "store/hooks";
import { selectEvents } from "state/event/eventSlice";
import { Event, useGetEventsQuery } from "services/event";
import { ImageWithOverlay } from "./ImageWithOverlay";
import { CategoryCard } from "./CatetgoryCard";
import { categories } from "./catData";
import { EventsVideoModal } from "./Event/EventsVideoModal";
import { EventsModal } from "./Event/EventsModal";
import { handleDialog, textToSpeech } from "./dialog";
import { ALDialog } from "./ALDialog";

// import { QiSession } from "libqi/libs/qimessaging/2/qimessaging";
export const Events = () => {
  const { data: eventsQuery } = useGetEventsQuery();
  const [events, setEvents] = React.useState<Event[]>([]);
  const selectedEvents = useAppSelector(selectEvents);
  const [index, setIndex] = React.useState<number>(0);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [resident, setResident] = React.useState<string>();
  // handleDialog()

  const handleOpen = (inx: number) => {
    setIndex(inx);
    onOpen();
  };

  React.useEffect(() => {
    ALDialog();
  }, [resident]);

  React.useEffect(() => {
    setEvents(selectedEvents);
  }, [selectedEvents]);
  return (
    <>
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
                maxW="7xl"
                mx="auto"
                px={{ base: "4", md: "8", lg: "12" }}
                py={{ base: "6", md: "8", lg: "12" }}
              >
                <Stack
                  height={{ md: "640px" }}
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: "6", md: "10" }}
                  align="stretch"
                >
                  <ImageWithOverlay
                    flex="1"
                    objectPosition="top center"
                    title={events[index]?.Title}
                    onClick={() => {
                      setIndex(0);
                      onOpen();
                    }}
                    description="Dress that feels a little fany for when pajamas aren’t cutting it"
                    src={`${process.env.REACT_APP_API_URL}${events[index]?.Photos[0]?.url}`}
                    alt="Lovely Image"
                  />
                  <Stack
                    spacing={{ base: "6", md: "10" }}
                    maxW={{ md: "400px" }}
                  >
                    <ImageWithOverlay
                      spacing="4"
                      title={events[1]?.Title}
                      onClick={() => {
                        setIndex(1);
                        onOpen();
                      }}
                      src={`${process.env.REACT_APP_API_URL}${events[1]?.Photos[0]?.url}`}
                      alt="Lovely Image"
                    />
                    <ImageWithOverlay
                      spacing="4"
                      title={events[2]?.Title}
                      onClick={() => {
                        setIndex(2);
                        onOpen();
                      }}
                      src={`${process.env.REACT_APP_API_URL}${events[2]?.Photos[0]?.url}`}
                      alt="Lovely Image"
                    />
                  </Stack>
                </Stack>
              </Box>

              <Box
                maxW="7xl"
                mx="auto"
                px={{ base: "4", md: "8", lg: "12" }}
                py={{ base: "6", md: "8", lg: "12" }}
              >
                <Stack spacing={{ base: "6", md: "8", lg: "12" }}>
                  <SimpleGrid
                    columns={{ base: 2, md: 3, lg: 4 }}
                    gap={{ base: "4", md: "6", lg: "8" }}
                  >
                    {events.map((category, inx) => (
                      <CategoryCard
                        index={inx}
                        key={category.Title}
                        category={category}
                        handleOpen={handleOpen}
                      />
                    ))}
                  </SimpleGrid>
                </Stack>
              </Box>
              <EventsModal
                onClose={onClose}
                isOpen={isOpen}
                images={events[index]?.Photos}
              />
            </Stack>
          </Container>
        </Box>
      </Box>

      {/* <EventsVideoModal onClose={onClose} isOpen={isOpen} songs={events[index]?.Songs} /> */}
    </>
  );
};
