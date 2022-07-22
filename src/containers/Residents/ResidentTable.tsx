import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import { Resident, useGetResidentsQuery } from "services/resident";
import { useAppSelector } from "store/hooks";
import { selectResidents } from "state/resident/residentSlice";
import { useDeleteResidentMutation } from "services/resident";
import { useState } from "react";
import { useEffect } from "react";

export const ResidentTable = (props: TableProps) => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const { data: residentQuery } = useGetResidentsQuery();
  const [deleteResident] = useDeleteResidentMutation();
  const selectedResidents = useAppSelector(selectResidents);

  useEffect(() => {
    setResidents(selectedResidents);
  }, [selectedResidents]);
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>ID</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th>Resident ID</Th>
          <Th>Room Number</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {residents.map((member) => (
          <Tr key={member.id}>
            <Td>
              <HStack spacing="3">
                <Checkbox />
                <Box>
                  <Text fontWeight="medium">{member.id}</Text>
                </Box>
              </HStack>
            </Td>

            <Td>
              <Text color="muted">{member.id}</Text>
            </Td>
            <Td>
              <Text color="muted">{member.ResidentId}</Text>
            </Td>
            <Td>
              <Text color="muted">{member.RoomNo}</Text>
            </Td>

            <Td>
              <HStack spacing="1">
                <IconButton
                  onClick={() => deleteResident(member.id)}
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Delete resident"
                />
                <IconButton
                  icon={<FiEdit2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Edit resident"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
