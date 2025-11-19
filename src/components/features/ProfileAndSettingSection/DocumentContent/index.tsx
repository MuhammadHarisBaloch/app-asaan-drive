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
import ReUploadDocModal, {
  openReUploadDocModal,
} from "./DocumentCard/ReUploadDocModal";
import { modals } from "@mantine/modals";

export default function DocumentContent() {
  const [pickedFile, setPickedFile] = useState<FileWithPath | null>(null);
  const [openChooseType, setOpenChooseType] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [docs, setDocs] = useState<DocumentModel[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [userDocumentStatus, setUserDocumentStatus] =
    useState<string>("Pending");

  const userId = auth.currentUser?.uid ?? null;

  // Firestore listener for user's docs and user data
  useEffect(() => {
    if (!userId) return;

    // Listen to user data for documentStatus
    const userRef = doc(db, firebaseConstants.collections.users, userId);
    const userUnsub = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const userData = snap.data();
        setUserType(userData.userType);
        setUserDocumentStatus(userData.documentStatus || "Pending");
      }
    });

    // Listen to documents collection
    const q = query(
      collection(db, firebaseConstants.collections.documents),
      where("userId", "==", userId)
    );

    const docsUnsub = onSnapshot(q, (snap) => {
      const arr: DocumentModel[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
        // Convert timestamp to proper date
        uploadedAt: d.data().uploadedAt?.toDate?.() || d.data().uploadedAt,
        createdAt: d.data().createdAt?.toDate?.() || d.data().createdAt,
      }));
      console.log("Fetched documents:", arr); // Debug log
      setDocs(arr);
    });

    return () => {
      userUnsub();
      docsUnsub();
    };
  }, [userId]);

  const handleDrop = (files: FileWithPath[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    openReUploadDocModal({
      documentType: "CNIC-Front",
      initialFile: file,
    });
  };

  const handleProceed = () => {
    if (!pickedFile || !selectedDocType) return;

    openReUploadDocModal({
      documentType: selectedDocType,
      initialFile: pickedFile,
    });

    setPickedFile(null);
    setSelectedDocType(null);
    setOpenChooseType(false);
  };

  const documentTypes =
    userType === "vehicles-owner"
      ? ["CNIC-Front", "CNIC-Back"]
      : ["CNIC-Front", "CNIC-Back", "License-Front", "License-Back"];

  return (
    <Stack>
      <SimpleGrid cols={3} py="xl" spacing="xl">
        {documentTypes.map((type) => {
          const docRecord = docs.find((d) => d.documentType === type);
          console.log(`Document ${type}:`, docRecord); // Debug log

          // Get status from user's documentStatus or docRecord status
          // Use user's documentStatus if available, otherwise fallback to docRecord status
          const status =
            userDocumentStatus !== "Pending"
              ? userDocumentStatus
              : docRecord?.status || "Not Uploaded";

          // Format uploaded date
          const uploadedDate = docRecord?.uploadedAt
            ? new Date(docRecord.uploadedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—";

          return (
            <DocumentCard
              key={type}
              documentType={type}
              status={status}
              uploadedDate={uploadedDate}
              expiresDate={"—"}
              docRecord={docRecord}
            />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
