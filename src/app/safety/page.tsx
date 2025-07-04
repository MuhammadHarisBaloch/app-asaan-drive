import SafetyFeatureCard from "@/components/features/safety/SafetyFeatureCard";
import { data } from "@/constants/Data";
import {
  Stack,
  Title,
  Text,
  Card,
  Flex,
  Button,
  Grid,
  GridCol,
  Box,
  Center,
  SimpleGrid,
} from "@mantine/core";
import { IconAlertTriangleFilled, IconCheck } from "@tabler/icons-react";

export default function SafetyPage() {
  return (
    <Stack py="xxl" px="lg" align="center" gap="xxl" w="100%">
      <Stack align="center" gap="xs">
        <Text c="red.4" fz="md">
          Safety Features
        </Text>
        <Title order={3}>Emergency & Safety</Title>
        <Text fz="md" ta="center" w="80%">
          Your safety is our top priority Learn about our emergency features and
          safety protocols
        </Text>
      </Stack>
      <Card bg="pink.0" w="100%" style={{ border: "1px solid #fecaca" }}>
        <Grid py="md" px="lg">
          <GridCol span={8}>
            <Stack gap="lg">
              <Title order={4} c="red.4">
                Emergency Button
              </Title>
              <Text fz="sm">
                In case of an emergency, you can use the emergency button in the
                app to instantly alert our support team and send your current
                location
              </Text>
              <Stack gap="sm">
                {data.safety.emergencySteps.map((data, index) => {
                  return (
                    <Flex key={index} align="center" gap="sm">
                      <IconCheck size={20} color="red" />
                      <Text fz="sm">{data}</Text>
                    </Flex>
                  );
                })}
              </Stack>
              <Button w="25%" fz="xs" size="md">
                Learn How It Works
              </Button>
            </Stack>
          </GridCol>
          <GridCol span={4}>
            <Center h="100%">
              <Box bg="pink.1" w={112} h={112} style={{ borderRadius: "50%" }}>
                <Center h="100%">
                  <IconAlertTriangleFilled size={50} color="red" />
                </Center>
              </Box>
            </Center>
          </GridCol>
        </Grid>
      </Card>
      <SimpleGrid cols={2} spacing="xxl">
        <SafetyFeatureCard
          featureList={data.safety.vehicleFeatures}
          heading="Vehicle Safety Features"
        />
        <SafetyFeatureCard
          featureList={data.safety.supportFeatures}
          heading="24/7 Support"
        />
      </SimpleGrid>
    </Stack>
  );
}
