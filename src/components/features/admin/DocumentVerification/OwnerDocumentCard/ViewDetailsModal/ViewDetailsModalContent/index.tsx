"use client";

import { useState } from "react";
import { Stack, Button, Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { getAuth } from "firebase/auth";
import { approveUserDocuments, rejectUserDocuments } from "@/features/document";
import { UserModel } from "@/features/user/models/user.model";
import { RejectReasonModal } from "./RejectReasonModal";

export default function ViewDetailsModalContent({
  user,
}: {
  user: UserModel & { id: string };
}) {
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  // Transform backend keys to frontend format
  const transformDocuments = (rawDocs: any) => {
    if (!rawDocs) return {};
    return {
      cnicFront: rawDocs["CNIC-Front"] || rawDocs.cnicFront,
      cnicBack: rawDocs["CNIC-Back"] || rawDocs.cnicBack,
      licenseFront: rawDocs["License-Front"] || rawDocs.licenseFront,
      licenseBack: rawDocs["License-Back"] || rawDocs.licenseBack,
    };
  };

  const docsMap = transformDocuments(user.documents);

  const docsList = [];
  if (docsMap.cnicFront)
    docsList.push({ label: "CNIC Front", url: docsMap.cnicFront });
  if (docsMap.cnicBack)
    docsList.push({ label: "CNIC Back", url: docsMap.cnicBack });
  if (docsMap.licenseFront)
    docsList.push({ label: "License Front", url: docsMap.licenseFront });
  if (docsMap.licenseBack)
    docsList.push({ label: "License Back", url: docsMap.licenseBack });

  const reviewerId = getAuth().currentUser?.uid ?? "admin";

  // ✅ Approve handler
  const onApprove = async () => {
    try {
      setLoadingApprove(true);
      await approveUserDocuments(user.id, reviewerId);
      notifications.show({
        title: "Approved ✅",
        message: "User documents have been approved successfully.",
      });
      modals.closeAll();
    } catch (err) {
      notifications.show({
        title: "Error ❌",
        message: "Failed to approve documents.",
        color: "red",
      });
    } finally {
      setLoadingApprove(false);
    }
  };

  // ✅ Reject handler
  const onRejectFlow = async (reason: string) => {
    if (!reason.trim()) {
      notifications.show({
        title: "Missing Reason ⚠️",
        message: "Please provide a rejection reason.",
        color: "red",
      });
      return;
    }

    try {
      setLoadingReject(true);
      await rejectUserDocuments(user.id, reviewerId, reason);
      notifications.show({
        title: "Rejected ❌",
        message: "User documents have been rejected.",
      });
      modals.closeAll();
    } catch (err) {
      notifications.show({
        title: "Error ❌",
        message: "Failed to reject documents.",
        color: "red",
      });
    } finally {
      setLoadingReject(false);
    }
  };

  // ✅ Image click zoom modal
  const handleImageClick = (url: string) => {
    modals.open({
      size: "lg",
      withCloseButton: true,
      centered: true,
      overlayProps: { opacity: 0.5, blur: 4 },
      title: "Document Preview",
      children: (
        <img
          src={url}
          alt="Zoomed Document"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 10,
          }}
        />
      ),
    });
  };

  return (
    <Stack
      w="100%"
      align="center"
      style={{ overflowY: "auto", maxHeight: "70vh" }}
    >
      <Text size="sm" fw={500} c="dimmed">
        Total documents found: {docsList.length}
      </Text>

      {docsList.map((d, i) => (
        <div
          key={i}
          onClick={() => handleImageClick(d.url)}
          style={{
            width: "80%",
            height: 300,
            borderRadius: 12,
            overflow: "hidden",
            cursor: "zoom-in",
            border: "1px solid #ddd",
            background: "#fafafa",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease",
          }}
        >
          <img
            src={d.url}
            alt={d.label ?? `document-${i}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
          <Text mt="xs" ta="center" fw={600} c="gray.7" fz="sm">
            {d.label}
          </Text>
        </div>
      ))}

      {/* Buttons */}
      <Flex w="100%" px="xl" gap="lg" mt="md" direction="column">
        <Flex gap="lg">
          <Button
            fullWidth
            color="blue"
            onClick={onApprove}
            loading={loadingApprove}
          >
            Approve
          </Button>

          <Button
            fullWidth
            color="red"
            variant="outline"
            onClick={() =>
              modals.open({
                title: "Reject Documents — Provide reason",
                size: "lg",
                children: (
                  <RejectReasonModal
                    onSubmit={(reason) => {
                      onRejectFlow(reason);
                    }}
                  />
                ),
              })
            }
          >
            Decline
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
}
