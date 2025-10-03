import {
  Button,
  Card,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { IconCircleCheck } from "@tabler/icons-react";
import AboutVehicleCard from "./AboutVehicleCard";
import ServicesCard from "./ServicesCard";
import { data } from "@/constants/Data";
import { VehicleModel } from "@/features/vehicle/models/vehicle.model";

interface VehicleDetailsProps {
  bookNow: () => void;
  vehicle: VehicleModel;
}
export default function VehicleDetails({
  bookNow,
  vehicle,
}: VehicleDetailsProps) {
  return (
    <Grid py="3xl" gutter="xxl">
      <GridCol span={8}>
        <Stack gap="xxl">
          <Carousel
            p="md"
            withIndicators
            controlSize={40}
            withControls
            emblaOptions={{
              loop: true,
            }}
            style={{ borderRadius: "20px", border: "1px solid gray" }}
            styles={{
              control: {
                backgroundColor: "#0000005d",
                color: "white",
              },
              indicator: {
                backgroundColor: "red",
              },
            }}
          >
            {vehicle.vehiclePhotos.map((data, index) => {
              return (
                <Carousel.Slide key={index}>
                  <Image
                    src={data}
                    alt={vehicle.vehicleModel}
                    height={100}
                    width={100}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "30rem",
                    }}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
          <AboutVehicleCard vehicle={vehicle} />
          <ServicesCard />
        </Stack>
      </GridCol>
      <GridCol
        span={4}
        style={{
          position: "sticky",
          top: 80,
          alignSelf: "flex-start",
        }}
      >
        <Card withBorder radius="lg" p="xl">
          <Stack w="100%" gap="lg">
            <Text fz="lg" c="black" fw={600}>
              Book this Vehicle
            </Text>
            <Text fz="md">Choose your rental duration and Book instantly</Text>
            <Button
              variant="filled"
              bg="green.1"
              c="green"
              size="lg"
              fw={400}
              fz="md"
              leftSection={<IconCircleCheck color="green" />}
            >
              Available Now
            </Button>
            <Text fz="md" c="black">
              Pricing Option
            </Text>
            {[
              { option: "Daily", price: vehicle.dailyRate },
              { option: "Weekly", price: vehicle.weeklyRate },
              { option: "Monthly", price: vehicle.monthlyRate },
            ].map((data, index) => {
              return (
                <Stack key={index}>
                  <Group justify="space-between">
                    <Text fz="xs">{data.option}</Text>
                    <Text fz="xs" c="black">
                      {data.price}
                    </Text>
                  </Group>
                  <Divider w="100%" />
                </Stack>
              );
            })}
            <Button size="lg" fw={400} fz="md" onClick={bookNow}>
              Book Now
            </Button>
            <Divider w="100%" />
            <Text fz="xs" lh={1.8}>
              Between 6 and 24 hours before pickup:* 50% refund.
              <br />
              Security deposit may be required
              <br />
              Instant booking confirmation
            </Text>
          </Stack>
        </Card>
      </GridCol>
    </Grid>
  );
}
