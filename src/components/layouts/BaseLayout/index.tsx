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

const headerMenu = [
  { name: "Home", link: "/" },
  { name: "How it works", link: "/how-it-works" },
  { name: "Contact us", link: "/contact" },
];

export default function BaseLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
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
