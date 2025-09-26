import {
  Button,
  Center,
  Flex,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

export default function PersonalContent() {
  return (
    <Stack py="xl" gap="xl">
      <Flex gap="md" align="center">
        <Center h={100} w={100} bg="red.4" style={{ borderRadius: "50%" }}>
          <Text fz="xxl" c="white" fw={600}>
            HB
          </Text>
        </Center>
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            Haris Baloch
          </Text>
          <Text fz="xs">Renter</Text>
          <Text fz="xs" c="green" fw={500}>
            Verified Account
          </Text>
        </Stack>
      </Flex>
      <Flex gap="xl">
        <TextInput
          w="100%"
          size="md"
          label="Full Name"
          radius="md"
          defaultValue={"Haris Baloch"}
          styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
        />
        <TextInput
          w="100%"
          size="md"
          label="Email Address"
          radius="md"
          defaultValue={"haris@gmail.com"}
          styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
        />
      </Flex>
      <Flex gap="xl">
        <TextInput
          w="100%"
          size="md"
          label="Phone Number"
          radius="md"
          defaultValue={"03480804346"}
          styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
        />
        <TextInput
          w="100%"
          size="md"
          label="City"
          radius="md"
          defaultValue={"Khairpur Mir's"}
          styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
        />
      </Flex>
      <Textarea
        w="100%"
        rows={4}
        size="md"
        label="Address"
        radius="md"
        defaultValue={"MUET Boys Hostel near grid station"}
        styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
      />
      <Button w="20%" fz="xs" size="md">
        Save Changes
      </Button>
    </Stack>
  );
}
