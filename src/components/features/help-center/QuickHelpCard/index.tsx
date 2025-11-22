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
    <Card bg="white.2" h="100%">
      <Stack align="center" px={{ base: "md", sm: "lg" }} py="md" gap="sm">
        <Box
          bg={iconBackground}
          h={{ base: 45, sm: 50 }}
          w={{ base: 45, sm: 50 }}
          style={{ borderRadius: "50%" }}
        >
          <Center h="100%">{icon}</Center>
        </Box>
        <Text fz={{ base: "xs", sm: "sm" }} c="black" fw={500} ta="center">
          {title}
        </Text>
        <Text fz="xs" ta="center" lh={1.4}>
          {description}
        </Text>
        <Flex align="center" gap="xs">
          <Text fz="xs" c={subTitleColor} fw={500}>
            {subTitle}
          </Text>
          <IconArrowNarrowRight size={14} color={subIconColor} />
        </Flex>
      </Stack>
    </Card>
  );
}
