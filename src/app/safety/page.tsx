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
  Container,
} from "@mantine/core";
import { IconAlertTriangleFilled, IconCheck } from "@tabler/icons-react";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <Container size="lg" py="xl" px="md">
      <Stack align="center" gap="xl" w="100%">
        <Stack align="center" gap="xs">
          <Text c="red.4" fz={{ base: "sm", sm: "md" }}>
            Safety Features
          </Text>
          <Title order={3} ta="center">
            Emergency & Safety
          </Title>
          <Text fz={{ base: "sm", sm: "md" }} ta="center" maw="800px">
            Your safety is our top priority Learn about our emergency features
            and safety protocols
          </Text>
        </Stack>

        {/* Emergency Card */}
        <Card bg="pink.0" w="100%" style={{ border: "1px solid #fecaca" }}>
          <Grid py={{ base: "md", sm: "lg" }} px={{ base: "md", sm: "lg" }}>
            <GridCol span={{ base: 12, md: 8 }} order={{ base: 2, md: 1 }}>
              <Stack gap="lg">
                <Title order={4} c="red.4">
                  Emergency Button
                </Title>
                <Text fz="sm">
                  In case of an emergency, you can use the emergency button in
                  the app to instantly alert our support team and send your
                  current location
                </Text>
                <Stack gap="sm">
                  {data.safety.emergencySteps.map((data, index) => {
                    return (
                      <Flex key={index} align="center" gap="sm">
                        <IconCheck size={18} color="red" />
                        <Text fz="sm">{data}</Text>
                      </Flex>
                    );
                  })}
                </Stack>
                <Button
                  component={Link}
                  href="/emergency-details"
                  w={{ base: "100%", md: "50%" }}
                  fz="xs"
                  size="md"
                >
                  Learn How It Works
                </Button>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
              <Center h="100%" py={{ base: "md", md: 0 }}>
                <Box
                  bg="pink.1"
                  w={{ base: 80, sm: 112 }}
                  h={{ base: 80, sm: 112 }}
                  style={{ borderRadius: "50%" }}
                >
                  <Center h="100%">
                    <IconAlertTriangleFilled color="red" />
                  </Center>
                </Box>
              </Center>
            </GridCol>
          </Grid>
        </Card>

        {/* Safety Features Grid */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" w="100%">
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
    </Container>
  );
}
