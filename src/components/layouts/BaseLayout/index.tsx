"use client";

import Images from "@/constants/Images";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  UnstyledButton,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import Footer from "../Footer/Index";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  ...baseMenu,
  {
    name: "Browse Vehicle",
    link: "/app/renters",
  },
  {
    name: "Find Near me",
    link: "/app/find-near-me",
  },
];

const vehicleOwnerMenu: HeaderMenuItem[] = [
  ...baseMenu,
  {
    name: "List Your Vehicles",
    link: "/app/vehicles-owner",
  },
];

function getHeaderMenu(url: string): HeaderMenuItem[] {
  // url = /
  console.log("Header Menu function ", url);
  // if (url.startsWith("/")) return websiteMenu;
  if (url.startsWith("/app/renters")) return renterMenu;
  if (url.startsWith("/app/vehicles-owner")) return vehicleOwnerMenu;
  return websiteMenu;
}

const menuMapper: Record<string, HeaderMenuItem[]> = {
  "/app/renters": renterMenu,
  "/": websiteMenu,
  "/app/vehicles-owner": vehicleOwnerMenu,
};
export default function BaseLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  console.log("parhname ", pathname);
  return (
    <>
      <AppShell header={{ height: 70 }}>
        <AppShellHeader withBorder={false}>
          <Paper shadow="md" bg="white.0">
            <Group p="lg" justify="space-between">
              <Link href="/">
                <Image src={Images.logos.simple} h={20} w="auto" />
              </Link>
              <Flex gap="xl">
                {getHeaderMenu(pathname).map((data, index) => (
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

              <Flex gap="lg">
                <Button
                  className="hover-expand-item"
                  component={Link}
                  href="/signin"
                  variant="outline"
                >
                  Sign in
                </Button>
                <Button
                  className="hover-expand-item"
                  component={Link}
                  href="/signup"
                >
                  Sign up
                </Button>
              </Flex>
            </Group>
          </Paper>
        </AppShellHeader>
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
      <Footer />
    </>
  );
}
