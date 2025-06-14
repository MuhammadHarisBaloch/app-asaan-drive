import { Box, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";

export default function HomeFooterSection() {
  return (
    <Stack bg="gray.0" py="3rem" align="center" px="xl" gap="3rem" mt="4rem">
      <Group w="100%" align="flex-start" justify="space-between">
        <Stack w="25%">
          <Text fz="20px" c="white" fw={600}>
            AsaanDrive
          </Text>
          <Text fz="16px">
            Making Vehicle rentals easy and accessible for everyone
          </Text>
          <Group>
            <IconBrandFacebook size={25} color="gray" />
            <IconBrandInstagram size={25} color="gray" />
            <IconBrandTwitter size={25} color="gray" />
            <IconBrandLinkedin size={25} color="gray" />
          </Group>
        </Stack>
        <Stack>
          <Text fz="20px" c="white" fw={600}>
            Quick links
          </Text>
          <Text fz="16px">Home</Text>
          <Text fz="16px">How it works</Text>
          <Text fz="16px">Subscription plans </Text>
        </Stack>
        <Stack>
          <Text fz="20px" c="white" fw={600}>
            Support
          </Text>
          <Text fz="16px">Help Center</Text>
          <Text fz="16px">Safety Information</Text>
          <Text fz="16px">Contact Us </Text>
          <Text fz="16px">FAQs </Text>
        </Stack>
        <Stack>
          <Text fz="20px" c="white" fw={600}>
            Contact
          </Text>
          <Flex align="center" gap="xs">
            <IconMapPin size={20} color="red" />
            <Text fz="16px">MUET Boys Hostel KhairpurMir’s</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <IconPhone size={20} color="red" />
            <Text fz="16px">+923461392377</Text>
          </Flex>
          <Flex align="center" gap="xs">
            <IconMail size={20} color="red" />
            <Text fz="16px">AsaanDrive786@gmail.com</Text>
          </Flex>
        </Stack>
      </Group>
      <Divider w="85%" size="sm" />
      <Text fz="16px">2025 AsaanDrive. All rights reserved</Text>
    </Stack>
  );
}
