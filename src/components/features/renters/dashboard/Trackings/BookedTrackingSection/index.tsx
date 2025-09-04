import Images from "@/constants/Images";
import { Button, Center, Flex, Grid, Group, Stack, Text } from "@mantine/core";
import { IconLocationFilled } from "@tabler/icons-react";
import Image from "next/image";
import BookedVehicleInfo from "./BookedVehicleInfo";

export default function BookedTrackingSection() {
  return (
    <Stack gap="xl">
      <Group
        bg="blue.0"
        p="lg"
        justify="space-between"
        style={{ borderRadius: "10px", border: "1px solid #47d1e346" }}
      >
        <Flex align="center" gap="md">
          <Center
            h={40}
            w={40}
            bg="blue.1"
            style={{ borderRadius: "50%", border: "1px solid #47d1e346" }}
          >
            <IconLocationFilled color="blue" size={20} />
          </Center>
          <Stack gap={0}>
            <Text fz="12px" fw={500} c="black">
              Trip in Progress
            </Text>
            <Text fz="12px">Estimated arrival : 11:32 PM</Text>
          </Stack>
        </Flex>
        <Button size="xs">End Trip</Button>
      </Group>
      <Grid gutter="lg">
        <Grid.Col span={7}>
          <Image
            src={Images.Map.findNearMeMap}
            alt="map"
            width={100}
            height={100}
            sizes="100vw"
            style={{
              height: "auto",
              width: "100%",
            }}
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <BookedVehicleInfo />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
