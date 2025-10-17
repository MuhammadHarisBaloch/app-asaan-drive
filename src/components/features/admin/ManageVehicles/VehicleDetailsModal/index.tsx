"use client";
import { Modal, ScrollArea, Text } from "@mantine/core";
import { useState } from "react";
import Image from "next/image";
import { VehicleInfoSection } from "./VehicleInfoSection";
import { VehicleActionButtons } from "./VehicleActionButtons";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";

interface VehicleDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  vehicle: VehicleModel | null;
  onApprove?: () => void;
  onReject?: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
}

export default function VehicleDetailsModal({
  opened,
  onClose,
  vehicle,
  onApprove,
  onReject,
  onActivate,
  onDeactivate,
}: VehicleDetailsModalProps) {
  const [zoom, setZoom] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!vehicle) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} c="black" fz="xl" ta="center">
          Vehicle Specifications
        </Text>
      }
      size="lg"
      h="100%"
      radius="md"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <VehicleInfoSection
        vehicle={vehicle}
        setZoom={setZoom}
        setSelectedImage={setSelectedImage}
      />

      <VehicleActionButtons
        vehicle={vehicle}
        onApprove={onApprove}
        onReject={onReject}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
      />

      {/* Zoom Modal */}
      <Modal
        opened={zoom}
        onClose={() => setZoom(false)}
        centered
        size="xl"
        withCloseButton={false}
        styles={{
          content: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "80vh" }}>
          <Image
            src={selectedImage || ""}
            alt="Zoomed image"
            fill
            unoptimized
            style={{ objectFit: "contain", borderRadius: "10px" }}
          />
        </div>
      </Modal>
    </Modal>
  );
}
