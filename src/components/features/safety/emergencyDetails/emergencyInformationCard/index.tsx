import { data } from "@/constants/Data";
import { Card, Stack, Flex, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function EmergencyInformationCard() {
  return (
    <Card
      p={{ base: "lg", sm: "xl" }}
      w="100%"
      radius="md"
      bg="pink.0"
      style={{ border: "1px solid #fecaca" }}
    >
      <Stack gap="lg">
        <Text fz={{ base: "lg", sm: "xl" }} c="red.9" fw={600}>
          Important Information
        </Text>
        {data.emergencyDetails.emergencyInfo.map((info, index) => {
          return (
            <Flex key={index} align="flex-start" gap="md">
              <IconAlertTriangle
                size={18}
                color="#B91C1C"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <Stack gap="xs" style={{ flex: 1 }}>
                <Text fz={{ base: "sm", sm: "md" }} c="red.8" fw={500}>
                  {info.title}
                </Text>
                <Text fz="sm" c="red.8">
                  {info.subTitle}
                </Text>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </Card>
  );
}
