// src/components/DocumentCard.tsx
import { Card, Stack, Group, Flex, Badge, Button, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import ReUploadDocModal, { openReUploadDocModal } from "./ReUploadDocModal";
import { DocumentModel } from "@/features/document/models";
import { JSX } from "react";

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
    case "rejected":
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
        {/* Header + Status */}
        <Group justify="space-between" align="center">
          <Text fz="sm" fw={500} c="black">
            {documentType}
          </Text>

          {/* 👇 Status shown ONLY if file uploaded */}
          {docRecord?.fileUrl && (
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
          )}
        </Group>

        {/* 👇 Always show image if file uploaded */}
        {docRecord?.fileUrl && (
          <Card withBorder radius="md" py="sm" style={{ overflow: "hidden" }}>
            <img
              src={docRecord.fileUrl}
              alt={`${documentType} preview`}
              style={{
                width: "100%",
                maxHeight: 100,
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Card>
        )}

        {/* Dates */}
        <Stack gap={0}>
          <Text fz="xs">Uploaded: {uploadedDate}</Text>
          <Text fz="xs">Expires: {expiresDate}</Text>
        </Stack>

        {/* Upload / Re-upload button */}
        <Button
          bg="blue.1"
          c="blue.4"
          fw={500}
          leftSection={<IconUpload size={20} />}
          onClick={() => {
            openReUploadDocModal({
              documentType: documentType,
              initialFile: null,
              existingDoc: docRecord ?? undefined,
            });
          }}
        >
          {docRecord ? "Re-upload" : "Upload"}
        </Button>
      </Stack>
    </Card>
  );
}
