import { Card, Group, Flex, Stack, Text, Badge } from "@mantine/core";
import Image from "next/image";
interface RecentBookingCardProps {
  vehicleImage: string;
  vehicleName: string;
  rentingDuration: string;
  status: string;
  price: string;
}
export default function RecentBookingCard({
  vehicleName,
  vehicleImage,
  rentingDuration,
  status,
  price,
}: RecentBookingCardProps) {
  let color: string;
  let bgColor: string;
  switch (status) {
    case "Active":
      color = "green";
      bgColor = "green.1";
      break;
    case "Confirmed":
      color = "blue";
      bgColor = "blue.1";
      break;
    case "Pending":
      color = "red";
      bgColor = "pink.1";
      break;
    default:
      color = "transparent";
      bgColor = "transparent";
  }
  return (
    <Card
      w="100%"
      px="xl"
      py="lg"
      radius="md"
      bg="white.2"
      style={{ filter: "drop-shadow(1px 1px 2px #78787846)" }}
    >
      <Group justify="space-between">
        <Flex gap="md" align="center">
          <Image
            height={100}
            width={100}
            src={vehicleImage}
            alt={vehicleName}
            sizes="100vw"
            style={{
              height: "auto",
              width: "4rem",
            }}
          />
          <Stack gap="xxs">
            <Text fz="xs" c="black" fw={600}>
              {vehicleName}
            </Text>
            <Text fz="12px">{rentingDuration}</Text>
          </Stack>
        </Flex>
        <Flex gap="md">
          <Badge
            c={color}
            bg={bgColor}
            fw={500}
            styles={{
              root: {
                textAlign: "center",
                textTransform: "lowercase",
              },
            }}
          >
            {status}
          </Badge>
          <Text fz="xs" c="black" fw={600}>
            Pkr {price}
          </Text>
        </Flex>
      </Group>
    </Card>
  );
}
