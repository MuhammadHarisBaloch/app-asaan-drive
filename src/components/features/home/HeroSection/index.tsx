import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Images from "../../../../constants/Images";
import Link from "next/link";

function HomeHeroSection() {
  return (
    <Grid px="lg" h="100%" pt="xl">
      <GridCol span={6}>
        <Stack w="100%" h="100%" gap="xxl">
          <Box>
            <Title order={1} lh={1}>
              Rent a Vehicle with
            </Title>
            <Title
              order={1}
              c="red.4"
              style={{
                filter: "drop-shadow(2px 2px 10px rgba(255, 21, 21, 0.43))",
              }}
            >
              AsaanDrive
            </Title>
          </Box>
          <Text w="75%">
            Flexible Vehicle rental service that connects you with the right
            vehicle for your needs. Whether you need a bike, rickshaw, cycle
            AsaanDrive has got you covered
          </Text>
          <Flex gap="lg">
            <Button component={Link} href="/signin">
              Rent Now
            </Button>
            <Button variant="outline" component={Link} href="/signin">
              List Your Vehicle
            </Button>
          </Flex>
        </Stack>
      </GridCol>
      <GridCol span={6} pt="xl">
        <Image
          src={Images.general.vehicles}
          alt="vehicle-image"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </GridCol>
    </Grid>
  );
}

export default HomeHeroSection;
