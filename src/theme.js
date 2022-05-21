import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root, main": {
        height: "100%",
        width: "100%",
      },
    },
  },
  colors: {
    primary: "#FF452B",
    secondary: "#007BFF",
    tertiary: "#1EC876",
    bg: "#FAFAFA",
    cardBg: "transparent",
    font: "#000",
    error: "red",
    button: "white",
    link: "grey",
    border: "#E9E9E9",
    cardBorder: "#C4C4C4",
  }
});

export default theme;
