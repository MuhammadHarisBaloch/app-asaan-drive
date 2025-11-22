import Images from "@/constants/Images";
import { Box, BackgroundImage } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function VehicleBackgroundOverlay({
  children,
}: PropsWithChildren) {
  return (
    <BackgroundImage src={Images.backgrounds.signup} w="100%">
      <Box
        bg="black.8"
        w="100%"
        h="100%"
        py={{ base: "xl", sm: "3xl" }}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </BackgroundImage>
  );
}
