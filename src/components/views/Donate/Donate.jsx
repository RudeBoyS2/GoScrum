import {
  Stack,
  Heading,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { buttonHoverColor } from "../../../utils/colorModeValues";

const Donate = () => {
  return (
    <Stack width="100%" height="100%" align="center" justify="center">
      <Heading mb="2" size="xl">Colaborá con el proyecto</Heading>
      <Link
        _hover=""
        href="
https://mpago.la/26NHUE8
"
        isExternal
      >
        <Button
          bg="primary"
          width="70px"
          color="button"
          _hover={useColorModeValue(
            buttonHoverColor.light,
            buttonHoverColor.dark
          )}
          _active={{
            bg: "white",
            color: "primary",
            border: "1px",
          }}
        >
          Donar
        </Button>
      </Link>
    </Stack>
  );
};

export default Donate;
