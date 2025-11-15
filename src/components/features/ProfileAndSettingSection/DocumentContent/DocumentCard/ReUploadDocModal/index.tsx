// src/components/ReUploadDocModal.tsx
"use client";
import { Button, Card, Divider, Flex, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { modals } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import StorageService from "@/features/storage";
import { handleUserDocumentUpload } from "@/features/document";
import { notifications } from "@mantine/notifications";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/networking/firebase";
import { DocumentModel } from "@/features/document/models";

interface ReUploadDocModalProps {
  documentType: string;
  preselectedFile?: FileWithPath | null;
  existingDoc?: DocumentModel;
}

export default function ReUploadDocModal({
  documentType,
  preselectedFile = null,
  existingDoc,
}: ReUploadDocModalProps) {
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
        existingDoc={existingDoc}
      />
    ),
  });
}

function ModalInner({
  documentType,
  initialFile,
  existingDoc,
}: {
  documentType: string;
  initialFile: FileWithPath | null;
  existingDoc?: DocumentModel;
}) {
  const [file, setFile] = useState<FileWithPath | null>(initialFile);
  const [loading, setLoading] = useState(false);

  // Map documentType to the correct field name in user.documents object
  const getDocumentFieldName = (docType: string): string => {
    switch (docType) {
      case "CNIC-Front":
        return "cnicFront";
      case "CNIC-Back":
        return "cnicBack";
      case "License-Front":
        return "licenseFront";
      case "License-Back":
        return "licenseBack";
      case "License":
        return "licenseFront";
      default:
        return docType.toLowerCase();
    }
  };

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

      const documentField = getDocumentFieldName(documentType);

      // 3) Create or Update document in separate documents collection
      if (existingDoc?.id) {
        // Update existing document
        await updateDoc(doc(db, "documents", existingDoc.id), {
          fileUrl: fileUrl,
          status: "pending",
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create new document in documents collection
        const newDocRef = doc(collection(db, "documents"));
        const documentData = {
          id: newDocRef.id,
          userId: userId,
          documentType: documentType,
          fileUrl: fileUrl,
          status: "pending",
          uploadedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(newDocRef, documentData);
      }

      // 4) Update users/{userId} documents map with correct field names
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        [`documents.${documentField}`]: fileUrl,
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
