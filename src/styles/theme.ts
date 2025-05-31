import { createTheme, rem } from "@mantine/core";

const theme = createTheme({
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
});

export default theme;
