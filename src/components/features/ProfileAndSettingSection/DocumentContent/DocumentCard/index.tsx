// src/components/DocumentCard.tsx
import { Card, Stack, Group, Flex, Badge, Button, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import ReUploadDocModal from "./ReUploadDocModal";
import { DocumentModel } from "@/features/document/models";
import { JSX } from "react";
import { modals } from "@mantine/modals";

interface DocumentCardProps {
  documentType: string;
  status: string;
  statusIcon?: JSX.Element;
  uploadedDate?: string;
  expiresDate?: string;
  docRecord?: DocumentModel | null;
}

export default function DocumentCard({
  documentType,
  status,
  uploadedDate,
  expiresDate,
  docRecord,
}: DocumentCardProps) {
  let color: string;
  let bgColor: string;

  switch (status) {
    case "Verified":
    case "verified":
      color = "green";
      bgColor = "green.1";
      break;
    case "Pending":
    case "pending":
      color = "orange.4";
      bgColor = "orange.0";
      break;
    case "Rejected":
    case "decline":
    case "Rejected":
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
            modals.open({
              title: `${docRecord ? "Re-upload" : "Upload"} ${documentType}`,
              children: (
                <ReUploadDocModal
                  documentType={documentType}
                  preselectedFile={null}
                  existingDoc={docRecord ?? undefined}
                />
              ),
            });
          }}
        >
          {docRecord ? "Re-upload / View" : "Upload"}
        </Button>
      </Stack>
    </Card>
  );
}
