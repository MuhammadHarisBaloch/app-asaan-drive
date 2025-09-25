import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import DocumentCard from "./DocumentCard";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { data } from "@/constants/Data";

export default function DocumentContent() {
  return (
    <Stack>
      <SimpleGrid cols={3} py="xl" spacing="xl">
        {data.vehicleOwner.dashboard.ProfileAndSettingSection.Documents.DocCards.map(
          (data, i) => {
            return <DocumentCard key={i} {...data} />;
          }
        )}
      </SimpleGrid>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Stack
          align="center"
          justify="center"
          gap="lg"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Idle>
            <IconUpload size={30} color="gray" stroke={1.5} />
          </Dropzone.Idle>
          <Stack align="center" gap="xs">
            <Text fz="sm" fw={500} c="black">
              Upload New Document
            </Text>
            <Text size="xs">Drag and drop or click to upload</Text>
          </Stack>
          <Button>Choose File</Button>
        </Stack>
      </Dropzone>
    </Stack>
  );
}
