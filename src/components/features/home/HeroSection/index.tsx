import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Stack,
  Text,
  Title,
  Container,
} from "@mantine/core";
import Image from "next/image";
import Images from "../../../../constants/Images";
import Link from "next/link";

function HomeHeroSection() {
  return (
    <Container size="xl" px={{ sm: "lg", base: "xl" }}>
      <Grid gutter="xl" align="center" py="xl">
        {/* Text Content Section */}
        <GridCol span={{ base: 12, sm: 6 }}>
          <Stack gap="xl" justify="center">
            <Box>
              <Text
                fz={{ base: "h2", sm: "h1" }}
                ta={{ base: "center", sm: "start" }}
                c="black"
                fw={700}
                lh={1.2}
              >
                Rent a Vehicle with
              </Text>
              <Title
                fz={{ base: "h2", sm: "h1" }}
                c="red.4"
                style={{
                  filter: "drop-shadow(2px 2px 10px rgba(255, 21, 21, 0.43))",
                }}
                ta={{ base: "center", sm: "start" }}
                lh={1.2}
              >
                AsaanDrive
              </Title>
            </Box>

            <Text
              fz={{ base: "sm", sm: "md" }}
              ta={{ base: "center", sm: "start" }}
              c="dimmed"
            >
              Flexible Vehicle rental service that connects you with the right
              vehicle for your needs. Whether you need a bike, rickshaw, cycle
              AsaanDrive has got you covered
            </Text>

            {/* Buttons - Simple Mantine Approach */}
            <Flex
              gap="md"
              direction={{ base: "column", sm: "row" }}
              justify={{ base: "center", sm: "start" }}
            >
              <Button component={Link} href="/signin" size="md" w="100%">
                Rent Now
              </Button>

              <Button
                variant="outline"
                component={Link}
                href="/signin"
                size="md"
                w="100%"
              >
                List Your Vehicle
              </Button>
            </Flex>
          </Stack>
        </GridCol>

        {/* Image Section */}
        <GridCol span={{ base: 12, sm: 6 }}>
          <Box
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <Image
              src={Images.general.vehicles}
              alt="vehicle-image"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
              priority
            />
          </Box>
        </GridCol>
      </Grid>
    </Container>
  );
}

export default HomeHeroSection;
