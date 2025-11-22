import { data } from "@/constants/Data";
import {
  Box,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  UnstyledButton,
  SimpleGrid,
  Container,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box bg="blue.9" py={{ base: "2rem", md: "3rem" }}>
      <Container size="xl">
        <Stack gap="xl" align="center">
          {/* Main Footer Content */}
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" w="100%">
            {/* Company Info */}
            <Stack gap="md">
              <Text fz={{ base: "md", md: "lg" }} c="white" fw={600}>
                AsaanDrive
              </Text>
              <Text fz={{ base: "xs", sm: "sm" }} c="gray.3" lh="1.6">
                Making Vehicle rentals easy and accessible for everyone
              </Text>
              <Group gap="sm">
                <IconBrandFacebook
                  size={20}
                  color="#9CA3AF"
                  style={{ cursor: "pointer" }}
                />
                <IconBrandInstagram
                  size={20}
                  color="#9CA3AF"
                  style={{ cursor: "pointer" }}
                />
                <IconBrandTwitter
                  size={20}
                  color="#9CA3AF"
                  style={{ cursor: "pointer" }}
                />
                <IconBrandLinkedin
                  size={20}
                  color="#9CA3AF"
                  style={{ cursor: "pointer" }}
                />
              </Group>
            </Stack>

            {/* Footer Menu Items */}
            {data.footer.menu.map((item, index) => (
              <Stack gap="sm" key={index}>
                <Text fz={{ base: "sm", md: "lg" }} c="white" fw={600}>
                  {item.title}
                </Text>
                {item.items.map((data, key) => (
                  <Box key={key}>
                    {data.link && (
                      <UnstyledButton
                        component={Link}
                        href={data.link}
                        c="gray.3"
                        fz={{ base: "xs", sm: "sm" }}
                        style={{
                          display: "block",
                          padding: "4px 0",
                          transition: "color 0.2s",
                        }}
                        className="footer-link"
                      >
                        {data.name}
                      </UnstyledButton>
                    )}
                    {data.icon && (
                      <Flex align="center" gap="xs">
                        {data.icon}
                        <Text fz={{ base: "xs", sm: "sm" }} c="gray.3">
                          {data.name}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                ))}
              </Stack>
            ))}
          </SimpleGrid>

          {/* Divider */}
          <Divider w={{ base: "100%", md: "85%" }} size="sm" color="gray.7" />

          {/* Copyright */}
          <Text fz={{ base: "xs", sm: "sm" }} c="gray.4" ta="center">
            2025 AsaanDrive. All rights reserved
          </Text>
        </Stack>
      </Container>

      <style jsx>{`
        .footer-link:hover {
          color: white !important;
        }
      `}</style>
    </Box>
  );
}
