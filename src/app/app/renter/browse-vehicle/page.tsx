"use client";
import ListedVehicleCard from "@/components/features/renters/ListedVehicleCard";
import { listAllVehicleDocs } from "@/features/vehicle";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";
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
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";

const VehicleType = ["All", "Bike", "Cycle", "Rakshaw"];
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
export default function BrowseVehicle() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("All");
  const [Vehicles, setVehicles] = useState<VehicleModel[]>([]);

  useEffect(() => {
    const listAllVehicles = async () => {
      const vehicles = await listAllVehicleDocs();
      return vehicles;
    };

    listAllVehicles().then((vehicles) => {
      console.log(vehicles);
      setVehicles(vehicles ?? []);
    });
  }, []);

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
      <SimpleGrid cols={3} spacing="xxl">
        {Vehicles.map((data) => {
          return (
            <React.Fragment key={data.id}>
              {selectedVehicle === data.vehicleType ? (
                <ListedVehicleCard
                  {...data}
                  status={data.status ?? "available"}
                />
              ) : selectedVehicle === "All" ? (
                <ListedVehicleCard
                  {...data}
                  status={data.status ?? "available"}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
