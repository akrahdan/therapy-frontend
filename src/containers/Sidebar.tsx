import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FiMusic,
  FiCamera,
  FiSearch,
  FiSettings,
  FiVideo,
  FiPlayCircle,
  FiYoutube,
  FiUsers,
  FiLogOut,
  FiCalendar,
} from "react-icons/fi";
import { useAuth } from "store/useAuth";
import { useAuthenticate } from "./Authentication";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";

export const Sidebar = () => {
  const { user } = useAuth();
  const { onLogout } = useAuthenticate();
  // const iconColor = useColorModeValue('gray.600', 'gray.400')
  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        bg="bg-surface"
        overflowY="auto"
        boxShadow={useColorModeValue("md", "sm-dark")}
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
            {/* <Logo /> */}
            <InputGroup>
              <Input placeholder="Search" />
            </InputGroup>
            <Stack spacing="1">
              <NavButton
                to="/"
                label="Home"
                icon={FiCamera}
                aria-current="page"
              />
              <NavButton to="/songs" label="Songs" icon={FiMusic} />
              <NavButton to="/residents" label="Residents" icon={FiUsers} />
              <NavButton to="/events" label="Events" icon={FiCalendar} />
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", sm: "6" }}>
            <Stack spacing="1">
              <NavButton to="/settings" label="Settings" icon={FiSettings} />
            </Stack>
            <ButtonGroup size="sm" isAttached variant="outline" onClick={onLogout}>
              <Button>Logout</Button>
              <IconButton aria-label="Logout" icon={<FiLogOut />} />
            </ButtonGroup>
            <Divider />
            <UserProfile
              name={user?.username}
              image={null}
              email={user?.email}
            />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
