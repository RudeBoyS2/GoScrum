import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      "html, body, #root, main": {
        height: "100%",
        width: "100%",
      },
      "button:active": {
        background: "none !important",
      },
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    logo: "Poppins, sans-serif",
  },
  colors: {
    primary: "#FF452B",
    secondary: "#007BFF",
    tertiary: "#1EC876",
    bg: "#FAFAFA",
    bgDark: "#1A202C",
    none: "transparent",
    font: "#000",
    error: "red",
    button: "white",
    link: "grey",
    border: "#E9E9E9",
    cardBorder: "#C4C4C4",
  },
  components: {
    Button: {
      baseStyle: {
        _focus: "",
        _active: {
          bg: "none",
        },
      },
    },
  },
});

export default theme;
