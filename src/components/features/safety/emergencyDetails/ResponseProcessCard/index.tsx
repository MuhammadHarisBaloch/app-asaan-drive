import { data } from "@/constants/Data";
import { Card, Stack, Flex, Center, Text } from "@mantine/core";

export default function ResponseProcessCard() {
  return (
    <Card
      p={{ base: "lg", sm: "xl" }}
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Stack gap="xl">
        <Text fz={{ base: "lg", sm: "xl" }} c="black" fw={600}>
          Emergency Response Process
        </Text>
        {data.emergencyDetails.emergencyResponse.map((item, index) => {
          return (
            <Flex key={index} align="flex-start" gap="md">
              <Center
                c="red.4"
                h={40}
                w={40}
                bg="red.0"
                style={{ borderRadius: "50%", flexShrink: 0 }}
              >
                {index + 1}
              </Center>
              <Stack gap="xs" style={{ flex: 1 }}>
                <Text fz={{ base: "sm", sm: "md" }} fw={500} c="black">
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
