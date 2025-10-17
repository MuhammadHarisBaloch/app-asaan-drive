"use client";
import {
  Badge,
  Card,
  CardSection,
  Divider,
  Flex,
  Menu,
  Skeleton,
  Stack,
  Text,
  Group,
} from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconClock,
  IconDots,
  IconTrashX,
  IconX,
  IconEye,
  IconCircleCheck,
  IconPointFilled,
} from "@tabler/icons-react";
import NextImage from "next/image";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
import { getStatusColors } from "../VehicleDetailsModal/VehicleInfoSection";
import VehicleMenu from "../VehicleMenu";

interface VehicleCardProps {
  vehicle: VehicleModel;
  onView: () => void;
  onApprove: () => Promise<void>;
  onReject: () => void;
  onActivate: () => Promise<void>;
  onDeactivate: () => Promise<void>;
  onDelete: () => void;
}

export default function VehicleCard({
  vehicle,
  onView,
  onApprove,
  onReject,
  onActivate,
  onDeactivate,
  onDelete,
}: VehicleCardProps) {
  const { color, bgColor } = getStatusColors(vehicle.status ?? "-");

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        display: "flex",
        flexDirection: "column",
        height: "22rem",
        backgroundColor: "white",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-3px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <CardSection
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <NextImage
          src={vehicle.vehiclePhotos?.[0] || "/placeholder.jpg"}
          alt={vehicle.vehicleModel}
          fill
          style={{ objectFit: "cover" }}
        />

        {/* Status Badge */}
        <Badge
          variant="light"
          size="sm"
          fw={600}
          c={color}
          bg={bgColor}
          leftSection={
            vehicle.status === "available" ? (
              <IconCircleCheck size={15} color="green" />
            ) : vehicle.status === "pending" ? (
              <IconClock size={15} color="orange" />
            ) : vehicle.status === "inactive" ? (
              <IconBan size={15} color="red" />
            ) : null
          }
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            textTransform: "capitalize",
            minWidth: 80,
            textAlign: "center",
          }}
        >
          {vehicle.status || "Unknown"}
        </Badge>

        {/* Type Badge */}
        <Badge
          variant="filled"
          size="sm"
          c="white"
          bg="#3e3e3ec4"
          fw={600}
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            zIndex: 2,
            textTransform: "capitalize",
            minWidth: 80,
            textAlign: "center",
          }}
        >
          {vehicle.vehicleType}
        </Badge>
      </CardSection>

      {/* Details Section */}
      <Stack w="100%" gap="sm" mt="xs">
        <Flex align="center" justify="space-between">
          <Text fz="sm" fw={600} c="black">
            {vehicle.vehicleModel}
          </Text>

          {/* Actions menu */}
          <VehicleMenu
            vehicle={vehicle}
            onView={onView}
            onApprove={onApprove}
            onReject={onReject}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            onDelete={onDelete}
          />
        </Flex>

        <Flex gap="xxs" align="center">
          <Text fz="12px">{vehicle.pickupLocation}</Text>
          <IconPointFilled color="gray" size={8} />
          <Text fz="12px">{vehicle.ownerName || "Unknown"}</Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Stack gap={0}>
            <Text fz="12px">Daily</Text>
            <Text fz="xs" c="black" fw={500}>
              Rs. {vehicle.dailyRate}
            </Text>
          </Stack>
          <Stack gap={0}>
            <Text fz="12px">Weekly</Text>
            <Text fz="xs" c="black" fw={500}>
              Rs. {vehicle.weeklyRate}
            </Text>
          </Stack>
        </Flex>

        <Divider w="100%" />

        <Flex align="center" justify="space-between">
          <Text fz="12px">Monthly</Text>
          <Text fz="12px" c="red.4" fw={500}>
            Rs. {vehicle.monthlyRate}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
}
