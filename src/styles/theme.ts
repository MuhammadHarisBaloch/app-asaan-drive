"use client";
import { Button, createTheme, em, rem, Text } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Poppins",
  primaryShade: 9,
  colors: {
    red: [
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
      "#FF0005",
    ],
    white: [
      "#FFF9F9",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ],
    gray: [
      "#101829",
      "#6F7170",
      "#6F7170",
      "#6F7170",
      "#6F7170",
      "#6F7170",
      "#6F7170",
      "#6F7170",
      "#6F7170",
      "#6F7170",
    ],
    pink: [
      "#FFE0E3",
      "#FFE0E3",
      "#FFE0E3",
      "#FFF9F9",
      "#FFF9F9",
      "#FFF9F9",
      "#FFF9F9",
      "#FFF9F9",
      "#FFF9F9",
      "#FFF9F9",
    ],
  },
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
    xxl: rem(32),
    "3xl": rem(56),
  },
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(24),
    xxl: rem(36),
  },
  headings: {
    fontFamily: "Poppins",
    sizes: {
      h1: { fontSize: rem(60) },
      h2: { fontSize: rem(48) },
      h3: { fontSize: rem(36) },
      h4: { fontSize: rem(24) },
      h5: { fontSize: rem(20) },
      h6: { fontSize: rem(16) },
    },
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "red",
        radius: "md",
      },
    }),
    Text: Text.extend({
      defaultProps: {
        c: "gray",
        fw: 400,
      },
    }),
  },
});

export default theme;
