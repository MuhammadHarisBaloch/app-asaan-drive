// src/components/ReUploadDocModal.tsx - Complete updated file
"use client";
import { Button, Card, Divider, Flex, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { modals } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import StorageService from "@/features/storage";
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
    try {
      if (!file) {
        notifications.show({
          title: "No file selected",
          message: "Please select a file to upload.",
          color: "yellow",
        });
        return;
      }

      setLoading(true);

      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      console.log("🚀 Starting upload process...");

      // 1) Upload via API route
      const formData = new FormData();
      formData.append("file", file as File);

      console.log("📤 Calling upload API...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log(
        "📥 API response received:",
        response.status,
        response.statusText
      );

      let result;
      try {
        const responseText = await response.text();
        console.log("📄 Raw response:", responseText);

        if (!responseText) {
          throw new Error("Empty response from server");
        }

        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(
          result.error || `Upload failed with status: ${response.status}`
        );
      }

      if (!result.success) {
        throw new Error(result.error || "Upload failed");
      }

      console.log("✅ API upload successful:", result);

      const fileUrl = result.fileUrl;
      const documentField = getDocumentFieldName(documentType);

      // 2) Firestore updates (same as before)
      if (existingDoc?.id) {
        await updateDoc(doc(db, "documents", existingDoc.id), {
          fileUrl: fileUrl,
          status: "pending",
          updatedAt: serverTimestamp(),
        });
      } else {
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

      // 3) Update user document
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        [`documents.${documentField}`]: fileUrl,
        documentStatus: "pending",
        updatedAt: serverTimestamp(),
      });

      notifications.show({
        title: "Upload Successful! 🎉",
        message: `${documentType} uploaded and sent for review.`,
        color: "green",
      });

      modals.closeAll();
    } catch (err: any) {
      console.error("💥 Upload process failed:", err);

      let errorMessage = "Upload failed. Please try again.";

      if (err.message.includes("Invalid Appwrite credentials")) {
        errorMessage = "Server configuration error. Please contact support.";
      } else if (err.message.includes("Storage bucket not found")) {
        errorMessage = "Storage service error. Please contact support.";
      } else if (
        err.message.includes("Empty response") ||
        err.message.includes("Invalid response")
      ) {
        errorMessage = "Server error. Please try again later.";
      } else if (
        err.message.includes("Network") ||
        err.message.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = err.message || errorMessage;
      }

      notifications.show({
        title: "Upload Failed ❌",
        message: errorMessage,
        color: "red",
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
