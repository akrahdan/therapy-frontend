import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  
  extendTheme
} from "@chakra-ui/react"
import '@fontsource/inter/variable.css'
import 'focus-visible/dist/focus-visible'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { theme as baseTheme} from '@chakra-ui/pro-theme'
import { AppMain } from "./containers/AppMain"
import * as components from './components'
import * as foundations from './foundations'



export const theme: Record<string, any> = extendTheme({
  ...foundations,
  components: { ...components },
  colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  space: {
    '4.5': '1.125rem',
  },
})

export const App = () => (

  <ChakraProvider theme={theme} >
     <AppMain />
  </ChakraProvider>
)
