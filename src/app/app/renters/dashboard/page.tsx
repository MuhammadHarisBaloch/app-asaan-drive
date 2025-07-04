import FeatureCard from "@/components/features/vehicle-owner/featureCard";
import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import {
  Stack,
  Title,
  Text,
  SimpleGrid,
  Card,
  Button,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import { IconArrowNarrowRight, IconCar, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <Stack align="center" py="xxl" px="12rem" gap="3xl" bg="pink.0">
      <Stack gap="sm" align="center" px="lg">
        <Image
          src={Images.logos.bikeLogo}
          alt="bike-logo"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: "10%",
            height: "auto",
          }}
        />

        <Title order={3} fw={600}>
          Welcome to AsaanDrive! 🎉
        </Title>
        <Text fz="lg" ta="center">
          You're all set to start your journey with Pakistan's most trusted
          vehicle rental platform. Let's get you on the road in just a few
          simple steps!
        </Text>
      </Stack>
      <Card w="100%" radius="md" shadow="md">
        <Stack align="center" py="xl" px="md" gap="lg">
          <Title order={4} c="black" fw={600}>
            Ready to Hit the Road?
          </Title>
          <Text fz="sm" ta="center">
            Browse from thousands of vehicles including bikes, cars, and
            rickshaws. Find the perfect ride for your needs, right in your city.
          </Text>
          <Flex gap="xl">
            <Button
              size="lg"
              fz="sm"
              fw={500}
              bg="red.4"
              c="white"
              component={Link}
              href="/app/renters"
              leftSection={<IconCar color="white" />}
              rightSection={<IconArrowNarrowRight color="white" />}
            >
              Start Browsing Vehicles
            </Button>
            <Button
              size="lg"
              fz="sm"
              fw={500}
              variant="outline"
              color="red.4"
              leftSection={<IconMapPin color="red" />}
            >
              Find Nearby Vehicles
            </Button>
          </Flex>
        </Stack>
      </Card>
      <SimpleGrid cols={3} w="100%" spacing="xxl">
        {data.renter.dashboard.featureCard.map((feature, index) => {
          return <FeatureCard key={index} {...feature} />;
        })}
      </SimpleGrid>
      <Card w="100%" bg="pink.1" radius="md" px="xl" py="xxl">
        <Stack align="center" w="100%" gap="xl">
          <Text fz="sm" c="black" fw={500}>
            💡 Quick Tips to Get Started
          </Text>
          <SimpleGrid cols={2} spacing="lg">
            {data.renter.dashboard.quickTips.map((tip, index) => {
              return (
                <Flex key={index} gap="sm">
                  <Text fz="sm" c="red.4">
                    {index + 1}.
                  </Text>
                  <Text fz="sm">{tip}</Text>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Card>
      <Stack align="center" w="100%">
        <Text fz="sm">Need help getting started?</Text>
        <Flex gap="lg">
          {data.renter.dashboard.quickLinks.map((data, index) => {
            return (
              <UnstyledButton
                key={index}
                component={Link}
                href={data.link}
                fz="sm"
                c="red.4"
                fw={500}
              >
                {data.name}
              </UnstyledButton>
            );
          })}
        </Flex>
      </Stack>
    </Stack>
  );
}
