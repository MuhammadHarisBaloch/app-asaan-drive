import { Stack, FileInput, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import DocInputBody from "./DocInputBody";

export default function DocInputSection() {
  return (
    <>
      <Stack gap="xxs">
        <Text fz="lg" c="black" fw={600}>
          Driver's License
        </Text>
        <Text fz="xs">
          Upload both front and back sides of your driver's license
        </Text>
      </Stack>
      <DocInputBody
        title={"Front Side"}
        subTitle={"Upload front side of your driver's license"}
        inputField={
          <FileInput
            variant="filled"
            placeholder="Choose file"
            w="20%"
            radius="md"
            multiple
            styles={{
              input: {
                backgroundColor: "#FF0005",
              },
              placeholder: {
                color: "white",
                fontSize: "14px",
              },
            }}
            leftSection={<IconUpload size={18} color="white" />}
          />
        }
      />
      <DocInputBody
        title={"Back Side"}
        subTitle={"Upload back side of your driver's license"}
        inputField={
          <FileInput
            variant="filled"
            placeholder="Choose file"
            w="20%"
            radius="md"
            multiple
            styles={{
              input: {
                backgroundColor: "#FF0005",
              },
              placeholder: {
                color: "white",
                fontSize: "14px",
              },
            }}
            leftSection={<IconUpload size={18} color="white" />}
          />
        }
      />
      <Stack gap="xxs">
        <Text fz="lg" c="black" fw={600}>
          Government Issued ID (CNIC/Passport)
        </Text>
        <Text fz="xs">
          Upload both front and back sides of your national ID card, passport,
          or other government-issued identification
        </Text>
      </Stack>
      <Text></Text>
      <DocInputBody
        title={"Front Side"}
        subTitle={"Upload front side of your CNIC ID"}
        inputField={
          <FileInput
            variant="filled"
            placeholder="Choose file"
            w="20%"
            radius="md"
            multiple
            styles={{
              input: {
                backgroundColor: "#FF0005",
              },
              placeholder: {
                color: "white",
                fontSize: "14px",
              },
            }}
            leftSection={<IconUpload size={18} color="white" />}
          />
        }
      />
      <DocInputBody
        title={"Back Side"}
        subTitle={"Upload back side of your CNIC ID"}
        inputField={
          <FileInput
            variant="filled"
            placeholder="Choose file"
            w="20%"
            radius="md"
            multiple
            styles={{
              input: {
                backgroundColor: "#FF0005",
              },
              placeholder: {
                color: "white",
                fontSize: "14px",
              },
            }}
            leftSection={<IconUpload size={18} color="white" />}
          />
        }
      />
    </>
  );
}
