"use client";

import Images from "@/constants/Images";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Flex,
  Group,
  Image,
  Paper,
  UnstyledButton,
  Burger,
  Drawer,
  Stack,
  Box,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import Footer from "../Footer/Index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "./AuthButtons";
import { useDisclosure } from "@mantine/hooks";

interface HeaderMenuItem {
  name: string;
  link: string;
}

const baseMenu: HeaderMenuItem[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "How it works",
    link: "/how-it-works",
  },
];

const websiteMenu: HeaderMenuItem[] = [
  ...baseMenu,
  { name: "Contact us", link: "/contact" },
];

const renterMenu: HeaderMenuItem[] = [
  {
    name: "Dashboard",
    link: "/app/renter",
  },
  {
    name: "Browse Vehicle",
    link: "/app/renter/browse-vehicle",
  },
  {
    name: "Find Near me",
    link: "/app/renter/find-near-me",
  },
];

const vehicleOwnerMenu: HeaderMenuItem[] = [
  {
    name: "Dashboard",
    link: "/app/vehicles-owner",
  },
  {
    name: "List Your Vehicles",
    link: "/app/vehicles-owner/list-your-vehicle",
  },
];

const adminMenu: HeaderMenuItem[] = [
  {
    name: "",
    link: "",
  },
];

function getHeaderMenu(pathname: string): HeaderMenuItem[] {
  if (pathname.startsWith("/app/renter")) return renterMenu;
  if (pathname.startsWith("/app/vehicles-owner")) return vehicleOwnerMenu;
  if (pathname.startsWith("/app/admin")) return adminMenu;
  return websiteMenu;
}

export default function BaseLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const headerMenu = getHeaderMenu(pathname);

  return (
    <>
      <AppShell header={{ height: { base: 40, md: 70 } }}>
        <AppShellHeader withBorder={false}>
          <Paper shadow="md" bg="white.0">
            <Group p={{ base: "md", md: "lg" }} justify="space-between">
              {/* Logo */}
              <Image
                src={Images.logos.simple}
                h={{ base: 16, md: 20 }}
                w="auto"
              />

              {/* Desktop Menu - Hidden on mobile */}
              <Flex gap="xl" visibleFrom="md">
                {headerMenu.map((data, index) => (
                  <UnstyledButton
                    className="hover-expand-item"
                    key={index}
                    c={pathname == data.link ? "red.4" : "gray"}
                    fw={pathname == data.link ? 500 : 400}
                    component={Link}
                    href={data.link}
                  >
                    {data.name}
                  </UnstyledButton>
                ))}
              </Flex>

              {/* Mobile Menu Button - Hidden on desktop */}
              <Group hiddenFrom="md">
                <Burger opened={opened} onClick={toggle} size="sm" />
              </Group>

              {/* Auth Buttons - Hidden on mobile in nav */}
              <Box visibleFrom="sm">
                <AuthButtons />
              </Box>
            </Group>
          </Paper>
        </AppShellHeader>

        <AppShellMain>{children}</AppShellMain>
      </AppShell>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="75%"
        padding="md"
      >
        <Stack gap="lg">
          {/* Mobile Menu Items */}
          {headerMenu.map((data, index) => (
            <UnstyledButton
              key={index}
              c={pathname == data.link ? "red.4" : "gray"}
              fw={pathname == data.link ? 600 : 400}
              component={Link}
              href={data.link}
              onClick={close}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {data.name}
            </UnstyledButton>
          ))}

          {/* Auth Buttons in Mobile Drawer */}
          <Box hiddenFrom="sm" mt="xl">
            <AuthButtons mobile onButtonClick={close} />
          </Box>
        </Stack>
      </Drawer>

      {/* Footer Condition */}
      {pathname.startsWith("/app/renter") ? null : pathname.startsWith(
          "/app/vehicles-owner"
        ) ? null : pathname.startsWith("/app/admin") ? null : (
        <Footer />
      )}
    </>
  );
}