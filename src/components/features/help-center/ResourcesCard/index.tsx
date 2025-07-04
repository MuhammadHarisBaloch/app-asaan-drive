import { Card, Stack, Text } from "@mantine/core";
import Link from "next/link";

interface ResourcesCardProps {
  title: string;
  subTitle: string;
  link: string;
}
export default function ResourcesCard({
  title,
  subTitle,
  link,
}: ResourcesCardProps) {
  return (
    <Card
      radius="md"
      style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.24))" }}
      p="lg"
      component={Link}
      href={link}
    >
      <Stack gap="xxs" align="center">
        <Text fz="sm" c="black" fw={500}>
          {title}
        </Text>
        <Text fz="xs">{subTitle}</Text>
      </Stack>
    </Card>
  );
}
