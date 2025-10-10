import { Card, Stack, Center, Box, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

interface BookingIdCardProps {
  bookingId: string | null;
}
export default function BookingIdCard({ bookingId }: BookingIdCardProps) {
  return (
    <Card
      w="100%"
      py="xxl"
      bg="green.0"
      radius="md"
      style={{ filter: "drop-shadow(1px 1px 2px #42424242)" }}
    >
      <Stack align="center">
        <Center w="70px" h="70px" bg="green.1" style={{ borderRadius: "50%" }}>
          <IconCircleCheck size={30} color="green" />
        </Center>
        <Text fz="xl" c="green" fw={600}>
          Booking Confirmed!
        </Text>
        <Text fz="md" c="green">
          Your booking has been successfully confirmed and the vehicle owner has
          been notified.
        </Text>
        <Box
          bg="white"
          px="xl"
          py="sm"
          style={{
            borderRadius: "10px",
            filter: "drop-shadow(1px 1px 2px #42424242)",
          }}
        >
          <Text fz="lg" c="black">
            Booking ID: <span style={{ fontWeight: 500 }}>{bookingId}</span>
          </Text>
        </Box>
      </Stack>
    </Card>
  );
}
