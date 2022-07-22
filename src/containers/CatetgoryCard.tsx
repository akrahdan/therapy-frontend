import {
  AspectRatio,
  Box,
  BoxProps,
  Image,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Event } from "services/event";
import { Category } from "./catData";
interface Props {
  category: Event;
  index: number;
  handleOpen?: (index: number) => void;
  rootProps?: BoxProps;
}

export const CategoryCard = (props: Props) => {
  const { category, handleOpen, rootProps, index } = props;
  return (
    <Box
      position="relative"
      key={category.Title}
      borderRadius="xl"
      overflow="hidden"
      {...rootProps}
    >
      <Link onClick={() => handleOpen(index)}>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={category.Photos[0]?.url}
            alt={category.Title}
            fallback={<Skeleton />}
          />
        </AspectRatio>
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, transparent 60%, gray.900)"
          boxSize="full"
        />
        <Box position="absolute" bottom="6" width="full" textAlign="center">
          <Text color="white" fontSize="lg" fontWeight="semibold">
            {category.Title}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};
