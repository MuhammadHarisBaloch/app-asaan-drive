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

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppShell header={{ height: 80 }}>
        <AppShellHeader withBorder={false}>
          <Paper shadow="md" bg="white.0">
            <Group p="lg" justify="space-between">
              <Image src={Images.logos.simple} h={20} w="auto" />
              <Flex gap="xl">
                <UnstyledButton component={Link} href="/">
                  Home
                </UnstyledButton>
                <UnstyledButton component={Link} href="/how-it-works">
                  How it works
                </UnstyledButton>
                <UnstyledButton component={Link} href="/subscription-plans">
                  Subscription plans
                </UnstyledButton>
              </Flex>
              <Flex gap="lg">
                <Button variant="outline">Sign in</Button>
                <Button>Sign up</Button>
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
