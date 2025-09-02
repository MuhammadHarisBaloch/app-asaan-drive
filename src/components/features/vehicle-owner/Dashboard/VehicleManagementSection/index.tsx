import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import {
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconEdit, IconMapPin, IconTrashX } from "@tabler/icons-react";
import Image from "next/image";

export default function VehicleManagementSection() {
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Vehicle Management
        </Text>
        <Text fz="12px">Manage your fleet and track vehicle performance</Text>
      </Stack>
      <SimpleGrid pb="xl" cols={3} spacing="xl" verticalSpacing="xxl">
        {data.vehicleOwner.dashboard.VehicleManagement.ownerListedVehicles.map(
          (data, i) => {
            return (
              <Card
                key={i}
                padding="lg"
                radius="lg"
                style={{
                  filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                <CardSection>
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={100}
                    height={100}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </CardSection>
                <Stack pt="xs" align="center" w="100%">
                  <Group w="100%" align="flex-start" justify="space-between">
                    <Stack gap="xs">
                      <Text fz="md" c="black" fw={600} lh={0.8}>
                        {data.name}
                      </Text>
                      <Text fz="xs">{data.license}</Text>
                    </Stack>
                    <Box
                      bg={data.statusBgColor}
                      px="md"
                      style={{ borderRadius: "10px" }}
                    >
                      <Text fz="12px" c={data.statusColor}>
                        {data.status}
                      </Text>
                    </Box>
                  </Group>
                  <Group w="100%" justify="space-between">
                    <Flex gap="sm" align="center">
                      <IconMapPin size={18} color="gray" />
                      <Text fz="xs">{data.location}</Text>
                    </Flex>
                    <Text fz="xs" c="red.4" fw={500}>
                      {data.price} /Day
                    </Text>
                  </Group>
                  <Group w="100%" align="flex-start" justify="space-between">
                    <Text fz="xs">Total Bookings</Text>
                    <Text fz="xs" c="black">
                      {data.totalBookings}
                    </Text>
                  </Group>
                  <Flex w="100%" gap="md" justify="space-between">
                    <Button
                      fullWidth
                      leftSection={<IconEdit size={20} />}
                      bg="blue.1"
                      c="blue"
                      mt="sm"
                      fz="xs"
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth
                      leftSection={<IconTrashX size={20} />}
                      bg="red.0"
                      c="red.4"
                      mt="sm"
                      fz="xs"
                    >
                      Remove
                    </Button>
                  </Flex>
                </Stack>
              </Card>
            );
          }
        )}
      </SimpleGrid>
    </Stack>
  );
}
