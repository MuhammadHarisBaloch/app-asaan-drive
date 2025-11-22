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
  Container,
} from "@mantine/core";
import { IconAlertTriangle, IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function EmergencyDetailsPage() {
  return (
    <Container size="lg" py="xl" px="md">
      <Stack gap="xl">
        <Group justify="space-between">
          <Button
            component={Link}
            href="/safety"
            leftSection={<IconArrowNarrowLeft size={18} color="red" />}
            variant="transparent"
            c="red.4"
            size="sm"
          >
            Back to Safety
          </Button>
          <Box />
        </Group>

        <Stack align="center" gap="md">
          <Box bg="pink.1" w={60} h={60} style={{ borderRadius: "50%" }}>
            <Center h="100%">
              <IconAlertTriangle size={30} color="red" />
            </Center>
          </Box>
          <Title order={3} fw={600} ta="center">
            How the Emergency Button Works
          </Title>
          <Text ta="center" fz={{ base: "sm", sm: "lg" }} maw="800px">
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
          p={{ base: "lg", sm: "xl" }}
          w="100%"
          radius="md"
          style={{
            filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
          }}
        >
          <Stack gap="lg" align="center">
            <Text fz={{ base: "lg", sm: "xl" }} c="black" fw={600} ta="center">
              Need Help Setting Up Emergency Features?
            </Text>
            <Text fz="sm" ta="center">
              Our support team can help you configure emergency contacts and
              preferences.
            </Text>
            <Flex
              gap="md"
              direction={{ base: "column", sm: "row" }}
              justify="center"
              w="100%"
            >
              <Button
                component={Link}
                href="contact"
                size="md"
                fz="sm"
                fw={500}
                maw={{ base: "100%", sm: "200px" }}
              >
                Contact Support
              </Button>
              <Button
                component={Link}
                href="help-center"
                size="md"
                fw={500}
                variant="outline"
                color="gray"
                fz="sm"
                maw={{ base: "100%", sm: "200px" }}
              >
                Visit Help Center
              </Button>
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
