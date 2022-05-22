import { Stack, Text, Button, Image, useColorMode, useColorModeValue, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const logOutColor = useColorModeValue({bg: "none", color: "font"}, {bg: "none", color: "button"});

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Stack
      height="50px"
      align="center"
      justify="space-between"
      direction="row"
      p={4}
      borderBottomWidth="medium"
    >
      {/* <Image height="20px" width="82px" src={"goscrumlogo.png"} /> */}
      <HStack spacing={0}>
      <Heading color="primary" fontFamily="Poppins" fontSize="30px">Go</Heading><Text fontSize="20px"fontFamily="logo" fontWeight="500" pt={1.5}>Scrum</Text>
      </HStack>
      <Stack direction="row" align="center" justify="center" gap={2}>
        <Button
          height="22px"
          color="white"
          bg="primary"
          _hover={{
            bg: "white",
            color: "primary",
            border: "1px",
          }}
        >
          Donar
        </Button>
        <Text>Tareas creadas: {localStorage.getItem("tasks")}</Text>
        <Text>{localStorage.getItem("username")}</Text>
        <Button onClick={toggleColorMode} bg="none" _hover={{ bg: "none" }}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        <Button
          onClick={() => logOut()}
          size="xs"
          fontSize="lg"
          bg="transparent"
          color="primary"
          _hover={logOutColor}
        >
          x
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
