// src/components/ReUploadDocModal.tsx
"use client";
import { Button, Card, Divider, Flex, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { modals } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import StorageService from "@/features/storage"; // adjust path if different
import { handleUserDocumentUpload } from "@/features/document";
import { notifications } from "@mantine/notifications";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { DocumentModel } from "@/features/document/models";

interface ReUploadDocModalProps {
  documentType: string; // e.g., "CNIC-Front" or "License"
  preselectedFile?: FileWithPath | null;
  existingDoc?: DocumentModel;
}

export default function ReUploadDocModal({
  documentType,
  preselectedFile = null,
  existingDoc,
}: ReUploadDocModalProps) {
  // open modal
  return modals.open({
    title: (
      <Text fz="md" fw={600} c="black" px="lg">
        Upload {documentType}
      </Text>
    ),
    children: (
      <ModalInner
        documentType={documentType}
        initialFile={preselectedFile ?? null}
      />
    ),
  });
}

function ModalInner({
  documentType,
  initialFile,
}: {
  documentType: string;
  initialFile: FileWithPath | null;
}) {
  const [file, setFile] = useState<FileWithPath | null>(initialFile);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!file) {
        notifications.show({
          title: "No file",
          message: "Please select a file to upload.",
        });
        return;
      }

      setLoading(true);
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      // 1) Upload to Appwrite (returns fileId)
      const fileId = await StorageService.shared.uploadFile(file as File);

      // 2) Convert to view/download URL
      const fileUrl = await StorageService.shared.downloadFile(fileId);

      // 3) Create a documents record in Firestore
      await handleUserDocumentUpload(fileUrl, userId, documentType as any);

      // 4) Update users/{userId} documents map + set status Pending
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        [`documents.${documentType}`]: fileUrl,
        documentStatus: "Pending",
      });

      notifications.show({
        title: "Uploaded",
        message: `${documentType} uploaded and sent for review.`,
      });

      modals.closeAll();
    } catch (err: any) {
      console.error("Document upload failed:", err);
      notifications.show({
        title: "Upload failed",
        message:
          err?.message ?? "An error occurred while uploading the document.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack p="lg" gap="lg">
      <Stack gap={0}>
        <Text fz="xs">Select File</Text>
        <Dropzone
          onDrop={(files) => setFile(files[0])}
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
        {file && (
          <Card
            withBorder
            radius="md"
            p="sm"
            mt="md"
            style={{ overflow: "hidden" }}
          >
            <Text fz="xs" fw={500} mb="xs">
              Preview:
            </Text>
            <img
              src={URL.createObjectURL(file)}
              alt="Selected document"
              style={{
                width: "100%",
                maxHeight: 250,
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Card>
        )}
      </Stack>

      <Card p="lg" bg="orange.1" radius="md">
        <Text c="orange" fz="12px">
          <span style={{ fontWeight: 600 }}>Note:</span> Documents will be
          reviewed by admin. Keep images clear.
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
          onClick={() => modals.closeAll()}
        >
          Cancel
        </Button>

        <Button
          w="100%"
          size="md"
          fz="xs"
          fw={500}
          loading={loading}
          onClick={handleUpload}
        >
          Upload Document
        </Button>
      </Flex>
    </Stack>
  );
}
