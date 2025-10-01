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
import Link from "next/link";

interface ListedVehicleCardProps {
  image: string;
  name: string;
  transmission: string;
  price: string;
  rating: number;
  reviews: number;
  location: string;
}

export default function ListedCard({
  image,
  name,
  transmission,
  price,
  rating,
  reviews,
  location,
}: ListedVehicleCardProps) {
  let status = "available";
  let color: string;
  let bgColor: string;

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
          src={image}
          alt="cd-125"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </CardSection>
      <Stack pt="lg" align="center" w="100%">
        <Group w="100%" align="flex-start" justify="space-between">
          <Stack gap="xs">
            <Text fz="lg" c="black" fw={500} lh={0.8}>
              {name}
            </Text>
            <Text fz="sm">{transmission}</Text>
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
          Rs. {price}
        </Text>
        <Group w="100%" align="flex-start" justify="space-between">
          <Flex gap="sm" align="center">
            <IconStarFilled size={18} color="yellow" />
            <Text fz="xs">
              {rating} ({reviews} reviews)
            </Text>
          </Flex>
          <Text fz="xs">{location}</Text>
        </Group>
        <Button
          component={Link}
          href="/app/renter/vehicle"
          fullWidth
          mt="sm"
          fz="xs"
        >
          View Details
        </Button>
      </Stack>
    </Card>
  );
}
