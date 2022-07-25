import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
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
import { AuthProvider, ProtectedRoute } from "./Authentication";
import { Dashboard } from "./Dashboard";
import { Video } from "./Video";
import { Resident } from "./Residents/Resident";
import { Events } from "./Events";
import { Signin } from "./Signup/Signin";

import { Event } from "./Event";
import { useEffect, useState } from "react";
import { useAuth } from "store/useAuth";
import { useGetCurrentUserQuery, User } from "services/auth";

export const AppMain = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { user } = useAuth();

 
  
 
  return (
    <Router>
      <AuthProvider>
        <Flex
          as="section"
          direction={{ base: "column", lg: "row" }}
          height="100vh"
          bg="bg-canvas"
          overflowY="auto"
        >
          {user ? isDesktop ? <Sidebar /> : <Navbar /> : null}
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/songs"
              element={
                <ProtectedRoute>
                  <Video />
                </ProtectedRoute>
              }
            />
            <Route
              path="/residents"
              element={
                <ProtectedRoute>
                  <Resident />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resident/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Event />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/resident/new" element={<NewResident />} /> */}
          </Routes>
        </Flex>
      </AuthProvider>
    </Router>
  );
};
