import {
  Button,
  Center,
  CenterProps,
  HStack,
  Icon,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import RDropzone, { useDropzone } from "react-dropzone";


interface DropzoneProps extends CenterProps {
  onFileUpload: (files) => void;
}
export const Dropzone = (props: DropzoneProps) => {
  // const [files, setFiles] = useState<File[]>([]);
  
  return (
    <Center
      borderWidth="1px"
      borderRadius="lg"
      px="6"
      py="4"
      bg={useColorModeValue("white", "gray.800")}
      {...props}
    >
      <VStack spacing="3">
        <Square size="10" bg="bg-subtle" borderRadius="lg">
          <Icon as={FiUploadCloud} boxSize="5" color="muted" />
        </Square>
        <VStack spacing="1">
          <HStack spacing="1" whiteSpace="nowrap">
            <RDropzone
              accept={{ 'image/*': [],
              'video/*' : [],
              'audio/*': []
            }}
              onDrop={(acceptedFiles) => {
                console.log(acceptedFiles);
                props.onFileUpload(
                  acceptedFiles.map((file) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file),
                    })
                  )
                );
              }}
              onDragEnter={(files) => console.log(files)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button variant="link" colorScheme="blue" size="sm">
                    Click to upload
                  </Button>
                  <Text fontSize="sm" color="muted">
                    or drag and drop
                  </Text>
                </div>
              )}
            </RDropzone>
          </HStack>
          <Text fontSize="xs" color="muted">
            PNG, JPG or GIF up to 2MB
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
};
