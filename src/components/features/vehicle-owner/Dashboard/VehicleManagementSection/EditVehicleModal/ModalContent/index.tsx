import { data } from "@/constants/Data";
import { Button, Flex, Select, Stack, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";

interface ModalContentProps {
  vehicleName: string;
  vehicleNumberPlate: string;
  location: string;
  status: string;
}
export default function ModalContent({
  vehicleName,
  vehicleNumberPlate,
  location,
  status,
}: ModalContentProps) {
  return (
    <Stack pb="lg">
      <TextInput
        w="100%"
        size="md"
        radius="md"
        label="Vehicle Name"
        defaultValue={vehicleName}
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
          },
        }}
      />
      <TextInput
        w="100%"
        size="md"
        radius="md"
        label="Number Plate"
        defaultValue={vehicleNumberPlate}
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
          },
        }}
      />
      <Select
        w="100%"
        size="md"
        radius="md"
        label="Location"
        defaultValue={location}
        data={data.availableCities}
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
          },
        }}
      />
      <Select
        w="100%"
        size="md"
        radius="md"
        label="Status"
        defaultValue={status}
        data={["available", "booked", "inactive"]}
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
          },
        }}
      />
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
          Save Changes
        </Button>
      </Flex>
    </Stack>
  );
}
