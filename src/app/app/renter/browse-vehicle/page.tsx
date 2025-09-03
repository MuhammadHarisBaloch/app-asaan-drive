"use client";
import ListedVehicleCard from "@/components/features/renters/ListedVehicleCard";
import { data } from "@/constants/Data";
import {
  Button,
  Card,
  Flex,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

const VehicleType = ["All", "Bikes", "Cycles", "Rikshaws"];

export default function BrowseVehicle() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("All");

  return (
    <Stack align="center" px="lg" py="3xl" gap="3xl">
      <Stack gap="xs" align="center">
        <Text c="red.4" fz="xl" fw={500}>
          Vehicle Listing
        </Text>
        <Title order={3} fw="bold">
          Browse Available Vehicles
        </Title>
        <Text fz="xl">
          Find the Perfect Vehicle for your needs with Flexible rental options
        </Text>
      </Stack>
      <Card
        px="lg"
        py="xl"
        w="100%"
        bg="white.1"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25))" }}
      >
        <Group align="flex-start" justify="space-between">
          <Stack>
            <Text fz="md" c="gray.8">
              Vehicle type
            </Text>
            <Flex gap="md">
              {VehicleType.map((data, i) => {
                return (
                  <Button
                    key={i}
                    fz="xs"
                    variant={selectedVehicle == data ? "filled" : "outline"}
                    color={selectedVehicle == data ? "red.4" : "gray.8"}
                    onClick={() => {
                      setSelectedVehicle(data);
                    }}
                  >
                    {data}
                  </Button>
                );
              })}
            </Flex>
          </Stack>
          <Stack w="15%">
            <Text fz="md" c="gray.8">
              Vehicle type
            </Text>
            <Select
              placeholder="Duration"
              radius="md"
              data={["Daily", "Weekly", "Monthly"]}
            />
          </Stack>
        </Group>
      </Card>
      <SimpleGrid cols={3} spacing="xl">
        {data.renter.inlistVehicles.map((data, index) => {
          return <ListedVehicleCard key={index} {...data} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}
