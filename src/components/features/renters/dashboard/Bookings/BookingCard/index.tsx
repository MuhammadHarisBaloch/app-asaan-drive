import {
  Group,
  Flex,
  Stack,
  Center,
  Divider,
  Text,
  Badge,
} from "@mantine/core";
import Image from "next/image";
interface BookingCardProps {
  vehicleName: string;
  vehicleImage: string;
  vehicleType: string;
  pickupDate: string;
  returnDate: string;
  status: string;
  price: string;
}
export default function BookingCard({
  vehicleName,
  vehicleType,
  vehicleImage,
  pickupDate,
  returnDate,
  status,
  price,
}: BookingCardProps) {
  let color: string;
  let bgColor: string;

  switch (status) {
    case "Active":
      color = "blue";
      bgColor = "blue.1";
      break;
    case "Confirmed":
      color = "green";
      bgColor = "green.1";
      break;
    case "Pending":
      color = "red";
      bgColor = "pink.1";
      break;
    case "Completed":
      color = "black";
      bgColor = "gray.1";
      break;
    default:
      color = "transparent";
      bgColor = "transparent";
  }
  return (
    <>
      <Group px="lg" align="center">
        {/* Vehicle column special case */}
        <Flex gap="md" align="center" style={{ flex: 2 }}>
          <Image
            height={100}
            width={100}
            src={vehicleImage}
            alt={vehicleName}
            style={{ height: "auto", width: "4rem" }}
          />
          <Stack gap={2}>
            <Text fz="xs" fw={600} c="black">
              {vehicleName}
            </Text>
            <Text fz="12px">{vehicleType}</Text>
          </Stack>
        </Flex>

        {/* Other columns */}
        <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
          {pickupDate}
        </Text>
        <Text fz="12px" style={{ flex: 1, textAlign: "center" }}>
          {returnDate}
        </Text>
        <Badge
          c={color}
          bg={bgColor}
          fw={500}
          styles={{
            root: { textAlign: "center", textTransform: "lowercase" },
          }}
          style={{ flex: 0.8 }}
        >
          {status}
        </Badge>
        <Text
          fz="xs"
          fw={600}
          c="black"
          style={{ flex: 1, textAlign: "right" }}
        >
          Pkr {price}
        </Text>
      </Group>
      <Divider w="100%" />
    </>
  );
}
