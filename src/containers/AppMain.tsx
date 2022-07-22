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
import { FiDownloadCloud } from "react-icons/fi";

// import state
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setCredentials } from "state/auth/authSlice";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { images } from "./_data";
import { Gallery } from "./Gallery";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Video } from "./Video";
import { Resident } from "./Residents/Resident";
import { Events } from "./Events";
import { Signin } from "./Signup/Signin";

import { Event } from "./Event";
import { useState } from "react";
import { useGetCurrentUserQuery } from "services/auth";

export const AppMain = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const dispatch = useAppDispatch();
  const { data } = useGetCurrentUserQuery();
  if (data) {
    const token = localStorage.getItem('token');
    const userResponse = {
      user: data,
      token: token || ''
    }
    dispatch(setCredentials(userResponse))
  }
  // const [authenticated, setAuthenticated] = useState(true);
  if (!data) return <Signin />
  return (
    <Router>
      <Flex
        as="section"
        direction={{ base: "column", lg: "row" }}
        height="100vh"
        bg="bg-canvas"
        overflowY="auto"
      >
        {isDesktop ? <Sidebar /> : <Navbar />}
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
                >
                  
                </Stack>
                <Routes>
                  <Route path="/" element={<Events />} />
                  <Route path="/songs" element={<Video />} />
                  <Route path="/residents" element={<Resident />} />
                  <Route path="/resident/events" element={<Events />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/events" element={< Event />} />
                  {/* <Route path="/resident/new" element={<NewResident />} /> */}
                   
                </Routes>
                
              </Stack>
            </Container>
          </Box>
        </Box>
      </Flex>
    </Router>
  );
};
