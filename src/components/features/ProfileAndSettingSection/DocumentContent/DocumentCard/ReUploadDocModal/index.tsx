import { Button, Card, Divider, Flex, Stack, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { modals } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";

interface ReUploadDocModalProps {
  documentType: string;
}
export default function ReUploadDocModal({
  documentType,
}: ReUploadDocModalProps) {
  return modals.open({
    title: (
      <Text fz="md" fw={600} c="black" px="lg">
        Re-upload {documentType}
      </Text>
    ),
    children: (
      <Stack p="lg" gap="lg">
        <Stack gap={0}>
          <Text fz="xs">Select File</Text>
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
              mih={100}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Idle>
                <IconUpload size={25} color="gray" stroke={1.5} />
              </Dropzone.Idle>
              <Stack align="center" gap="xs">
                <Text fz="xs" fw={500} c="black">
                  Click to upload or drag and drop
                </Text>
                <Text size="12px">JPEG, PNG, or PDF (max 5MB)</Text>
              </Stack>
            </Stack>
          </Dropzone>
        </Stack>
        <Card p="lg" bg="orange.1" radius="md">
          <Text c="orange" fz="12px">
            <span style={{ fontWeight: 600 }}>Note:</span> Documents will be
            reviewed within 24 hours. Make sure the document is clear and all
            information is visible.
          </Text>
        </Card>
        <Divider w="100%" />
        <Flex gap="lg">
          <Button
            size="md"
            fz="xs"
            fw={500}
            w="100%"
            variant="outline"
            color="black"
            onClick={() => {
              modals.closeAll();
            }}
          >
            Cancel
          </Button>
          <Button
            w="100%"
            size="md"
            fz="xs"
            fw={500}
            onClick={() => {
              modals.closeAll();
            }}
          >
            Upload Document
          </Button>
        </Flex>
      </Stack>
    ),
  });
}
