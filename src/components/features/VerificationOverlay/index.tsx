"use client";
import { Modal, Button, Group, Text, Paper, Alert, List } from "@mantine/core";
import {
  IconAlertCircle,
  IconCheck,
  IconX,
  IconUpload,
  IconUserCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { UserModel } from "@/features/user/models/user.model";

interface VerificationOverlayProps {
  isOpen: boolean;
  userData: UserModel;
  onClose?: () => void;
}

export default function VerificationOverlay({
  isOpen,
  userData,
  onClose,
}: VerificationOverlayProps) {
  const router = useRouter();

  const handleRedirect = () => {
    // Redirect to profile page for document upload
    router.push(`/app/${userData.userType}`);
  };

  const getStatusDetails = () => {
    switch (userData.documentStatus) {
      case "Not Uploaded":
        return {
          title: "Document Verification Required",
          description:
            "Please upload your required documents to verify your account and start using our platform.",
          icon: <IconUpload size={24} />,
          color: "black",
          buttonText: "Upload Documents",
        };
      case "Pending":
        return {
          title: "Verification Under Review",
          description:
            "Your documents are under review. This process usually takes 24-48 hours.",
          icon: <IconUserCheck size={24} />,
          color: "orange",
          buttonText: "Check Status",
        };
      case "Rejected":
        return {
          title: "Verification Failed",
          description: userData.documentRemarks
            ? `Your documents were rejected: ${userData.documentRemarks}`
            : "Your document verification was unsuccessful. Please update your documents and try again.",
          icon: <IconX size={24} />,
          color: "red",
          buttonText: "Update Documents",
        };
      default:
        return {
          title: "Account Verification Required",
          description:
            "Please complete your account verification to access all features.",
          icon: <IconAlertCircle size={24} />,
          color: "blue",
          buttonText: "Complete Verification",
        };
    }
  };

  const statusInfo = getStatusDetails();

  const shouldBlockAccess =
    userData.documentStatus !== "Verified" || userData.status === "Blocked";

  if (!shouldBlockAccess) {
    return null;
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose || (() => {})}
      title="Account Verification Required"
      centered
      size="md"
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
    >
      <Paper p="md" radius="md">
        <Alert
          icon={statusInfo.icon}
          title={statusInfo.title}
          color={statusInfo.color}
          variant="light"
          mb="lg"
        >
          <Text size="sm" mt={5}>
            {statusInfo.description}
          </Text>
        </Alert>

        {/* Additional Information based on status */}
        {userData.documentStatus === "Not Uploaded" && (
          <Paper withBorder p="md" mb="lg" bg="blue.0">
            <Text size="sm" c="black" fw={500} mb="xs">
              Required Documents:
            </Text>
            <List size="sm" spacing="xs">
              <List.Item>CNIC Front & Back Photo</List.Item>
              <List.Item>Driver License Front & Back Photo</List.Item>
            </List>
          </Paper>
        )}

        {userData.documentStatus === "Rejected" && userData.documentRemarks && (
          <Paper withBorder p="md" mb="lg" bg="red.0">
            <Text size="sm" fw={500}>
              Remarks from Admin:
            </Text>
            <Text size="sm" c="red">
              {userData.documentRemarks}
            </Text>
          </Paper>
        )}

        <Text size="sm" c="dimmed" mb="lg">
          You need to complete your document verification process to access all
          platform features.
        </Text>

        <Group justify="center">
          <Button
            onClick={handleRedirect}
            variant="filled"
            color={statusInfo.color === "red" ? "red" : "blue"}
            size="md"
            leftSection={statusInfo.icon}
          >
            {statusInfo.buttonText}
          </Button>
        </Group>

        <Text size="xs" c="dimmed" mt="lg" ta="center">
          Contact support at support@asaandrive.com for assistance
        </Text>
      </Paper>
    </Modal>
  );
}
