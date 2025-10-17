// src/components/DocumentContent.tsx
"use client";
import { useEffect, useState } from "react";
import { Button, SimpleGrid, Stack, Text, Modal, Select } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import DocumentCard from "./DocumentCard";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/networking/firebase";
import { firebaseConstants } from "@/constants/Firestore";
import { DocumentModel } from "@/features/document/models";
import ReUploadDocModal from "./DocumentCard/ReUploadDocModal";
import { modals } from "@mantine/modals";

export default function DocumentContent() {
  const [pickedFile, setPickedFile] = useState<FileWithPath | null>(null);
  const [openChooseType, setOpenChooseType] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [docs, setDocs] = useState<DocumentModel[]>([]);
  const [userType, setUserType] = useState<string | null>(null);

  const userId = auth.currentUser?.uid ?? null;

  // Firestore listener for user's docs
  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, firebaseConstants.collections.users, userId);
    getDoc(userRef).then((snap) => {
      if (snap.exists()) {
        setUserType(snap.data().userType);
      }
    });
    const q = query(
      collection(db, firebaseConstants.collections.documents),
      where("userId", "==", userId)
    );
    const unsub = onSnapshot(q, (snap) => {
      const arr: DocumentModel[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setDocs(arr);
    });
    return () => unsub();
  }, [userId]);

  const handleDrop = (files: FileWithPath[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    modals.open({
      title: "Upload CNIC Front",
      children: (
        <ReUploadDocModal documentType="CNIC-Front" preselectedFile={file} />
      ),
    });
  };

  const handleProceed = () => {
    if (!pickedFile || !selectedDocType) return;
    // Open modal and pass preselected file & type
    modals.open({
      title: `Upload ${selectedDocType}`,
      children: (
        <ReUploadDocModal
          documentType={selectedDocType!}
          preselectedFile={pickedFile}
        />
      ),
    });
    setPickedFile(null);
    setSelectedDocType(null);
    setOpenChooseType(false);
  };
  const documentTypes =
    userType === "vehicles-owner"
      ? ["CNIC-Front", "CNIC-Back"]
      : ["CNIC-Front", "CNIC-Back", "Driving License"];
  return (
    <Stack>
      <SimpleGrid cols={3} py="xl" spacing="xl">
        {documentTypes.map((type) => {
          const doc = docs.find((d) => d.documentType === type);
          return (
            <DocumentCard
              key={type}
              documentType={type}
              status={doc?.status ?? "Not Uploaded"}
              statusIcon={<></>}
              uploadedDate={
                doc?.uploadedAt
                  ? new Date(doc.uploadedAt).toLocaleString()
                  : "—"
              }
              expiresDate={"—"}
              docRecord={doc}
            />
          );
        })}
      </SimpleGrid>
      <Dropzone
        onDrop={handleDrop}
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

      <Modal
        opened={openChooseType}
        onClose={() => setOpenChooseType(false)}
        title="Select document type"
      >
        <Stack>
          <Select
            placeholder="Choose document type"
            data={[
              { value: "CNIC-Front", label: "CNIC - Front" },
              { value: "CNIC-Back", label: "CNIC - Back" },
              { value: "License", label: "Driving License" },
              { value: "Other", label: "Other" },
            ]}
            value={selectedDocType ?? undefined}
            onChange={(v) => setSelectedDocType(v)}
          />
          <Button disabled={!selectedDocType} onClick={handleProceed}>
            Upload and Submit for Review
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
