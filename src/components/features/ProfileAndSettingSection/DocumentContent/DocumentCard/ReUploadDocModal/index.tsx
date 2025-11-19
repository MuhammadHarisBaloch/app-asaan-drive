// src/components/ReUploadDocModal.tsx - COMPLETE UPDATED FILE
"use client";
import { Button, Card, Divider, Flex, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { modals } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
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
  initialFile?: FileWithPath | null;
  existingDoc?: DocumentModel;
}

// Export the modal opener function
export function openReUploadDocModal({
  documentType,
  initialFile = null,
  existingDoc,
}: ReUploadDocModalProps) {
  modals.open({
    title: (
      <Text fz="md" fw={600} c="black" px="lg">
        {existingDoc ? "Re-upload" : "Upload"} {documentType}
      </Text>
    ),
    children: (
      <ModalInner
        documentType={documentType}
        initialFile={initialFile}
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
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      notifications.show({
        title: "User not authenticated",
        message: "Please log in to upload documents.",
      });
      return;
    }

    if (!file) {
      notifications.show({
        title: "No file selected",
        message: "Please select a file to upload.",
        color: "yellow",
      });
      return;
    }

    // ✅ EXACTLY SAME AS LIST YOUR VEHICLE PAGE
    // Dynamic imports for server-side code
    const { getUserDocument } = await import("@/features/user");
    const StorageService = (await import("@/features/storage")).default;

    const userData = await getUserDocument(userId);

    if (!userData) {
      notifications.show({
        title: "User data not found",
        message: "Please re-login and try again.",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 Starting document upload process...");

      // ✅ EXACTLY SAME LOGIC AS VEHICLE PAGE - Single file upload
      const uploadedFileId = await StorageService.shared.uploadFile(
        file as File
      );
      console.log("✅ File uploaded with ID:", uploadedFileId);

      const uploadedFileUrl = await StorageService.shared.downloadFile(
        uploadedFileId
      );
      console.log("✅ Download URL generated:", uploadedFileUrl);

      const documentField = getDocumentFieldName(documentType);

      // Firestore updates
      if (existingDoc?.id) {
        await updateDoc(doc(db, "documents", existingDoc.id), {
          fileUrl: uploadedFileUrl,
          status: "pending",
          updatedAt: serverTimestamp(),
        });
      } else {
        const newDocRef = doc(collection(db, "documents"));
        const documentData = {
          id: newDocRef.id,
          userId: userId,
          documentType: documentType,
          fileUrl: uploadedFileUrl,
          status: "pending",
          uploadedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(newDocRef, documentData);
      }

      // Update user document
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        [`documents.${documentField}`]: uploadedFileUrl,
        documentStatus: "pending",
        updatedAt: serverTimestamp(),
      });

      notifications.show({
        title: "Upload Successful! 🎉",
        message: `${documentType} uploaded and sent for review.`,
        color: "green",
      });

      modals.closeAll();
    } catch (error) {
      console.error("Error uploading document:", error);
      notifications.show({
        title: "Upload Failed",
        message: "Something went wrong. Please try again.",
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
          {loading ? "Uploading..." : "Upload Document"}
        </Button>
      </Flex>
    </Stack>
  );
}

// Default export for backward compatibility
export default openReUploadDocModal;
