import AboutEmergencyDetail from "@/components/features/safety/emergencyDetails/AboutEmergencyDetial";
import EmergencyContactCard from "@/components/features/safety/emergencyDetails/EmergencyContactCard";
import EmergencyFeatureCard from "@/components/features/safety/emergencyDetails/EmergencyFeatureCard";
import EmergencyInformationCard from "@/components/features/safety/emergencyDetails/emergencyInformationCard";
import ResponseProcessCard from "@/components/features/safety/emergencyDetails/ResponseProcessCard";
import {
  Group,
  Stack,
  Button,
  Box,
  Center,
  Title,
  Text,
  Card,
  Flex,
} from "@mantine/core";
import { IconAlertTriangle, IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function EmergencyDetailsPage() {
  return (
    <Stack px="8rem" py="4rem" gap="xxl">
      <Group justify="space-between">
        <Button
          component={Link}
          href="/safety"
          leftSection={<IconArrowNarrowLeft color="red" />}
          variant="transparent"
          c="red.4"
        >
          Back to Safety
        </Button>
        <Box />
      </Group>
      <Stack align="center">
        <Box bg="pink.1" w={80} h={80} style={{ borderRadius: "50%" }}>
          <Center h="100%">
            <IconAlertTriangle size={40} color="red" />
          </Center>
        </Box>
        <Title order={3} fw={600}>
          How the Emergency Button Works
        </Title>
        <Text ta="center" fz="lg" w="70%">
          Your safety is our priority. Learn how our emergency system protects
          you during your ride.
        </Text>
      </Stack>
      <AboutEmergencyDetail />
      <EmergencyFeatureCard />
      <ResponseProcessCard />
      <EmergencyContactCard />
      <EmergencyInformationCard />
      <Card
        p="xl"
        w="100%"
        radius="md"
        style={{
          filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
        }}
      >
        <Stack gap="lg" align="center">
          <Text fz="xl" c="black" fw={600}>
            Need Help Setting Up Emergency Features?
          </Text>
          <Text fz="sm">
            Our support team can help you configure emergency contacts and
            preferences.
          </Text>
          <Flex gap="lg">
            <Button component={Link} href="contact" size="lg" fz="sm" fw={500}>
              Contact Support
            </Button>
            <Button
              component={Link}
              href="help-center"
              size="lg"
              fw={500}
              variant="outline"
              color="gray"
              fz="sm"
            >
              Visit Help Center
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
}
