import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react'
import * as React from 'react'
import { Link, To } from 'react-router-dom'


interface NavButtonProps extends ButtonProps {
  icon: As
  label: string
  to: To
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, to, ...buttonProps } = props
  return (
    <Link  to={to}>
      <Button variant="ghost" justifyContent="start" {...buttonProps}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
    </Link>
    
  );
}
