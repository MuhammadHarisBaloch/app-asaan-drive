import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import { Button, Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import {
  IconMapPin,
  IconExclamationCircle,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import Image from "next/image";

export default function BookedVehicleInfo() {
  return (
    <Stack>
      <Card withBorder radius="lg" p="xl" pb="xxl">
        <Stack gap="lg">
          <Text fz="lg" c="black" fw={500}>
            Vehicle Information
          </Text>
          <Flex gap="lg">
            <Image
              src={Images.listedVehicles.cd125}
              alt="cd-125"
              height={100}
              width={100}
              sizes="100vw"
              style={{
                width: "40%",
                height: "auto",
              }}
            />
            <Stack gap="xs">
              <Text fz="sm" fw={600} c="black">
                Honda 125
              </Text>
              <Text fz="12px">Bike . 2025</Text>
              <Text fz="12px">KHI-123</Text>
            </Stack>
          </Flex>
          <Flex gap="sm">
            <IconMapPin size={20} color="gray" />
            <Stack gap={0}>
              <Text fz="xs">Pickup Location</Text>
              <Text fz="xs" c="black" fw={500}>
                Khairpur Mir’s, Pakistan
              </Text>
            </Stack>
          </Flex>
          <Flex gap="sm">
            <IconMapPin size={20} color="gray" />
            <Stack gap={0}>
              <Text fz="xs">Rental Type</Text>
              <Text fz="xs" c="black" fw={500}>
                Daily . Rs 1200/Day
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Card>
      <Card withBorder radius="lg" p="xl" pb="xxl">
        <Stack gap="xl">
          <Text fz="lg" c="black" fw={500}>
            Owner Information
          </Text>
          <Flex align="center" gap="md">
            <Image
              src={Images.ProfilePicturs.OwnerProfilePicture}
              alt="Inzamam-profile"
              height={100}
              width={100}
              sizes="100vw"
              style={{
                height: "auto",
                width: "20%",
              }}
            />
            <Stack gap={0}>
              <Text fz="sm" c="black" fw={500}>
                Inzamam
              </Text>
              <Text fz="xs" fw={500}>
                Vehicle Owner
              </Text>
            </Stack>
          </Flex>
          <Flex align="center" gap="md">
            <Button
              w="100%"
              leftSection={<IconPhone size={18} color="gray" />}
              variant="outline"
              color="gray"
              fw={400}
            >
              Call Owner
            </Button>
            <Button
              w="100%"
              leftSection={<IconMail size={18} color="gray" />}
              variant="outline"
              color="gray"
              fw={400}
            >
              Email
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
}
