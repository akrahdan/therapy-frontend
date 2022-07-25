import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import * as React from 'react'
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { LogoIcon } from './Logo'
import { useAuthenticate } from 'containers/Authentication'
import { GoogleIcon } from './ProviderIcons'
import { setCredentials } from 'state/auth/authSlice'
import { useLoginMutation } from 'services/auth'

interface SigninProps extends StackProps {
  handleRedirect?: (val: boolean) => void
}



export const SignInForm = (props: StackProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { onLogin } = useAuthenticate();
  
 


  const handleSubmit = async () => {
    if (password && email) {
       await onLogin(email, password);
    }
  }

  
  return (
    <Stack spacing="8" {...props}>
      <Stack spacing="6">
        {isMobile && <LogoIcon />}
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Log in to your account
          </Heading>
   
        </Stack>
      </Stack>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input value={email} id="email" placeholder="Enter your email" type="email" onChange={event => setEmail(event.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input value={password} id="password" placeholder="********" type="password" onChange={(event) => setPassword(event.target.value)}/>
          </FormControl>
        </Stack>
        <HStack justify="space-between">
          <Checkbox defaultChecked>Remember me</Checkbox>
          <Button variant="link" colorScheme="blue" size="sm">
            Forgot password
          </Button>
        </HStack>
        <Stack spacing="4">
          <Button variant="primary" onClick={handleSubmit}>Sign in</Button >
          <Button variant="secondary" leftIcon={<GoogleIcon boxSize="5" />} iconSpacing="3" >
            Sign in with Google
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
