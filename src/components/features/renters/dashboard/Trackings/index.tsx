import { Stack, Card, Text, Input, Flex, Button } from "@mantine/core";
import { IconCar, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import TrackingCard from "./TrackingCard";

export default function TrackingSection() {
  const [trackingId, setTrackingId] = useState<string>("");
  const demoId = "BK001";
  const trackingShowingPortion = () => {
    if (trackingId === "") {
      return (
        <TrackingCard
          icon={<IconSearch size={60} color="gray" />}
          title="Track Your Ride"
          subTitle="Enter your booking ID to track your vehicle in real-time"
          description="You can find your booking ID in your confirmation email or booking history"
          trackingId={trackingId}
        />
      );
    }
    if (trackingId === demoId) {
      return (
        <TrackingCard
          icon={<IconCar size={60} color="gray" />}
          title="Booking Found Successfully"
          subTitle=" No tracking information found for booking ID: "
          description="Please check your booking ID and try again"
          trackingId={trackingId}
        />
      );
    }
    return (
      <TrackingCard
        icon={<IconCar size={60} color="gray" />}
        title="Booking Not Found"
        subTitle="No tracking information found for booking ID: "
        description="Please check your booking ID and try again"
        trackingId={trackingId}
      />
    );
  };

  return (
    <Stack p="lg" gap="xxl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Track My Ride
        </Text>
        <Text fz="12px">
          Enter your booking ID to track your vehicle in real-time
        </Text>
      </Stack>
      <Card
        w="100%"
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #00000068)" }}
      >
        <Stack gap="lg">
          <Text fz="lg" c="black" fw={600}>
            Find Your Booking
          </Text>
          <Flex justify="space-between">
            <Input
              w="80%"
              size="md"
              placeholder="Enter Booking ID (e.g., BK001, BK002, BK003)"
              value={trackingId}
              onChange={(event) => setTrackingId(event.currentTarget.value)}
            />
            <Button
              size="md"
              bg={trackingId == "" ? "gray.3" : "red.4"}
              fw={400}
              leftSection={<IconSearch size={20} color="white" />}
            >
              Track Ride
            </Button>
          </Flex>
        </Stack>
      </Card>
      {trackingShowingPortion()}
    </Stack>
  );
}
