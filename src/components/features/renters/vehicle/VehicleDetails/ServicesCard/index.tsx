import { data } from "@/constants/Data";
import { Card, Stack, SimpleGrid, Flex, Center, Text } from "@mantine/core";

export default function ServicesCard() {
  return (
    <Card
      w="100%"
      radius="lg"
      style={{ filter: "drop-shadow(1px 1px 1px #2323238c)" }}
    >
      <Stack gap="xxl" py="lg" px="md">
        <Text fz="lg" fw={600} c="black">
          Why choose AsaanDrive?
        </Text>
        <SimpleGrid cols={2} spacing="xxl">
          {data.renter.vehicle.vehicleDetails.ourServices.map((data, index) => {
            return (
              <Card key={index} w="100%" withBorder radius="lg">
                <Stack px="lg" py="md" gap="lg">
                  <Flex align="center" gap="xl">
                    <Center
                      h={50}
                      w={50}
                      bg="pink.1"
                      style={{ borderRadius: "50%" }}
                    >
                      {data.icon}
                    </Center>
                    <Text fz="md" c="black" fw={500}>
                      {data.title}
                    </Text>
                  </Flex>
                  <Text fz="sm">{data.subTitle}</Text>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Card>
  );
}
