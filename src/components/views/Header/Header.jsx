import { Stack, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
      <Image height="20px" width="82px" src={"goscrumlogo.png"} />
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
        <Text>Tareas creadas: X</Text>
        <Text>{localStorage.getItem("username")}</Text>
        <Button
          onClick={() => logOut()}
          size="xs"
          fontSize="lg"
          bg="transparent"
          color="primary"
          _hover={{ bg: "transparent", color: "font" }}
        >
          x
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
