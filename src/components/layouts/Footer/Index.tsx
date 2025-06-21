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
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { JSX } from "react";

interface FooterMenu {
  title: string;
  items: {
    name: string;
    link?: string;
    icon?: JSX.Element;
  }[];
}

const footerMenu: FooterMenu[] = [
  {
    title: "Quick Links",
    items: [
      { name: "Home", link: "/" },
      { name: "How it works ", link: "/how-it-works" },
      { name: "Subscription plan", link: "/subscription-plans" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", link: "/help-center" },
      { name: "Safety Information", link: "/safety-information" },
      { name: "Contact us", link: "/contact-us" },
      { name: "FAQs", link: "/faqs" },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        name: "MUET Boys Hostel KhairpurMir’s",
        icon: <IconMapPin size={20} color="red" />,
      },
      {
        name: "+923461392377",
        icon: <IconPhone size={20} color="red" />,
      },
      {
        name: "AsaanDrive786@gmail.com",
        icon: <IconMail size={20} color="red" />,
      },
    ],
  },
];

export default function Footer() {
  return (
    <Stack bg="gray.0" py="3rem" align="center" px="xl" gap="3rem" mt="4rem">
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
        {footerMenu.map((item, index) => (
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
