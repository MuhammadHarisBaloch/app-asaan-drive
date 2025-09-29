import { Card, Stack, Group, Flex, Badge, Button, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { JSX } from "react";
import ReUploadDocModal from "./ReUploadDocModal";

interface DocumentCardProps {
  documentType: string;
  status: string;
  statusIcon: JSX.Element;
  uploadedDate: string;
  expiresDate: string;
}
export default function DocumentCard({
  documentType,
  status,
  statusIcon,
  uploadedDate,
  expiresDate,
}: DocumentCardProps) {
  let color: string;
  let bgColor: string;

  switch (status) {
    case "verified":
      color = "green";
      bgColor = "green.1";
      break;
    case "pending":
      color = "orange.4";
      bgColor = "orange.0";
      break;
    case "decline":
      color = "red";
      bgColor = "pink.1";
      break;
    default:
      color = "transparent";
      bgColor = "transparent";
  }
  return (
    <Card radius="md" withBorder p="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Text fz="sm" fw={500} c="black">
            {documentType}
          </Text>
          <Flex align="center" gap="xs">
            {statusIcon}
            <Badge
              size="sm"
              c={color}
              bg={bgColor}
              fw={500}
              styles={{
                root: {
                  textTransform: "lowercase",
                  textAlign: "center",
                },
              }}
            >
              {status}
            </Badge>
          </Flex>
        </Group>
        <Stack gap={0}>
          <Text fz="xs">Uploaded: {uploadedDate}</Text>
          <Text fz="xs">Expires: {expiresDate}</Text>
        </Stack>
        <Button
          bg="blue.1"
          c="blue.4"
          fw={500}
          leftSection={<IconUpload size={20} />}
          onClick={() => {
            ReUploadDocModal({ documentType });
          }}
        >
          Re-upload
        </Button>
      </Stack>
    </Card>
  );
}
