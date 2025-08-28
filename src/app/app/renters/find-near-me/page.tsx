import Images from "@/constants/Images";
import {
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Input,
  Stack,
  Text,
} from "@mantine/core";
import { IconCurrentLocationFilled, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

const NearestVehicles = [
  {
    image: Images.listedVehicles.cd70,
    name: "Honda CD 70",
    type: "Bike",
    rent: "Rs. 500/Day",
    avaibility: "Available",
    tagColor: "cyan.0",
    tagTextColor: "green",
  },
  {
    image: Images.listedVehicles.cd125,
    name: "Honda 125",
    type: "Bike",
    rent: "Rs. 1200/Day",
    avaibility: "Not available",
    tagColor: "pink.1",
    tagTextColor: "red.4",
  },
  {
    image: Images.listedVehicles.old125,
    name: "Honda 125",
    type: "Bike",
    rent: "Rs. 800/Day",
    avaibility: "Available",
    tagColor: "cyan.0",
    tagTextColor: "green",
  },

  {
    image: Images.listedVehicles.rakshaw,
    name: "Auto Rikshaw",
    type: "Rikshaw",
    rent: "Rs. 1500/Day",
    avaibility: "Not available",
    tagColor: "pink.1",
    tagTextColor: "red.4",
  },
];

export default function FindNearMePage() {
  return (
    <Stack px="lg" py="3xl" gap="xl">
      <Group justify="space-between">
        <Text fz="xl" c="black" fw={500}>
          Find Vehicles Near You
        </Text>
        <Flex gap="lg">
          <Input
            h="100%"
            rightSection={<IconSearch size={20} color="gray" />}
            placeholder="Search Vehicles..."
            radius="md"
          />
          <Button
            leftSection={<IconCurrentLocationFilled size={20} color="white" />}
          >
            Locate me
          </Button>
        </Flex>
      </Group>
      <Grid gutter={0}>
        <GridCol span={7} h="100%">
          <Image
            src={Images.Map.findNearMeMap}
            alt="map"
            height={100}
            width={100}
            sizes="100vw"
            style={{ height: "auto", width: "100%" }}
          />
        </GridCol>
        <GridCol span={5}>
          <Divider w="100%" />
          <Stack p="md" gap="xs">
            <Text fz="md" fw={500} c="black">
              4 vehicles Found
            </Text>
            <Text fz="sm">Click ‘Locate me’ to find vehicles Near you</Text>
          </Stack>
          <Divider w="100%" />
          {NearestVehicles.map((data, index) => {
            return (
              <Stack key={index}>
                <Flex p="md" justify="space-between">
                  <Flex gap="md">
                    <Image
                      src={data.image}
                      alt="map"
                      height={100}
                      width={100}
                      sizes="100vw"
                      style={{ height: "auto", width: "8rem" }}
                    />
                    <Stack gap="xs">
                      <Text fz="md" fw={500} c="black">
                        {data.name}
                      </Text>
                      <Text fz="sm">{data.type}</Text>
                    </Stack>
                  </Flex>
                  <Stack justify="space-between">
                    <Text fz="md" c="red.4" fw={500}>
                      {data.rent}
                    </Text>
                    <Center
                      px="md"
                      bg={data.tagColor}
                      style={{ borderRadius: "10px" }}
                    >
                      <Text fz="12px" c={data.tagTextColor}>
                        {data.avaibility}
                      </Text>
                    </Center>
                  </Stack>
                </Flex>
                <Divider w="100%" />
              </Stack>
            );
          })}
        </GridCol>
      </Grid>
    </Stack>
  );
}
