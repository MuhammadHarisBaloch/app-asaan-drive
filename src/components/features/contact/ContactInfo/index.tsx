import { Flex, Stack, Text } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { JSX } from "react";

interface ContactInfoProps {
  icon: JSX.Element;
  title: string;
  subTitle: string;
  description: string;
}
export default function ContactInfo({
  icon,
  title,
  subTitle,
  description,
}: ContactInfoProps) {
  return (
    <Flex align="flex-start" gap="md" mb="md">
      {icon}
      <Stack gap="xs">
        <Text fz="lg" c="black">
          {title}
        </Text>
        <Text fz="sm" lh={0.5}>
          {subTitle}
        </Text>
        <Text fz="sm">{description}</Text>
      </Stack>
    </Flex>
  );
}
