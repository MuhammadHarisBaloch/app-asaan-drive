import { data } from "@/constants/Data";
import { Card, Stack, Flex, Center, Text } from "@mantine/core";

export default function ResponseProcessCard() {
  return (
    <Card
      p="xl"
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Stack gap="xxl">
        <Text fz="xl" c="black" fw={600}>
          Emergency Response Process
        </Text>
        {data.emergencyDetails.emergencyResponse.map((item, index) => {
          return (
            <Flex key={index} align="flex-start" gap="lg">
              <Center
                c="red.4"
                h={50}
                w={50}
                bg="red.0"
                style={{ borderRadius: "50%" }}
              >
                {index + 1}
              </Center>
              <Stack gap="xs">
                <Text fz="md" fw={500} c="black">
                  {item.title}
                </Text>
                <Text fz="sm">{item.subTitle}</Text>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </Card>
  );
}
