import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
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
} from '@chakra-ui/react'
import * as React from 'react'
import {
  FiBarChart2,
  FiBookmark,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiVideo,
  FiPlayCircle,
  FiYoutube,
  FiUsers,
  FiCalendar
} from 'react-icons/fi'
import { useAuth } from 'store/useAuth'
import { Logo } from './Logo'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'

export const Sidebar = () => {
  const { user } = useAuth();


  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        bg="bg-surface"
        overflowY="auto"
        boxShadow={useColorModeValue('md', 'sm-dark')}
        maxW={{ base: 'full', sm: 'xs' }}
        py={{ base: '6', sm: '8' }}
        px={{ base: '4', sm: '6' }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
            {/* <Logo /> */}
             <InputGroup>
             
               <Input placeholder="Search" />
             </InputGroup>
            <Stack spacing="1">
              <NavButton to="/" label="Home" icon={FiHome} />
              <NavButton to="/album" label="Albums" icon={FiBarChart2} aria-current="page" />
              <NavButton to="/songs" label="Videos" icon={FiPlayCircle} />
              <NavButton to="/residents" label="Residents" icon={FiUsers} />
              <NavButton to="/events" label="Events" icon={FiCalendar} />
            </Stack>
          </Stack>
          <Stack spacing={{ base: '5', sm: '6' }}>
            <Stack spacing="1">
              <NavButton to="/settings" label="Settings" icon={FiSettings} />
            </Stack>
            
            <Divider />
            <UserProfile
              name={ user?.username}
              image = {null}
              email={ user?.email}
            />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  )
}
