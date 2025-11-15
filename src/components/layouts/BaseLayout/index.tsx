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
} from "@mantine/core";
import { PropsWithChildren } from "react";
import Footer from "../Footer/Index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "./AuthButtons";

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
  console.log("parhname ", pathname);
  return (
    <>
      <AppShell header={{ height: 70 }}>
        <AppShellHeader withBorder={false}>
          <Paper shadow="md" bg="white.0">
            <Group p="lg" justify="space-between">
              <Image src={Images.logos.simple} h={20} w="auto" />
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
              <AuthButtons />
            </Group>
          </Paper>
        </AppShellHeader>
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
      {pathname.startsWith("/app/renter") ? null : pathname.startsWith(
          "/app/vehicles-owner"
        ) ? null : pathname.startsWith("/app/admin") ? null : (
        <Footer />
      )}
    </>
  );
}
