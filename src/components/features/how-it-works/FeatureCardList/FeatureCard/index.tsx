import { Card, Center, Stack, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { JSX } from "react";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}
export default function FeatureCard({
  icon,
  title,
  subtitle,
}: FeatureCardProps) {
  return (
    <Card
      className="hover-expand-item"
      bg="white.0"
      p="xl"
      radius="md"
      shadow="xl"
      style={{
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Stack>
        <Center bg="pink.0" w={70} h={70} style={{ borderRadius: "50%" }}>
          {icon}
        </Center>
        <Text c="black" fz="lg" fw={500}>
          {title}
        </Text>
        <Text c="black" fz="sm">
          {subtitle}
        </Text>
      </Stack>
    </Card>
  );
}
