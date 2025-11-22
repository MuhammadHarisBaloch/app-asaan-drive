import { Card, Center, Stack, Text } from "@mantine/core";
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
      p={{ base: "lg", sm: "xl" }}
      radius="md"
      shadow="xl"
      h="100%"
      style={{
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Stack align="center" ta="center">
        <Center
          bg="pink.0"
          w={{ base: 60, sm: 70 }}
          h={{ base: 60, sm: 70 }}
          style={{ borderRadius: "50%" }}
        >
          {icon}
        </Center>
        <Text c="black" fz={{ base: "md", sm: "lg" }} fw={500}>
          {title}
        </Text>
        <Text c="black" fz={{ base: "xs", sm: "sm" }} lh={1.6}>
          {subtitle}
        </Text>
      </Stack>
    </Card>
  );
}
