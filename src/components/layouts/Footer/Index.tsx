import { data } from "@/constants/Data";
import {
  Box,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
  return (
    <Stack bg="blue.9" py="3rem" align="center" px="xl" gap="3rem">
      <Group w="100%" align="flex-start" justify="space-between">
        <Stack w="25%">
          <Text fz="lg" c="white" fw={600}>
            AsaanDrive
          </Text>
          <Text fz="sm">
            Making Vehicle rentals easy and accessible for everyone
          </Text>
          <Group>
            <IconBrandFacebook size={25} color="gray" />
            <IconBrandInstagram size={25} color="gray" />
            <IconBrandTwitter size={25} color="gray" />
            <IconBrandLinkedin size={25} color="gray" />
          </Group>
        </Stack>
        {data.footer.menu.map((item, index) => (
          <Stack key={index}>
            <Text fz="lg" c="white" fw={600}>
              {item.title}
            </Text>
            {item.items.map((data, key) => {
              return (
                <Box key={key}>
                  {data.link && (
                    <UnstyledButton
                      component={Link}
                      href={data.link}
                      c="gray"
                      fz="sm"
                    >
                      {data.name}
                    </UnstyledButton>
                  )}
                  {data.icon && (
                    <Flex align="center" gap="xs">
                      {data.icon}
                      <Text fz="sm">{data.name}</Text>
                    </Flex>
                  )}
                </Box>
              );
            })}
          </Stack>
        ))}
      </Group>
      <Divider w="85%" size="sm" />
      <Text fz="sm">2025 AsaanDrive. All rights reserved</Text>
    </Stack>
  );
}
