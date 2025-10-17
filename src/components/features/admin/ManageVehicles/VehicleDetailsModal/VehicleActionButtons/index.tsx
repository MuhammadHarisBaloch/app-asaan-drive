"use client";
import { Button, Group } from "@mantine/core";
import { IconBan, IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";

interface VehicleActionButtonsProps {
  vehicle: VehicleModel;
  onApprove?: () => Promise<void> | void;
  onReject?: () => Promise<void> | void;
  onActivate?: () => Promise<void> | void;
  onDeactivate?: () => Promise<void> | void;
}

export function VehicleActionButtons({
  vehicle,
  onApprove,
  onReject,
  onActivate,
  onDeactivate,
}: VehicleActionButtonsProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  return (
    <Group justify="flex-end" gap="sm" mt="sm">
      {vehicle.status === "pending" && (
        <>
          <Button
            color="green"
            leftSection={<IconCheck size={16} />}
            loading={loadingAction === "approve"}
            onClick={async () => {
              try {
                setLoadingAction("approve");
                await onApprove?.();
                notifications.show({
                  title: "Vehicle Approved",
                  message: `${vehicle.vehicleModel} has been approved successfully.`,
                  color: "green",
                  icon: <IconCheck size={18} />,
                });
              } catch (error) {
                notifications.show({
                  title: "Approval Failed",
                  message: "Something went wrong while approving this vehicle.",
                  color: "red",
                  icon: <IconX size={18} />,
                });
              } finally {
                setLoadingAction(null);
              }
            }}
          >
            Approve
          </Button>

          <Button
            leftSection={<IconX size={16} />}
            loading={loadingAction === "reject"}
            onClick={async () => {
              try {
                setLoadingAction("reject");
                await onReject?.();
                notifications.show({
                  title: "Vehicle Rejected",
                  message: `${vehicle.vehicleModel} has been rejected.`,
                  color: "red",
                  icon: <IconX size={18} />,
                });
              } catch (error) {
                notifications.show({
                  title: "Rejection Failed",
                  message: "Something went wrong while rejecting this vehicle.",
                  color: "red",
                  icon: <IconX size={18} />,
                });
              } finally {
                setLoadingAction(null);
              }
            }}
          >
            Reject
          </Button>
        </>
      )}

      {vehicle.status === "inactive" && (
        <Button
          color="green"
          leftSection={<IconCheck size={16} />}
          loading={loadingAction === "activate"}
          onClick={async () => {
            try {
              setLoadingAction("activate");
              await onActivate?.();
              notifications.show({
                title: "Vehicle Activated",
                message: `${vehicle.vehicleModel} is now active and available.`,
                color: "green",
                icon: <IconCheck size={18} />,
              });
            } catch (error) {
              notifications.show({
                title: "Activation Failed",
                message: "Something went wrong while activating this vehicle.",
                color: "red",
                icon: <IconX size={18} />,
              });
            } finally {
              setLoadingAction(null);
            }
          }}
        >
          Activate
        </Button>
      )}

      {vehicle.status === "available" && (
        <Button
          color="orange"
          leftSection={<IconBan size={16} />}
          loading={loadingAction === "deactivate"}
          onClick={async () => {
            try {
              setLoadingAction("deactivate");
              await onDeactivate?.();
              notifications.show({
                title: "Vehicle Inactivated",
                message: `${vehicle.vehicleModel} has been set to inactive.`,
                color: "orange",
                icon: <IconBan size={18} />,
              });
            } catch (error) {
              notifications.show({
                title: "Inactivation Failed",
                message:
                  "Something went wrong while inactivating this vehicle.",
                color: "red",
                icon: <IconX size={18} />,
              });
            } finally {
              setLoadingAction(null);
            }
          }}
        >
          Inactivate
        </Button>
      )}
    </Group>
  );
}
