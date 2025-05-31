import Images from "@/constants/Images";
import {
  AppShell,
  AppShellHeader,
  Paper,
  Group,
  Flex,
  UnstyledButton,
  Button,
  AppShellMain,
  Image,
} from "@mantine/core";
import { PropsWithChildren } from "react";

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShellHeader withBorder={false}>
        <Paper shadow="md">
          <Group p="lg" justify="space-between">
            <Image src={Images.logos.simple} h={20} w="auto" />
            <Flex gap="xl">
              <UnstyledButton>Home</UnstyledButton>
              <UnstyledButton>How it Works</UnstyledButton>
              <UnstyledButton>Browse Vehicles</UnstyledButton>
            </Flex>
            <Flex gap="lg">
              <Button variant="outline" color="red" radius="md">
                Sign in
              </Button>
              <Button color="red" radius="md">
                Sign up
              </Button>
            </Flex>
          </Group>
        </Paper>
      </AppShellHeader>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
