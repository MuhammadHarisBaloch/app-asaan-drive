import { data } from "@/constants/Data";
import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListedVehicleCardProps {
  id?: string;
  vehiclePhotos: string[];
  vehicleModel: string;
  vehicleType: string;
  dailyRate: number;
  pickupLocation: string;
  status: string;
}
let color: string;
let bgColor: string;
export default function ListedCard({
  id,
  vehiclePhotos,
  vehicleModel,
  vehicleType,
  dailyRate,
  pickupLocation,
  status,
}: ListedVehicleCardProps) {
  const router = useRouter();

  switch (status) {
    case "available":
      color = "green";
      bgColor = "green.1";
      break;
    case "inactive":
      color = "black";
      bgColor = "gray.1";
      break;
    case "booked":
      color = "blue";
      bgColor = "blue.1";
      break;
  }

  return (
    <Card
      padding="lg"
      radius="lg"
      style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25))" }}
    >
      <CardSection>
        <Image
          src={vehiclePhotos[0]}
          alt={vehicleModel}
          width={100}
          height={100}
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "15rem",
          }}
        />
      </CardSection>
      <Stack pt="lg" align="center" w="100%">
        <Group w="100%" align="flex-start" justify="space-between">
          <Stack gap="xs">
            <Text fz="lg" c="black" fw={500} lh={0.8}>
              {vehicleModel}
            </Text>
            <Text fz="sm">{vehicleType}</Text>
          </Stack>
          <Badge
            c={color}
            bg={bgColor}
            fw={500}
            styles={{
              root: { textAlign: "center", textTransform: "lowercase" },
            }}
          >
            {status}
          </Badge>
        </Group>
        <Text fz="md" c="red.4" fw={500}>
          Rs. {dailyRate}/Day
        </Text>
        <Group w="100%" align="flex-start" justify="space-between">
          <Flex gap="sm" align="center">
            <IconStarFilled size={18} color="yellow" />
            <Text fz="xs">4.8 (125 reviews)</Text>
          </Flex>
          <Text fz="xs">{pickupLocation}</Text>
        </Group>
        <Button
          fullWidth
          mt="sm"
          fz="xs"
          disabled={status === "booked" || status === "inactive"}
          onClick={() => {
            if (status === "available") {
              router.push(`/app/renter/vehicle/${id}`);
            }
          }}
        >
          View Details
        </Button>
      </Stack>
    </Card>
  );
}
