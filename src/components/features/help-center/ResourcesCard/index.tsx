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
      p={{ base: "md", sm: "lg" }}
      component={Link}
      href={link}
      h="100%"
    >
      <Stack gap="xs" align="center" justify="center" h="100%">
        <Text fz={{ base: "xs", sm: "sm" }} c="black" fw={500} ta="center">
          {title}
        </Text>
        <Text fz="xs" ta="center" lh={1.4}>
          {subTitle}
        </Text>
      </Stack>
    </Card>
  );
}
