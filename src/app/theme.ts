import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  shadows: {
    inset: '0 20px 100px 50px #0A0D10 inset'
  },
  fonts: {
    heading: `Righteous, sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
