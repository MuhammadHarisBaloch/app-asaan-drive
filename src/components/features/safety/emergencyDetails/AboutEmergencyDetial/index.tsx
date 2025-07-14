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
const aboutEmergencyButton = [
  {
    title: "Main Dashboard",
    subTitle:
      "The emergency button is prominently displayed on your main dashboard, always visible during active rentals.",
  },
  {
    title: "Trip Screen",
    subTitle:
      "During your trip, the button remains accessible in the top-right corner of your screen.",
  },
  {
    title: "Quick Access Menu",
    subTitle:
      "Pull down the quick access menu from any screen to find the emergency button.",
  },
];
export default function AboutEmergencyDetail() {
  return (
    <Card
      p="xl"
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Grid align="center">
        <GridCol span={7}>
          <Stack gap="lg">
            <Text fz="xl" c="black" fw={600}>
              Where to Find the Emergency Button
            </Text>
            {aboutEmergencyButton.map((item, index) => {
              return (
                <Flex gap="md" key={index}>
                  <Center
                    bg="red.4"
                    c="white"
                    h={30}
                    w={30}
                    style={{ borderRadius: "50%" }}
                  >
                    {index + 1}
                  </Center>
                  <Stack w="80%" gap="xs">
                    <Text fz="md" fw={500} c="black">
                      {item.title}
                    </Text>
                    <Text fz="sm">{item.subTitle}</Text>
                  </Stack>
                </Flex>
              );
            })}
          </Stack>
        </GridCol>
        <GridCol span={5}>
          <Card
            w="100%"
            bg="white.9"
            radius="md"
            py="xl"
            style={{
              filter: "drop-shadow(1px 1px 4px rgba(255, 255, 255, 0.21))",
            }}
          >
            <Stack align="center" w="100%">
              <Box bg="red.4" w={60} h={60} style={{ borderRadius: "50%" }}>
                <Center h="100%">
                  <IconAlertTriangle size={30} color="white" />
                </Center>
              </Box>
              <Text fz="md" c="black" fw={500}>
                Emergency Button
              </Text>
              <Text fz="sm">Large, red, and always visible</Text>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
    </Card>
  );
}
