import { Card, Center, Stack, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { JSX } from "react";

interface ProcessCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}
export default function ProcessCard({
  icon,
  title,
  description,
}: ProcessCardProps) {
  return (
    <Card
      bg="pink"
      p="xl"
      radius="md"
      shadow="xl"
      style={{
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Stack>
        <Center bg="pink.1" w={70} h={70} style={{ borderRadius: "50%" }}>
          {icon}
        </Center>
        <Text c="black" fz="lg" fw={500}>
          {title}
        </Text>
        <Text c="black" fz="sm">
          {description}
        </Text>
      </Stack>
    </Card>
  );
}
