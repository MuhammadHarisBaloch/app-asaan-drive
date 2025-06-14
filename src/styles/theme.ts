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
      "#6F7170",
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
  headings: {
    fontFamily: "Poppins",
    sizes: {
      h1: { fontSize: em(60) },
      h2: { fontSize: em(48) },
      h3: { fontSize: em(36) },
      h4: { fontSize: em(24) },
      h5: { fontSize: em(20) },
      h6: { fontSize: em(16) },
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
