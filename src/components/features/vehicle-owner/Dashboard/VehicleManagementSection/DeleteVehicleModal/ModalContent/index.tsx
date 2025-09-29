import { Stack, Center, Card, Flex, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconAlertTriangle } from "@tabler/icons-react";

interface ModalContentProps {
  vehicleName: string;
  vehicleLicensePlate: string;
}
export default function ModalContent({
  vehicleName,
  vehicleLicensePlate,
}: ModalContentProps) {
  return (
    <Stack align="center" px="md" pb="lg">
      <Center h={60} w={60} bg="pink.1" style={{ borderRadius: "50%" }}>
        <IconAlertTriangle size={30} color="red" />
      </Center>
      <Text fz="md" c="black" fw={500}>
        Are you sure?
      </Text>
      <Text fz="sm" ta="center">
        You are about to delete{" "}
        <span style={{ fontWeight: 500, color: "#424242ff" }}>
          {vehicleName}
        </span>{" "}
        with plate number
        <span style={{ fontWeight: 500, color: "#424242ff" }}>
          {" "}
          {vehicleLicensePlate}
        </span>
      </Text>
      <Card radius="md" bg="pink.1" px="xl" py="lg">
        <Text fz="xs" ta="center" c="red">
          <span style={{ fontWeight: 500 }}> Warning: </span> This action cannot
          be undone. All booking history and data associated with this vehicle
          will be permanently removed.
        </Text>
      </Card>
      <Flex gap="md" w="100%">
        <Button
          fullWidth
          h="2.5rem"
          variant="outline"
          color="black"
          onClick={() => {
            modals.closeAll();
          }}
        >
          Cancel
        </Button>
        <Button fullWidth h="2.5rem">
          Delete Vehicle
        </Button>
      </Flex>
    </Stack>
  );
}
