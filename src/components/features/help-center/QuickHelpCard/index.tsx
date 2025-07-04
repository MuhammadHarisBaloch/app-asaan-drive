import { Card, Stack, Box, Center, Flex, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { JSX } from "react";

interface QuickHelpCardProps {
  icon: JSX.Element;
  iconBackground: string;
  title: string;
  description: string;
  subTitle: string;
  subTitleColor: string;
  subIconColor: string;
}
export default function QuickHelpCard({
  icon,
  iconBackground,
  title,
  description,
  subTitle,
  subTitleColor,
  subIconColor,
}: QuickHelpCardProps) {
  return (
    <Card bg="white.2">
      <Stack align="center" px="lg" py="md">
        <Box bg={iconBackground} h={50} w={50} style={{ borderRadius: "50%" }}>
          <Center h="100%">{icon}</Center>
        </Box>
        <Text fz="sm" c="black" fw={500}>
          {title}
        </Text>
        <Text fz="xs" ta="center">
          {description}
        </Text>
        <Flex align="center">
          <Text fz="xs" c={subTitleColor} fw={500}>
            {subTitle}
          </Text>
          <IconArrowNarrowRight size={15} color={subIconColor} />
        </Flex>
      </Stack>
    </Card>
  );
}
