import FeatureCard from "@/components/features/vehicle-owner/featureCard";
import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import { Stack, Title, Text, SimpleGrid, Card, Button } from "@mantine/core";
import { IconArrowNarrowRight, IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <Stack align="center" py="xxl" px="lg" gap="3xl">
      <Stack gap="sm" align="center">
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
        <Text fz="lg" ta="center" w="70%">
          You're now part of Pakistan's leading vehicle rental platform. Let's
          get you set up to start earning from your vehicle!
        </Text>
      </Stack>
      <SimpleGrid cols={3} w="100%" spacing="xxl">
        {data.vehicleOwner.dashboard.featureCard.map((feature, index) => {
          return <FeatureCard key={index} {...feature} />;
        })}
      </SimpleGrid>
      <Card
        w="100%"
        radius="md"
        py="xxl"
        bg="red.8"
        style={{ border: "1px solid #570c0caf" }}
        // style={{
        //   backgroundImage: "linear-gradient(150deg, #B91C1C , #ff00048f)",
        // }}
      >
        <Stack align="center">
          <Title order={3} c="white" fw={500}>
            Ready to Start Earning?
          </Title>
          <Text fz="lg" c="white">
            Add your first vehicle and join thousands of successful owners on
            AsaanDrive
          </Text>
          <Button
            size="xl"
            fz="lg"
            fw={500}
            leftSection={<IconPlus color="red" size={25} />}
            rightSection={<IconArrowNarrowRight color="red" size={25} />}
            bg="white"
            c="red.4"
          >
            Add Your First Vehicle
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
