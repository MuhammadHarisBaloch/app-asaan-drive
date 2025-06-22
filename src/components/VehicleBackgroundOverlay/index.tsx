import Images from "@/constants/Images";
import { Box, BackgroundImage } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function VehicleBackgroundOverlay({
  children,
}: PropsWithChildren) {
  return (
    <BackgroundImage src={Images.backgrounds.signup} w="100%">
      <Box bg="black.8" w="100%" h="100%" py="3xl">
        {children}
      </Box>
    </BackgroundImage>
  );
}
