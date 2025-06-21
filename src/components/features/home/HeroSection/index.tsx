import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Images from "../../../../constants/Images";

function HomeHeroSection() {
  return (
    <SimpleGrid cols={2} px="lg" h="calc(100dvh - 80px)" spacing="xs">
      <Stack mt="3xl" w="100%" h="100%" pt="3rem" gap="xxl">
        <Box>
          <Title order={1} lh={1}>
            Rent a Vehicle with
          </Title>
          <Title order={1} c="red">
            AsaanDrive
          </Title>
        </Box>
        <Text w="75%">
          Flexible Vehicle rental service that connects you with the right
          vehicle for your needs. Whether you need a bike, Rickshaw AsaanDrive
          has got you covered
        </Text>
        <Flex gap="lg">
          <Button>Rent Now</Button>
          <Button variant="outline">List Your Vehicle</Button>
        </Flex>
      </Stack>
      <Image
        src={Images.general.bike}
        alt="bike-image"
        width={100}
        height={100}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </SimpleGrid>
  );
}

export default HomeHeroSection;
