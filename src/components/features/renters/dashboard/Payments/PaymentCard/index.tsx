import { Card, Flex, Center, Stack, Text } from "@mantine/core";
import { JSX } from "react";

interface PaymentCardProps {
  icon: JSX.Element;
  iconBg: string;
  title: string;
  price: string;
  subTitle?: string;
}
export default function PaymentCard({
  icon,
  iconBg,
  title,
  subTitle,
  price,
}: PaymentCardProps) {
  return (
    <Card
      radius="md"
      p="lg"
      style={{ filter: "drop-shadow(1px 1px 2px #53535336)" }}
    >
      <Flex align="center" gap="lg">
        <Center h={50} w={50} bg={iconBg} style={{ borderRadius: "10px" }}>
          {icon}
        </Center>
        <Stack gap={0}>
          <Text fz="xs">{title}</Text>
          <Text fz="lg" fw={600} c="black">
            Pkr {price}
          </Text>
          <Text fz="12px">{subTitle}</Text>
        </Stack>
      </Flex>
    </Card>
  );
}
