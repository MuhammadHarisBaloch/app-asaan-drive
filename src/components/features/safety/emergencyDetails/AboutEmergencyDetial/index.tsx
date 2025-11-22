import { data } from "@/constants/Data";
import {
  Card,
  Grid,
  GridCol,
  Stack,
  Flex,
  Center,
  Box,
  Text,
} from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function AboutEmergencyDetail() {
  return (
    <Card
      p={{ base: "lg", sm: "xl" }}
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Grid align="center" gutter="lg">
        <GridCol span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
          <Stack gap="lg">
            <Text fz={{ base: "lg", sm: "xl" }} c="black" fw={600}>
              Where to Find the Emergency Button
            </Text>
            {data.emergencyDetails.aboutEmergencyFeature.map((item, index) => {
              return (
                <Flex gap="md" key={index} align="flex-start">
                  <Center
                    bg="red.4"
                    c="white"
                    h={25}
                    w={25}
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
        </GridCol>
        <GridCol span={{ base: 12, md: 5 }} order={{ base: 1, md: 2 }}>
          <Card
            w="100%"
            bg="white.9"
            radius="md"
            py={{ base: "lg", sm: "xl" }}
            style={{
              filter: "drop-shadow(1px 1px 4px rgba(255, 255, 255, 0.21))",
            }}
          >
            <Stack align="center" w="100%">
              <Box bg="red.4" w={50} h={50} style={{ borderRadius: "50%" }}>
                <Center h="100%">
                  <IconAlertTriangle size={25} color="white" />
                </Center>
              </Box>
              <Text fz="md" c="black" fw={500} ta="center">
                Emergency Button
              </Text>
              <Text fz="sm" ta="center">
                Large, red, and always visible
              </Text>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
    </Card>
  );
}
